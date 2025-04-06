import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particle from "../components/ParticleComponent/Particle";
import { Link } from "react-router-dom";
import LoginLoader from "../components/LoginLoader";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/home');
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 lg:p-8">
      {isLoading && <LoginLoader isLoggingIn={true} />}
      <div className="flex flex-col lg:flex-row justify-center items-center w-full z-10 gap-8 max-w-6xl">
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg outline-none"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg outline-none"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? <Link to="/clientregister" className="text-blue-600">Register here</Link>
          </p>
        </div>
      </div>
      <Particle />
    </div>
  );
};

export default Login;