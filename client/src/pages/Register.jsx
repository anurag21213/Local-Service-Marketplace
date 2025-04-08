import { useEffect, useState } from "react";
import Particle from "../components/ParticleComponent/Particle";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import LoginLoader from "../components/LoginLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { messaging } from "../firebase";
import { onMessage, getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
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

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current input is filled
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d*$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, otp: otpString })
      });
      const data = await response.json();
      if (data.message==="Email verified successfully") {
        toast.success('Email verified successfully');
        setShowOtpModal(false);
        navigate('/clientlogin');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('OTP resent successfully');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    }
  };

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { confirmPassword, ...rest } = formData

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/clSignup`, {
        "method": 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })

      const data = await res.json()

      if (data.message === "OTP sent to email") {
        toast.success("OTP sent to email")
        setShowOtpModal(true);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {isLoading && <LoginLoader isLoggingIn={false} />}
      <div className="flex justify-center items-center w-full z-10">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] lg:w-[500px]">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create your account
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            {
              formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && <span className="flex items-center justify-center text-red-600 font-medium">Password is not same</span>
            }

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have account? <Link to="/clientlogin" className="text-blue-600">Login here</Link>
          </p>
        </div>
      </div>

      <Particle />

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Verify Your Email</h2>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Enter the 6-digit code sent to {formData.email}
            </p>

            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled={otpLoading}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otpLoading || otp.join('').length !== 6}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {otpLoading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={handleResendOtp}
              disabled={resendDisabled || otpLoading}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendDisabled ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
