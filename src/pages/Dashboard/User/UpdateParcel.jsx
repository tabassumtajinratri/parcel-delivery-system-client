// UpdateParcel


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";

import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../axiosInstance/useAxiosPublic";

const UpdateParcel = () => {
  const { user } = useAuth();
  const myParcels = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const nagivage = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    deliveryAddress,
    deliveryDate,
    deliveryLatitude,
    deliveryLongitude,
    email,
    name,
    parcelType,
    phone,
    receiversName,
    receiversPhone,
    parcelWeight,
  } = myParcels;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const watchedWeight = watch("parcelWeight");

  const calculatePrice = () => {
    const weight = parseFloat(watchedWeight || 0);
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  const price = calculatePrice();

  useEffect(() => {
    setValue("price", price);
  }, [price, setValue]);

  const onSubmit = async (data) => {
    const date = new Date();
    const parcelData = {
      deliveryAddress: data.deliveryAddress,
      deliveryDate: data.deliveryDate,
      deliveryLatitude: data.deliveryLatitude,
      deliveryLongitude: data.deliveryLongitude,
      email: user.email,
      parcelType: data.parcelType,
      parcelWeight: data.parcelWeight,
      phone: data.phone,
      price: data.price,
      receiversName: data.receiversName,
      receiversPhone: data.receiversPhone,
      bookingStatus: "pending",
      bookingDate: formatDate(date),
    };

    try {
      const res = await axiosPublic.patch(`/parcels/update/${id}`, parcelData);
      if (res.data.modifiedCount) {
        reset();
        toast.success("Parcel updated successfully!");
        nagivage("/dashboard/myparcels");
      }
    } catch (err) {
      toast.error("Failed to update parcel. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br border-teal-800 border-2 bg-purple-50 rounded-xl shadow-xl">
      <Toaster />
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Update Your <span className="text-teal-300">Parcel</span></h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        {[
          { id: "phone", label: "Phone Number", defaultValue: phone },
          { id: "parcelType", label: "Parcel Type", defaultValue: parcelType },
          { id: "parcelWeight", label: "Parcel Weight", type: "number", defaultValue: parcelWeight },
          { id: "receiversName", label: "Receiver's Name", defaultValue: receiversName },
          { id: "receiversPhone", label: "Receiver's Phone Number", defaultValue: receiversPhone },
          { id: "deliveryAddress", label: "Delivery Address", defaultValue: deliveryAddress },
          { id: "deliveryDate", label: "Requested Delivery Date", type: "date", defaultValue: deliveryDate },
          { id: "deliveryLatitude", label: "Latitude", defaultValue: deliveryLatitude },
          { id: "deliveryLongitude", label: "Longitude", defaultValue: deliveryLongitude },
        ].map(({ id, label, type = "text", defaultValue }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-1 font-medium">{label}</label>
            <input
              id={id}
              type={type}
              defaultValue={defaultValue}
              {...register(id, { required: true })}
              className="w-full p-2 rounded-md text-black focus:ring-2 focus:ring-teal-400 bg-purple-300"
              placeholder={label}
            />
            {errors[id] && <p className="text-red-300 text-sm mt-1">{label} is required</p>}
          </div>
        ))}

        {/* Price - Read Only */}
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Calculated Price</label>
          <input
            id="price"
            type="text"
            readOnly
            {...register("price")}
            value={price}
            className="w-full p-2 rounded-md text-black bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white py-2 px-6 rounded-lg transition-all"
          >
            <FiSend className="text-xl" />
            Update Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateParcel;
