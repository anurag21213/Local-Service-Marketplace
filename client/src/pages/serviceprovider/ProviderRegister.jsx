import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Particle from "../../components/ParticleComponent/Particle";
import LoginLoader from "../../components/LoginLoader";
import Webcam from 'react-webcam'
import * as faceapi from "face-api.js"

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openWebCam, setOpenWebCam] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    category: "",
    price: "",
    flag: 0
  });

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const [aadharImage, setAadharImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [similarity, setSimilarity] = useState(0);

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models"); // Face detection model
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models"); // Facial landmarks
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models"); // Face embeddings
    }

    loadModels();
  }, []);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      // console.log(imageUrl);
    }
  };

  const getFaceEmbedding = async (imageSrc) => {
    const img = await faceapi.fetchImage(imageSrc);
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    return detection ? detection.descriptor : null;
  };

  const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    return dotProduct / (Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0)) * Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0)));
  };

  const getVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!aadharImage || !userImage) {
      toast.error("Please upload both images.");
      setIsLoading(false);
      return;
    }

    try {
      const aadharFeatures = await getFaceEmbedding(aadharImage);
      const userFeatures = await getFaceEmbedding(userImage);

      if (aadharFeatures && userFeatures) {
        let sim = cosineSimilarity(aadharFeatures, userFeatures);
        setSimilarity(sim.toFixed(4));
        if (sim >= 0.92) {
          setFormData({ ...formData, flag: 1 });
          toast.success("Successfully verified");
        } else {
          toast.error("Face verification failed");
        }
      } else {
        toast.error("No face detected in one or both images.");
      }
    } catch (error) {
      toast.error("Error during face verification");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let { confirmPassword, ...rest } = formData;

    const resData = new FormData();
    Object.keys(formData).forEach((key) => resData.append(key, formData[key]));

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/spSignup`, {
        method: 'post',
        body: resData,
      });

      const data = await res.json();
      if (data.message === "User registered successfully") {
        toast.success("Registration Success");
        navigate('/providerdashboard');
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
    <div className="flex h-screen w-full items-center justify-center p-4 lg:p-8">
      {isLoading && <LoginLoader isLoggingIn={false} />}
      <div className="flex flex-col lg:flex-row justify-center items-center w-full z-10 gap-8 max-w-6xl">
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-6">Register Your Service Here</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              {["name", "phone", "email", "category", "price"].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg outline-none"
                    required
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {["password", "confirmPassword"].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input
                    type="password"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg outline-none"
                    required
                    disabled={isLoading}
                  />
                </div>
              ))}
              {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
                <span className="flex items-center justify-center text-red-600 font-medium">Password does not match</span>
              )}
              <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Upload Aadhar photo</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={(e) => handleImageUpload(e, setAadharImage)}
                  className="mt-2 hidden"
                  id="file-upload"
                  disabled={isLoading}
                />
                <label htmlFor="file-upload" className="text-blue-600 cursor-pointer">Upload a file</label>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>

              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                onChange={(e) => handleImageUpload(e, setUserImage)}
                className="mt-2 hidden"
                disabled={isLoading}
              />

              {userImage ? (
                <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center flex flex-col items-center justify-center">
                  <img src={userImage} alt="User" className="max-w-full h-auto" />
                </div>
              ) : (
                <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center flex flex-col items-center justify-center">
                  {openWebCam ? (
                    <Webcam
                      audio={false}
                      height={720}
                      screenshotFormat="image/jpeg"
                      width={1280}
                      videoConstraints={videoConstraints}
                    >
                      {({ getScreenshot }) => (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const imageSrc = getScreenshot();
                            setUserImage(imageSrc);
                          }}
                          type="text"
                          disabled={isLoading}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Capture photo
                        </button>
                      )}
                    </Webcam>
                  ) : (
                    <button
                      type="text"
                      onClick={() => setOpenWebCam(true)}
                      disabled={isLoading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Upload your Live photo
                    </button>
                  )}
                </div>
              )}

              {userImage && (
                <button
                  type="text"
                  onClick={(e) => getVerify(e)}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Verified
                </button>
              )}
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/providerlogin" className="text-blue-600">Login here</Link>
          </p>
        </div>
      </div>
      <Particle />
    </div>
  );
};

export default Register;
