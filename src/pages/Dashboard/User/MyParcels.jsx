import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import { useForm, Controller } from "react-hook-form"
import useAxiosSecure from './../../../axiosInstance/useAxiosSecure';
import useAxiosPublic from "../../../axiosInstance/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import ParcelPay from "../../../components/ParcelPay";

const MyParcels = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit, control, reset } = useForm()
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const onSubmit = async (data) => {
    const date = new Date()
    const reviewInfo = {
      userName: data.name,
      usersImage: data.photo,
      review: data.review,
      feedback: data.feedback,
      deliveryManId: data.deliveryManId,
      reviewDate: formatDate(date),
    }
    const res = await axiosPublic.post("/reviews", reviewInfo)

    if (res.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanks For Your Review",
        showConfirmButton: false,
        timer: 1500,
      })
      reset()
      setIsDialogOpen(false)
    }
  }

  const { data: myParcels = [], refetch } = useQuery({
    queryKey: [user?.email, "parcels", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user.email}`)
      if (statusFilter === "all") {
        return res.data
      }
      return res.data.filter((parcel) => parcel.bookingStatus === statusFilter)
    },
  })


  const handleCancel = async (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/parcels/cancel/${parcel._id}`)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Cancelled!",
            text: "Your file has been cancelled.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          })
          refetch()
        }
      }
    })
  }

  return (
    <div className="container mb-20 h-full mx-auto overflow-visible">
      <h1 className="text-3xl md:text-4xl text-center text-teal-800 mb-12 mt-8 font-bold">My <span className="text-purple-600">Parcels</span></h1>
      
      <div className="mb-10 w-[200px]">
        <label htmlFor="statusFilter" className="block text-sm font-medium text-teal-700 mb-1">Booking Status</label>
        <select
          className="w-full px-3 py-2 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="ontheway">On the Way</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg border border-teal-200">
        <table className="min-w-full divide-y divide-teal-200">
          <thead className="bg-gradient-to-r from-teal-600 to-purple-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Parcel Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Requested Delivery Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Approximate Delivery Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Booking Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Delivery Man Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Booking Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-teal-300">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Review</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-teal-100">
            {myParcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-teal-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{parcel.parcelType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{parcel.deliveryDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{parcel.approximateDeliveryDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{parcel.bookingDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{parcel.deliveryManId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${parcel.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      parcel.bookingStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                      parcel.bookingStatus === 'ontheway' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {parcel.bookingStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <ParcelPay parcel={parcel} onCancel={handleCancel} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    disabled={parcel.bookingStatus !== "delivered"}
                    className={`px-4 py-2 rounded-md ${parcel.bookingStatus === "delivered" ? 
                      'bg-purple-600 hover:bg-purple-700 text-white' : 
                      'bg-gray-300 text-gray-500 cursor-not-allowed'} transition`}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-teal-200 pb-4">
                <h2 className="text-2xl font-bold text-teal-800">Review</h2>
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-teal-700 mb-1">User's Name</label>
                  <input
                    defaultValue={user?.displayName}
                    id="name"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Enter your Name"
                    className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="photo" className="block text-sm font-medium text-teal-700 mb-1">Photo URL</label>
                  <input
                    defaultValue={user.photoURL}
                    id="photo"
                    type="text"
                    {...register("photo", { required: true })}
                    placeholder="Enter Your Photo URL"
                    className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="deliveryManId" className="block text-sm font-medium text-teal-700 mb-1">Delivery Man Id</label>
                  <input
                    defaultValue={myParcels[0]?.deliveryManId}
                    id="deliveryManId"
                    type="text"
                    {...register("deliveryManId", { required: true })}
                    placeholder="Delivery Man Id"
                    className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="review" className="block text-sm font-medium text-teal-700 mb-1">Review</label>
                  <Controller
                    name="review"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    )}
                  />
                </div>
                <div className="mb-4 col-span-1 md:col-span-2">
                  <label htmlFor="feedback" className="block text-sm font-medium text-teal-700 mb-1">Feedback</label>
                  <textarea
                    id="feedback"
                    {...register("feedback", { required: true })}
                    placeholder="Enter your feedback"
                    className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows="3"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyParcels

