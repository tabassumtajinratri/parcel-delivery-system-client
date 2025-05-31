import { useState } from "react";
import useDeliveryMen from "../../../hooks/useDeliveryMen";
import { FaStar, FaUserTie } from "react-icons/fa";

const AllDeliveryMen = () => {
  const { deliveryMen, isLoading, isError } = useDeliveryMen();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter delivery men based on search term
  const filteredDeliveryMen = deliveryMen.filter((dm) =>
    dm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate average review (assuming reviews is an array of numbers)
  const calculateAverageReview = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((a, b) => a + b, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load delivery men data. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full lg:container mx-auto mb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl text-center text-teal-700 font-bold">
          <span className="text-purple-600">All</span> Delivery Men
        </h1>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {filteredDeliveryMen.length === 0 ? (
        <div className="text-center py-10 bg-purple-50 rounded-lg border border-purple-100">
          <FaUserTie className="mx-auto text-5xl text-purple-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">
            No delivery men found
          </h3>
          <p className="text-gray-500 mt-1">
            {searchTerm ? "Try a different search term" : "No delivery men registered yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-teal-500 to-purple-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Delivery Man
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Parcels Delivered
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Average Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveryMen.map((deliveryMan) => (
                <tr key={deliveryMan._id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">

                        <div>
                            <img src={deliveryMan.image } alt={deliveryMan.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-400" />
                        </div>
                        
                      {/* <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-medium">
                          {deliveryMan.name.charAt(0).toUpperCase()}
                        </span>
                      </div> */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {deliveryMan.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {deliveryMan.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deliveryMan.phone || deliveryMan.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-medium">
                        {deliveryMan.parcelsDelivered || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-medium text-gray-900">
                        {calculateAverageReview(deliveryMan.reviews)}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({deliveryMan.reviews?.length || 0} reviews)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllDeliveryMen;