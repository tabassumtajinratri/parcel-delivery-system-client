import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaUserShield, FaMotorcycle, FaMoneyBillWave } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../axiosInstance/useAxiosSecure";
import useAllUsers from "../../../hooks/useAllUsers";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { users, isLoading, isError, refetch } = useAllUsers();

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total parcels and spending for each user
  const usersWithStats = filteredUsers.map(user => ({
    ...user,
    totalParcels: user.parcelsBooked?.length || 0,
    totalSpent: user.parcelsBooked?.reduce((sum, parcel) => sum + (parcel.price || 0), 0) || 0
  }));

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersWithStats.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(usersWithStats.length / usersPerPage);


// const makeAdmin = async (user) => {
//   toast.promise(
//     axiosSecure.patch(`/users/make-admin/${user._id}`),
//     {
//       loading: 'Updating role...',
//       success: () => {
//         refetch();
//         return `${user.name} is now an Admin!`;
//       },
//       error: 'Failed to update role'
//     }
//   );
// };

// const makeDeliveryMan = async (user) => {
//   toast.promise(
//     axiosSecure.patch(`/users/make-deliveryman/${user._id}`),
//     {
//       loading: 'Updating role...',
//       success: () => {
//         refetch();
//         return `${user.name} is now a Delivery Man!`;
//       },
//       error: 'Failed to update role'
//     }
//   );
// };

  const handleChangeUserRole = async (user, userType) => {
    toast.promise(
      axiosSecure.patch(`/users/change-role/${user.email}`, { userType }),
      {
        loading: 'Updating role...',
        success: () => {
          refetch();
          return `${user.name} is now a ${userType}!`;
        },
        error: 'Failed to update role'
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiRefreshCw className="animate-spin text-4xl text-teal-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load users data. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full lg:container mx-auto mb-20 px-4">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl text-center text-teal-700 font-bold">
          All <span className="text-purple-600">Users</span>
        </h1>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
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

      {currentUsers.length === 0 ? (
        <div className="text-center py-10 bg-purple-50 rounded-lg border border-purple-100">
          <FaUser className="mx-auto text-5xl text-purple-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">
            No users found
          </h3>
          <p className="text-gray-500 mt-1">
            {searchTerm ? "Try a different search term" : "No users registered yet"}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-teal-500 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Parcels
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-purple-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                     
                        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                            <img src={user?.image} alt={user.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                            {user.userType === 'admin' && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                                Admin
                              </span>
                            )}
                            {user.userType === 'deliveryman' && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-teal-100 text-teal-800 rounded-full">
                                Delivery
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user?.phone || user?.email }</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-medium">
                          {user?.parcelBooked}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaMoneyBillWave className="text-green-500 mr-1" />
                        ${user.totalSpent.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {user.userType === 'user' ? 
                          <>
                            <button
                              onClick={() => handleChangeUserRole(user, 'admin')}
                              className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-xs"
                            >
                              Make Admin
                            </button>
                            <button
                              onClick={() => handleChangeUserRole(user, 'deliveryman')}
                              className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-xs"
                            >
                              Make Delivery
                            </button>
                          </>     :
                          <>
                          <p className="text-xs text-teal-700">Current Role: {user.userType}</p>
                          </>
                        }
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === page ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;