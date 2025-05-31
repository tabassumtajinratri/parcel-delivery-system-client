import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
        <span className="text-xl md:text-2xl text-teal-600 font-semibold">Loading...</span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/login" replace />;
};


export default PrivateRoutes;
