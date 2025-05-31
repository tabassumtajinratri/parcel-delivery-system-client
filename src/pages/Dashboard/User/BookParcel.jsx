import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../axiosInstance/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookParcel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

const onSubmit = async (data) => {
  const date = new Date();
  const parcelInfo = {
    deliveryAddress: data.deliveryAddress,
    deliveryDate: data.deliveryDate,
    deliveryLatitude: data.deliveryLatitude,
    deliveryLongitude: data.deliveryLongitude,
    email: user.email,
    name: user.displayName,
    parcelType: data.parcelType,
    parcelWeight: data.parcelWeight,
    phone: data.phone,
    price: data.price,
    receiversName: data.receiversName,
    receiversPhone: data.receiversPhone,
    bookingStatus: "pending",
    bookingDate: formatDate(date),
  };
  console.log("Sending:", parcelInfo);

  try {
    const res = await axiosPublic.post("/parcels", parcelInfo);
    if (res.data.insertedId) {
      reset();
      toast.success("Parcel Booked Successfully!");
      navigate('/dashboard/myparcels');
    }
  } catch (error) {
    console.error("Parcel booking error:", error?.response?.data || error.message);
    toast.error("Booking failed. Check console for details.");
  }
};


  const parcelWeight = watch("parcelWeight");

  const calculatePrice = () => {
    if (!parcelWeight) return "";
    const weight = Number.parseFloat(parcelWeight);
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  const price = calculatePrice();

  React.useEffect(() => {
    setValue("price", price);
  }, [price, setValue]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Book a New Parcel
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Fill out the form below to schedule your delivery
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-800 via-teal-300 to-purple-700 py-6 px-6">
            <h2 className="text-2xl font-bold text-white">Parcel Information</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  defaultValue={user?.displayName}
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">Name is required</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">Email is required</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">Phone number is required</p>
                )}
              </div>

              {/* Parcel Type */}
              <div>
                <label htmlFor="parcelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Parcel Type
                </label>
                <input
                  id="parcelType"
                  type="text"
                  {...register("parcelType", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.parcelType && (
                  <p className="mt-1 text-sm text-red-600">Parcel type is required</p>
                )}
              </div>

              {/* Parcel Weight */}
              <div>
                <label htmlFor="parcelWeight" className="block text-sm font-medium text-gray-700 mb-1">
                  Parcel Weight (kg)
                </label>
                <input
                  id="parcelWeight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  {...register("parcelWeight", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.parcelWeight && (
                  <p className="mt-1 text-sm text-red-600">Parcel weight is required</p>
                )}
              </div>

              {/* Price (auto-calculated) */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Tk)
                </label>
                <input
                  id="price"
                  type="text"
                  {...register("price")}
                  value={price ? `${price}` : ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>

              {/* Receiver's Name */}
              <div>
                <label htmlFor="receiversName" className="block text-sm font-medium text-gray-700 mb-1">
                  Receiver's Name
                </label>
                <input
                  id="receiversName"
                  type="text"
                  {...register("receiversName", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.receiversName && (
                  <p className="mt-1 text-sm text-red-600">Receiver's name is required</p>
                )}
              </div>

              {/* Receiver's Phone */}
              <div>
                <label htmlFor="receiversPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Receiver's Phone
                </label>
                <input
                  id="receiversPhone"
                  type="tel"
                  {...register("receiversPhone", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.receiversPhone && (
                  <p className="mt-1 text-sm text-red-600">Receiver's phone is required</p>
                )}
              </div>

              {/* Delivery Address */}
              <div className="sm:col-span-2">
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <input
                  id="deliveryAddress"
                  type="text"
                  {...register("deliveryAddress", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.deliveryAddress && (
                  <p className="mt-1 text-sm text-red-600">Delivery address is required</p>
                )}
              </div>

              {/* Delivery Date */}
              <div>
                <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Delivery Date
                </label>
                <input
                  id="deliveryDate"
                  type="date"
                  {...register("deliveryDate", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.deliveryDate && (
                  <p className="mt-1 text-sm text-red-600">Delivery date is required</p>
                )}
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:col-span-2">
                <div>
                  <label htmlFor="deliveryLatitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    id="deliveryLatitude"
                    type="text"
                    {...register("deliveryLatitude", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                  {errors.deliveryLatitude && (
                    <p className="mt-1 text-sm text-red-600">Latitude is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="deliveryLongitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    id="deliveryLongitude"
                    type="text"
                    {...register("deliveryLongitude", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                  {errors.deliveryLongitude && (
                    <p className="mt-1 text-sm text-red-600">Longitude is required</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
              >
                Book Parcel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookParcel;
