import { useEffect, useState } from "react";
import Particle from "../components/ParticleComponent/Particle";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { messaging } from "../firebase";
import { onMessage, getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // fcmToken: ""
  })

  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") {
  //     // Generate Token
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BE3h1lMFWGDjdDF5Vmf7iVxB8ZUCRs5hek4F58t2W2ODZoRXYwQ8Z1h9piD3rpDPD-RCD555UeEn-GxBEeN4SGQ",
  //     });
  //     console.log("Token Gen", token);
  //     setFormData({ ...formData, fcmToken: token })
  //   } else if (permission === "denied") {
  //     alert("You denied for the notification");
  //   }
  // }

  // useEffect(() => {

  //   //request user for notification permission
  //   requestPermission()
  // }, []);





  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

   

    try {
      const { confirmPassword, ...rest } = formData
      console.log(rest);

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/clSignup`, {
        "method": 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })

      const data = await res.json()

      if(data.message==="User registered successfully"){
        toast.success("Registration Success")
        navigate('/clientlogin')
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 lg:h-14 lg:text-lg border border-gray-300 rounded-lg outline-none"
                required
              />
            </div>
            {
              formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && <span className="flex items-center justify-center text-red-600 font-medium">Password is not same</span>
            }

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

      <Particle />

    </div>

  );
};

export default Register;
