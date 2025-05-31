import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import useAxiosSecure from "../../../axiosInstance/useAxiosSecure";
import useDeliveryMen from './../../../hooks/useDeliveryMen';
import useParcels from './../../../hooks/useParcels';


const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { parcels, refetch } = useParcels(fromDate, toDate);
  const { deliveryMen, isLoading, isError } = useDeliveryMen();

  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
    setSelectedDeliveryMan("");
    setApproximateDeliveryDate("");
  };

  const assignDeliveryMan = async () => {
    if (!selectedParcel) return;
    
    const assignInfo = {
      deliveryManId: selectedDeliveryMan,
      approximateDeliveryDate: approximateDeliveryDate,
      bookingStatus: "ontheway",
    };

    const res = await axiosSecure.patch(
      `/parcels/update/${selectedParcel._id}`,
      assignInfo
    );
    if (res.data.modifiedCount > 0) {
      toast.success("Delivery Man has been assigned!");
      refetch();
      closeModal();
    } else {
      toast.error("Failed to assign delivery man");
    }
  };

  return (
    <div className="w-fill lg:container mx-auto mb-20">
      <Toaster />
      <h1 className="text-4xl text-center text-teal-700 mb-12 mt-8 font-bold">
        All <span className="text-purple-600">Parcels</span>
      </h1>

      <div className="flex flex-wrap gap-6 w-full md:w-9/12 mb-16">
        <div className="flex flex-col">
          <label htmlFor="fromDate" className="mb-1 font-medium text-gray-700">
            Requested Date From
          </label>
          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="toDate" className="mb-1 font-medium text-gray-700">
            Requested Date To
          </label>
          <input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          className="bg-teal-600 text-white px-6 py-2 rounded h-fit mt-auto"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
        <table className="min-w-full text-left">
          <thead className="bg-gradient-to-r from-teal-500 to-purple-600 text-white">
            <tr>
              {[
                "User's Name",
                "Phone",
                "Booking Date",
                "Requested Delivery Date",
                "Cost",
                "Status",
                "Assign Delivery Man",
              ].map((head, i) => (
                <th key={i} className="p-4 border-r border-white font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="even:bg-gray-50">
                <td className="p-4 font-medium">{parcel.name}</td>
                <td className="p-4">{parcel.phone}</td>
                <td className="p-4">{parcel.bookingDate}</td>
                <td className="p-4">{parcel.deliveryDate}</td>
                <td className="p-4">${parcel.price}</td>
                <td className="p-4">{parcel.bookingStatus}</td>
                <td className="p-4">
                  {(parcel.bookingStatus === "pending" 
                  ) && (
                    <button
                      onClick={() => openAssignModal(parcel)}
                      className="text-teal-600 flex items-center gap-2 hover:text-teal-800"
                    >
                      <FiEdit /> Assign
                    </button>
                  )}
                  {parcel.bookingStatus !== "pending"   && (
                      <p className="text-gray-500">Not assignable</p>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-teal-700">
                Assign Delivery Man
              </h2>
              <div className="mb-4">
                <label className="block mb-1">Approximate Delivery Date</label>
                <input
                  type="date"
                  value={approximateDeliveryDate}
                  onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1">Delivery Man</label>
                {isLoading ? (
                  <p>Loading...</p>
                ) : isError ? (
                  <p>Error loading delivery men</p>
                ) : (
                  <select
                    value={selectedDeliveryMan}
                    onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Delivery Man</option>
                    {deliveryMen.map((dm) => (
                      <option key={dm._id} value={dm._id}>
                        {dm.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={assignDeliveryMan}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
                  disabled={
                    !selectedDeliveryMan ||
                    !approximateDeliveryDate ||
                    (selectedParcel && selectedParcel.bookingStatus === "cancelled")
                  }
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;