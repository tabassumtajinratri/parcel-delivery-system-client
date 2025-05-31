import { Outlet } from "react-router-dom"
import Navbar from "./layout/Navbar"
import Footer from './layout/Footer';


function App() {

  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App
