import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import NotificationButton from "../components/NotificationButton ";
import logo from "../assets/images/logo.png";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative mx-2 py-1 text-base font-semibold transition duration-300 ease-in-out
     ${isActive ? "text-teal-700" : "text-gray-700"} 
     hover:text-teal-800 
     before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] 
     before:w-0 before:bg-teal-600 before:transition-all before:duration-300 
     hover:before:w-full`
        }
      >
        Home
      </NavLink>

      <NotificationButton />
    </>
  );

  return (
    <nav className="bg-white border-b-1 border-teal-100 backdrop-blur-md  sticky top-0 z-50">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="" width={40} />
          <Link to="/" className="text-xl lg:text-3xl font-bold tracking-tight">
            <span className="text-gray-800">Track</span>
            <span className=" bg-gradient-to-r from-teal-700 to-green-400 bg-clip-text text-transparent">
              NGo
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {NavLinks}

          {user ? (
            <div className="relative group">
              <img
                src={user?.photoURL || "/avatar.png"}
                alt="Profile"
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
              />
              <div className="absolute right-0 top-12 w-48 bg-white shadow-xl rounded-md py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-in-out z-10">
                <p className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
                  {user?.displayName || "Username"}
                </p>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
           <>
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-500 transition"
            >
              Login
            </Link>
             <Link
              to="/register"
              className="px-4 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-500 transition"
            >
              Register
            </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 animate-fade-in-down">
          {NavLinks}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-teal-600 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="block text-left w-full text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-500 transition"
            >
              Login
            </Link>
             <Link
              to="/register"
              className="px-4 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-500 transition"
            >
              Register
            </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
