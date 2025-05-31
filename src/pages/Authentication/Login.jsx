import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLottie } from "lottie-react";
import animationData from "../../assets/lootiefiles/deliverman.json";
import useAuth from "./../../hooks/useAuth";
import SocialLogin from "../../shared/SocialLogin";

const Login = () => {
  const { loginWithEmailPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const options = {
    animationData: animationData,
    loop: true,
  };
  const { View } = useLottie(options);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithEmailPassword(email, password)
      .then(() => {
        toast.success("Successfully logged in");
        form.reset();
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#0d9488",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />

      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-zinc-800">
        {/* Design Side */}
        <div className="relative hidden items-center justify-center md:flex md:w-[50%] bg-gradient-to-br from-teal-500 via-blue-700 to-purple-600 p-8">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[80%]">{View}</div>
          </div>
          <div className="absolute bottom-8  text-white">
            <h3 className="text-2xl text-center font-bold">Welcome Back!</h3>
            <p className="text-white/80 text-center">Sign in to access your account</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-[50%]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600  to-purple-600 bg-clip-text text-transparent mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Access your dashboard
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex w-full flex-col items-center justify-center gap-5"
          >
            <div className="w-full">
              <input
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />
            </div>
            <div className="w-full">
              <input
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-800 px-6 py-3 font-medium text-white shadow-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300"
            >
              Sign In
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400"
              >
                Sign up
              </a>
            </p>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <hr className="flex-1 border-gray-300 dark:border-zinc-600" />
            <div className="mx-4 text-gray-500 dark:text-gray-400">OR</div>
            <hr className="flex-1 border-gray-300 dark:border-zinc-600" />
          </div>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;