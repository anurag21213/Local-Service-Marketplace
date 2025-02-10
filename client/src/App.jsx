import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Service from "./pages/Service"
import Cover from "./pages/Cover"


function App() {

  
 

  return (
    <>
     <Routes>
      <Route path="/" Component={Cover}  />
      <Route path="/home" Component={Home} />
      <Route path="/services" Component={Service} /> 
     </Routes>
    </>
  )
}

export default App
