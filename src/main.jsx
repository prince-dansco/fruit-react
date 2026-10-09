import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/route.jsx";
import { SearchProvider } from "./components/homeCom/searchContext.jsx";
import { CartProvider } from "./components/homeCom/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <SearchProvider>
     <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
      </SearchProvider>
  </StrictMode>
);
