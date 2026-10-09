// import React, { useState, useEffect } from "react";
// import {
//   FiSearch,
//   FiShoppingCart,
//   FiUser,
//   FiMapPin,
//   FiLogOut,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import logo from "../../assets/icons/icons_three.png";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../backendExtention/firebaseFile";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useSearch } from "./SearchContext";
// // import { useSearch } from './SearchContext';

// export default function NavBar() {
//   const { searchTerm, setSearchTerm } = useSearch();
//   const [cartItems] = useState(14);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setIsLoggedIn(!!currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   // Handle search submit
//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate("/products"); // Navigate to the products page to show search results
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white shadow-sm sticky top-0 z-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo and Location - Left Side */}
//           <div className="flex items-center space-x-4">
//             <div className="flex-shrink-0">
//               <Link to="/">
//                 <img className="h-8 w-auto" src={logo} alt="Company Logo" />
//               </Link>
//             </div>

//             <div className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-pink-600 cursor-pointer transition-colors">
//               <FiMapPin className="mr-1" />
//               <span>New York, NY</span>
//             </div>
//           </div>

//           {/* Search Bar - Center */}
//           <div className="flex-1 max-w-xl mx-4">
//             <form onSubmit={handleSearch} className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search for meals or restaurants..."
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </form>
//           </div>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-4 md:space-x-6">
//             {/* Cart with badge */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="cursor-pointer py-[6px] px-4 rounded-full transition-colors bg-[#FEF5FD]"
//             >
//               <Link to="/cart" className="flex items-center gap-2">
//                 <div className="bg-white p-2 rounded-full flex gap-1">
//                   <FiShoppingCart className="text-pink-500 h-5 w-5" size={10} />
//                   {cartItems > 0 && (
//                     <span className="text-pink-500 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                       {cartItems}
//                     </span>
//                   )}
//                 </div>
//                 <span className="hidden md:block text-xl font-bold">cart</span>
//               </Link>
//             </motion.div>

//             {/* Login/Logout Button */}
//             {isLoggedIn ? (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleLogout}
//                 className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
//               >
//                 <FiLogOut className="mr-2" />
//                 Logout
//               </motion.button>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
//               >
//                 <FiUser className="mr-2" />
//                 <Link to="/login" className="text-white">
//                   Login
//                 </Link>
//               </motion.button>
//             )}

//             {/* Mobile login/logout icon */}
//             <button
//               className="md:hidden p-2 rounded-full hover:bg-gray-100"
//               onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
//             >
//               {isLoggedIn ? (
//                 <FiLogOut className="text-gray-700 h-5 w-5" />
//               ) : (
//                 <FiUser className="text-gray-700 h-5 w-5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMapPin,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../../assets/icons/icons_three.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../backendExtention/firebaseFile";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSearch } from "../homeCom/searchContext";
import { useCart } from "../homeCom/cartContext";

export default function NavBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const { getCartCount } = useCart(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/products"); // Navigate to the products page to show search results
  };

  // Get cart count
  const cartCount = getCartCount();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Location - Left Side */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-8 w-auto" src={logo} alt="Company Logo" />
              </Link>
            </div>

            <div className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-pink-600 cursor-pointer transition-colors">
              <FiMapPin className="mr-1" />
              <span>New York, NY</span>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for meals or restaurants..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Cart with badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer py-[6px] px-4 rounded-full transition-colors bg-[#FEF5FD]"
            >
              <Link to="/cart" className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-full flex gap-1">
                  <FiShoppingCart className="text-pink-500 h-5 w-5" size={10} />
                  {cartCount > 0 && (
                    <span className="text-pink-500 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-xl font-bold">cart</span>
              </Link>
            </motion.div>

            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
              >
                <FiLogOut className="mr-2" />
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
              >
                <FiUser className="mr-2" />
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </motion.button>
            )}

            {/* Mobile login/logout icon */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
            >
              {isLoggedIn ? (
                <FiLogOut className="text-gray-700 h-5 w-5" />
              ) : (
                <FiUser className="text-gray-700 h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
