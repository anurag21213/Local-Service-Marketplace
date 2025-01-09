import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Service from "./pages/Service"


function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" Component={Home} />
      <Route path="/services" Component={Service} /> 
     </Routes>
    </>
  )
}

export default App
