import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../axiosInstance/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.config";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const handleloginWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Successfully logged in");
        const user = {
          name: auth?.currentUser?.displayName,
          email: auth?.currentUser?.email,
          image: auth?.currentUser?.photoURL,
          userType: "user",
        };

        // POST request to backend
        axiosPublic.post("https://trackngo-delivery-service-server.vercel.app/users",user)
          .then((res) => res.data)
          .then((data) => {
            if (data.insertedId) {
              toast.success("Welcome to the TrackNGo!");
            } else {
              console.error("Welcome Back!");
            }
          });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={handleloginWithGoogle}
        className="group relative flex h-[52px] w-fit items-center overflow-hidden rounded-full border border-teal-400 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 px-1 text-white shadow-lg transition-all duration-300 hover:from-teal-500 hover:via-blue-600 hover:to-purple-600"
      >
        <div className="z-10 flex h-full items-center rounded-full  px-5 text-lg font-medium text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-transparent group-hover:text-teal-200">
          Sign in with
        </div>
        <span className="z-10 flex h-full items-center rounded-full  px-4 text-xl text-teal-100 transition-colors duration-300 group-hover:bg-transparent group-hover:text-white">
          <FaGoogle />
        </span>

        {/* Glow Effect */}
        <span className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600" />
      </button>
    </div>
  );
};

export default SocialLogin;
