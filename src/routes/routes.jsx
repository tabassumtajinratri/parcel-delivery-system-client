import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from './../pages/Home/Home';
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layout/DashboardLayout";
import BookParcel from "../pages/Dashboard/User/BookParcel";
import MyParcels from "../pages/Dashboard/User/MyParcels";
import MyProfile from './../pages/Dashboard/User/MyProfile';
import UpdateParcel from "../pages/Dashboard/User/UpdateParcel";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import PrivateRoutes from './PrivateRoutes';
import AdminRoute from "./AdminRoute";
import AllParcels from "../pages/Dashboard/Admin/AllParcels";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen";
import DashboardHome from "../layout/DashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
    ]
  },{
    path: "/dashboard",
    element:<PrivateRoutes><DashboardLayout /> </PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardHome /></PrivateRoutes>,
      },
      // user route
      {
        path: '/dashboard/bookparcel',
        element: <PrivateRoutes><BookParcel></BookParcel></PrivateRoutes>
      },
      {
        path: '/dashboard/myparcels',
        element: <PrivateRoutes><MyParcels></MyParcels></PrivateRoutes>
      },
      {
          path: '/dashboard/profile',
          element:  <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
        },
        {
          path: '/dashboard/updateparcel/:id',
          element: <PrivateRoutes><UpdateParcel></UpdateParcel></PrivateRoutes>,
          loader: ({params})=> fetch(`http://localhost:5000/parcels/update/${params.id}`)
        },
        // admin routes
        {
          path: '/dashboard/users',
          element:
           <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        },
        {
          path: '/dashboard/parcels',
          element: <AdminRoute>
            <AllParcels></AllParcels>
          </AdminRoute>
        },
        {
          path: '/dashboard/deliverymen',
          element:<AdminRoute>
             <AllDeliveryMen></AllDeliveryMen>
          </AdminRoute>
        },
        {
          path: '/dashboard/statistics',
          element: <AdminRoute>
            {/* <Statistics></Statistics> */}
          </AdminRoute>
        },
        // // delivery route
        // {
        //   path: '/dashboard/deliveries',
        //   element: <DeliveryManRoute>
        //     <MyDelivery></MyDelivery>
        //   </DeliveryManRoute>
        // },
        // {
        //   path: '/dashboard/myreviews',
        //   element: <DeliveryManRoute>
        //     <MyReviews></MyReviews>
        //   </DeliveryManRoute>
        // },
        // {
        //   path: '/dashboard/payment/:id',
        //   element: <Payment></Payment>,
        //   loader: ({params})=> fetch(`http://localhost:5000/parcels/payment/${params.id}`)
        // },
     
    ]
  }
]);

export default router;
