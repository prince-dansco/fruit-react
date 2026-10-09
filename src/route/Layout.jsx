import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/globalComp/NavBar";
import Footer from "../components/globalComp/footer";

// import FooterPage from "../components/globalComp/footerPage";

export default function Layout() {
  const location = useLocation();

  const noNavbarRoutes = [
    // "/signIn",
    // "/signUp",
    // "/forgettedPassword",
    // "/updatedPassword",
    // "/dashBoard",
    "/",
    "/firstPage",
    "/secondPage",
  ];
  const noFooterRoutes = [
    // "/signIn",
    // "/signUp",
    // "/forgettedPassword",
    // "/updatedPassword",

    // "/",

    "/",
    "/firstPage",
    "/secondPage",
  ];

  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div>
      {showNavbar && <NavBar />}

      <div className={showNavbar ? "mt-10" : ""}>
        <Outlet />
      </div>

      {showFooter && <Footer />}
    </div>
  );
}
