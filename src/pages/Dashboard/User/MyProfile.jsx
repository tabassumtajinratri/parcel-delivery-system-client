import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { FiUploadCloud } from "react-icons/fi";
import useAxiosPublic from "../../../axiosInstance/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user, updateUserProfile } = useAuth();
  const [selectedImageName, setSelectedImageName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const onSubmit = async (data) => {
    let imageUrl = profile?.image;

    // Upload image if selected
    if (data.image?.[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const res = await axiosPublic.post(image_hosting_api, formData);
      if (res.data.success) {
        imageUrl = res.data.data.display_url;
      }
    }

    // Update name and photo
    const updatedProfile = {
      name: data.name || profile?.name,
      image: imageUrl,
    };

    // Firebase display name update
    await updateUserProfile({
      displayName: updatedProfile.name,
      photoURL: updatedProfile.image,
    });

    // Update in DB
    await axiosPublic.patch(`/users/${user.email}`, updatedProfile);
    toast.success("Profile updated successfully");

    refetch();
  };

  if (isLoading)
    return <p className="text-center mt-20 text-teal-400">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-xl mx-auto mt-20 px-6 py-10 bg-gradient-to-br from-purple-900 to-teal-700 rounded-2xl shadow-2xl text-white relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10">
        My <span className="text-teal-300">Profile</span>
      </h2>

      <div className="flex flex-col items-center mb-8">
        {profile?.image ? (
          <img
            src={profile.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-teal-300 shadow-md object-cover"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-300 rounded-full text-gray-700 font-semibold">
            No Image
          </div>
        )}
        <h3 className="mt-4 text-xl font-semibold">{profile?.name || "N/A"}</h3>
        <p className="text-teal-200">{profile?.email}</p>
        <p className="text-sm mt-1">
          Parcels Booked: {profile?.parcelBooked || 0}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Toaster></Toaster>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Update Name
          </label>
          <input
            id="name"
            type="text"
            defaultValue={profile?.name}
            placeholder={profile?.name}
            {...register("name")}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          
        </div>

        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-white"
          >
            Upload New Profile Image
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded-lg">
              <FiUploadCloud className="text-xl" />
              <span>Choose Image</span>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setSelectedImageName(e.target.files[0].name);
                  } else {
                    setSelectedImageName("");
                  }
                }}
                className="hidden"
              />
            </label>
            {selectedImageName && (
              <p className="text-sm text-teal-200 mt-1">
                Selected: {selectedImageName}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
