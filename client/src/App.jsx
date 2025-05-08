import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './i18n'; // Import i18n configuration
import Home from "./pages/Home"
import Service from "./pages/Service"
import Cover from "./pages/Cover"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProviderLogin from "./pages/serviceprovider/ProviderLogin"
import ProviderRegister from "./pages/serviceprovider/ProviderRegister"
import { ToastContainer, toast } from 'react-toastify';
import Profile from "./pages/Profile"
import ProviderProfile from "./pages/serviceprovider/ProviderProfile"
import ProviderDashboard from "./pages/serviceprovider/ProviderDashboard";
import ServiceRequests from "./pages/serviceprovider/ServiceRequests";
import AvailabilityManager from "./pages/serviceprovider/AvailabilityManager";
import ServiceDisplay from "./pages/ServiceDisplay";
import Pricing from "./pages/serviceprovider/Pricing"
import About from './pages/About';
import Contact from './pages/Contact'

function App() {
  return (
    <div>
    
      <ToastContainer />
      <Routes>
        <Route path="/" Component={Cover} />
        <Route path="/clientlogin" Component={Login} />
        <Route path="/clientregister" Component={Register} />
        <Route path="/providerregister" Component={ProviderRegister} />
        <Route path="/providerlogin" Component={ProviderLogin} />
        <Route path="/providerprofile" Component={ProviderProfile} />
        <Route path="/providerdashboard" Component={ProviderDashboard} />
        <Route path="/pricing" Component={Pricing} />

        <Route path="/home" Component={Home} />
        <Route path="/services" Component={Service} />
        <Route path="/service/:service" Component={ServiceDisplay} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />

        <Route path="/profile" Component={Profile} />
      </Routes>
    
    </div>
  )
}

export default App
