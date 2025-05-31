import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "./../hooks/useAuth";
import {
  FaBox,
  FaBoxes,
  FaUser,
  FaUsers,
  FaChartBar,
  FaTruck,
  FaStar,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

// Role-based navigation configuration
const NavLinks = {
  user: [
    {
      name: "Book Parcel",
      path: "/dashboard/bookparcel",
      icon: <FaBox className="text-teal-900" />,
      exact: true,
    },
    {
      name: "My Parcels",
      path: "/dashboard/myparcels",
      icon: <FaBoxes className="text-teal-900" />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser className="text-teal-900" />,
    },
  ],
  deliveryMan: [
    {
      name: "My Deliveries",
      path: "/dashboard/deliveries",
      icon: <FaTruck className="text-teal-900" />,
    },
    {
      name: "Customer Reviews",
      path: "/dashboard/myreviews",
      icon: <FaStar className="text-teal-900" />,
    },
  ],
  admin: [
    {
      name: "Parcel Management",
      path: "/dashboard/parcels",
      icon: <FaBoxes className="text-teal-900" />,
    },
    {
      name: "User Management",
      path: "/dashboard/users",
      icon: <FaUsers className="text-teal-900" />,
    },
    {
      name: "Delivery Team",
      path: "/dashboard/deliverymen",
      icon: <FaTruck className="text-teal-900" />,
    },
    {
      name: "Analytics",
      path: "/dashboard/statistics",
      icon: <FaChartBar className="text-teal-900" />,
    },
  ],
};

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const { user, logOut, userType } = useAuth();
  const navigate = useNavigate();

  const currentNavItems = NavLinks[userType] || [user];

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful. See you soon.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Active link styling
  const activeLinkClass =
    "bg-teal-100 text-teal-800 font-medium border-r-4 border-teal-500";
  const inactiveLinkClass = "text-gray-200 hover:bg-teal-700";

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="hidden md:flex flex-col w-64 h-screen bg-teal-700 text-white  shadow-lg fixed"
    >
      <Toaster></Toaster>

      {/* Brand Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold  flex items-center">
          <FaTruck className="mr-2" />
          TrackNGo
        </h2>
        {user && (
          <p className="text-sm text-gray-400 mt-1 capitalize">
            {userType} Dashboard
          </p>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {currentNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg hover:bg-teal-800 hover:text-white transition-colors mx-2 ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      {user && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center mb-4 px-2">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt={user.displayName}
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-400"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-200">{user.displayName}</p>
              <p className="text-xs text-gray-300 capitalize">{userType}</p>
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center w-full px-4 py-2 text-gray-400 hover:bg-teal-800 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3 text-gray-200" />
            Sign Out
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardSidebar;
