import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../axiosInstance/useAxiosPublic";
import SocialLogin from "../../shared/SocialLogin";
import { useState } from "react";
import animationData from "../../assets/lootiefiles/deliverman.json";
import { useLottie } from "lottie-react";

const Register = () => {
  const { registerWithEmailPassword, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

  // lottie-react
  const options = {
    animationData: animationData,
    loop: true,
  };
  const { View } = useLottie(options);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, userType, image } = data;
    const imageFile = image[0];

    try {
      setUploading(true);
      const uploadedImageUrl = await uploadImageToImgbb(imageFile);

      const userCredential = await registerWithEmailPassword(email, password);

      await updateUserProfile({
        displayName: name,
        photoURL: uploadedImageUrl,
      });

      const userInfo = {
        name,
        email,
        image: uploadedImageUrl,
        userType,
      };

      await axiosPublic.post("/users", userInfo);
      toast.success("Registration successful!");
      axiosPublic.post("/users", userInfo)
      .then((response) => {
            console.log("Success:", response.data);

        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });

      navigate(location?.state || "/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
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

      <div className="flex flex-col-reverse md:flex-row-reverse  w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-zinc-800">
        {/* Design Side */}
        <div className="relative hidden items-center justify-center md:flex md:w-[50%] bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600 p-8">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[80%]">{View}</div>
          </div>
          <div className="absolute top-8 text-center text-white">
            <h3 className="text-2xl font-bold">Join Us Today!</h3>
            <p className="text-white/80">Create your account to get started</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-[50%]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-teal-300 to-purple-600 bg-clip-text text-transparent mb-2">
              Register
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Create your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Profile image is required" })}
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-4 text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-teal-500 file:to-blue-600 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>

            {/* User Type */}
            <div>
              <select
                {...register("userType", {
                  required: "Please select a user type",
                })}
                defaultValue=""
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
              >
                <option value="" disabled>
                  Select user type
                </option>
                <option value="user">User</option>
                <option value="deliveryman">Delivery Man</option>
              </select>
              {errors.userType && (
                <p className="mt-1 text-sm text-red-500">{errors.userType.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 font-medium text-white shadow-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300 disabled:opacity-50"
            >
              {uploading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400"
            >
              Sign in
            </a>
          </p>

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

export default Register;