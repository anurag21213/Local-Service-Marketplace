import { useState } from "react";
import Particle from "../components/ParticleComponent/Particle";
import { Link } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // Add authentication logic here
  };

  return (

    <div className="flex h-screen w-full items-center justify-center">
      
      <div className="flex justify-center items-center z-10">
        <div className="bg-white p-6 rounded-xl shadow-lg lg:w-[550px] ">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Sign in to your account
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
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                required
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
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>


          <p className="text-center text-sm text-gray-600 mt-4">
            Dont't have account? <Link to="/clientregister" className="text-blue-600">Register here</Link>
          </p>
        </div>
      </div>

      <Particle/>

    </div>

  );
};

export default Login;
