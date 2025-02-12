import { useState } from "react";
import Particle from "../components/ParticleComponent/Particle";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';



const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [phone, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [modal,setModal]=useState(false)

  
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(cpassword!==password){
      toast.error("Password must be same")
    }
    else{
      setModal(true)

      // setMobile((prev)=>"+91"+prev)
      const res=await fetch('https://local-service-marketplace.onrender.com/api/clSignup',{
        "method":'post',
        headers: {
              'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,email,phone:"+91"+phone,password})
      })

      const data=await res.json()

      console.log(data);
      
    }

    

    
    
  };

  return (

    <div className="flex h-screen w-full items-center justify-center">
      
      <div className="flex justify-center items-center w-full z-10">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] lg:w-[550px] ">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
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
            Already have account? <Link to="/clientlogin" className="text-blue-600">Login here</Link>
          </p>
        </div>
      </div>

      <Particle/>

    </div>

  );
};

export default Register;
