import { createBrowserRouter } from "react-router-dom";
import Layout from "./layOut";
import NotFounds from "../not-found";
import Intro from "../pages/entryOne/firstpage";
import SecondIntro from "../pages/entryTwo/secondpage";
import App from "../App";
import Register from "../pages/auth/register/signUp";
import Login from "../pages/auth/login/login";
import OtpVerification from "../pages/auth/otpPhone/phoneVer";
import Password from "../pages/auth/password/password";
import DashBoard from "../pages/dashboard/dashboard";
import CartPage from "../pages/cart/cart";
// import ProtectedRoute from "../components/globalComp/wrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/dashboard",
        element: (
          // <ProtectedRoute>
            <DashBoard />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          // <Wrapper>

            <CartPage />
          // </Wrapper>
        ),
      },
      {
        path: "*",
        element: <NotFounds />,
      },
    ],
  },
  // Routes without NavBar
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <Register /> },
  { path: "/phoneVer", element: <OtpVerification /> },
  { path: "/firstPage", element: <Intro /> },
  { path: "/secondPage", element: <SecondIntro /> },
  { path: "/password", element: <Password /> },
  // { path: "/updatedPassword", element: <UpdatedPassword /> },
]);
