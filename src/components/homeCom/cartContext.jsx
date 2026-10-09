// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the cart context
// const CartContext = createContext();

// // Custom hook to use the cart context
// export const useCart = () => useContext(CartContext);

// // Provider component
// export const CartProvider = ({ children }) => {
//   // Initialize cart from localStorage if available
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add item to cart
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       // Check if product already exists in cart
//       const existingItem = prevItems.find(
//         (item) =>
//           item.name === product.name &&
//           item.category === product.category &&
//           item.subcategory === (product.subcategory || "")
//       );

//       if (existingItem) {
//         // Update quantity if item exists
//         return prevItems.map((item) =>
//           item.name === product.name &&
//           item.category === product.category &&
//           item.subcategory === (product.subcategory || "")
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Add new item
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (productName, category, subcategory) => {
//     setCartItems((prevItems) =>
//       prevItems.filter(
//         (item) =>
//           !(
//             item.name === productName &&
//             item.category === category &&
//             item.subcategory === (subcategory || "")
//           )
//       )
//     );
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Get cart total item count
//   const getCartCount = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   // Check if product is in cart
//   const isInCart = (productName, category, subcategory) => {
//     return cartItems.some(
//       (item) =>
//         item.name === productName &&
//         item.category === category &&
//         item.subcategory === (subcategory || "")
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         getCartCount,
//         isInCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect } from "react";

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.name === product.name &&
          item.category === product.category &&
          item.subcategory === (product.subcategory || "")
      );

      if (existingItemIndex >= 0) {
        // Create a new array with the updated item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Update item quantity directly
  const updateItemQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(item.name, item.category, item.subcategory);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.name === item.name &&
          cartItem.category === item.category &&
          cartItem.subcategory === (item.subcategory || "")
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    }
  };

  // Remove item from cart
  const removeFromCart = (productName, category, subcategory) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.name === productName &&
            item.category === category &&
            item.subcategory === (subcategory || "")
          )
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total item count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if product is in cart
  const isInCart = (productName, category, subcategory) => {
    return cartItems.some(
      (item) =>
        item.name === productName &&
        item.category === category &&
        item.subcategory === (subcategory || "")
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
