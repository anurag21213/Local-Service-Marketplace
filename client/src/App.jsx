import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Service from "./pages/Service"
import Cover from "./pages/Cover"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ToastContainer, toast } from 'react-toastify';
import Profile from "./pages/Profile"




function App() {

  
  
 

  return (
    <>
      <ToastContainer />
     <Routes>
      <Route path="/" Component={Cover}  />
      <Route path="/clientlogin" Component={Login} />
      <Route path="/clientregister" Component={Register} />
      <Route path="/home" Component={Home} />
      <Route path="/services" Component={Service} /> 
      <Route path ="/profile" Component={Profile} />
     </Routes>
    </>
  )
}

export default App
