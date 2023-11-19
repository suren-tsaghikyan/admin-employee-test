import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import BuyersHistory from "./pages/dashboard/BuyersHistory";
import Products from "./pages/dashboard/Products";
import BoughtProducts from "./pages/employee/BoughtProducts";
import BuyProduct from "./pages/employee/BuyProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard/buyers-history",
        element: <BuyersHistory />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      },
      {
        path: "/bought-products",
        element: <BoughtProducts />,
      },
      {
        path: "/buy-product",
        element: <BuyProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace={true} />,
  },
]);
