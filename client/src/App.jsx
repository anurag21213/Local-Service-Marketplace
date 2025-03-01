import { Route, Routes } from "react-router-dom"
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
import ProviderDashboard from "./pages/serviceprovider/ProviderDashboard"




function App() {





  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" Component={Cover} />
        <Route path="/clientlogin" Component={Login} />
        <Route path="/clientregister" Component={Register} />
        <Route path="/providerregister" Component={ProviderRegister} />
        <Route path="/providerlogin" Component={ProviderLogin} />
        <Route path="/providerprofile" Component={ProviderProfile} />
        <Route path="/providerdashboard" Component={ProviderDashboard} />

        <Route path="/home" Component={Home} />
        <Route path="/services" Component={Service} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </>
  )
}

export default App
