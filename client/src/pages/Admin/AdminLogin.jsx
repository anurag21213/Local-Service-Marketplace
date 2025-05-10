import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particle from "../../components/ParticleComponent/Particle";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import LoginLoader from "../../components/LoginLoader";
import { useAuth } from "../../hooks/useAuth";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.token) {
                // Store the token in localStorage or your auth state management
                localStorage.setItem('adminToken', data.token);
                // console.log(data);
                
                toast.success("Login Successful");
                navigate('/admindashboard');
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center">
            {isLoading && <LoginLoader isLoggingIn={true} />}
            <div className="flex justify-center items-center z-10">
                <div className="bg-white p-6 rounded-xl shadow-lg lg:w-[500px]">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Admin SignIn
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account? <Link to="/clientregister" className="text-blue-600">Register here</Link>
                    </p>
                </div>
            </div>
            <Particle />
        </div>
    );
}

export default AdminLogin
