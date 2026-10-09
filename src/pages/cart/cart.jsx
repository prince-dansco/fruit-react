

import React from "react";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../../components/homeCom/cartContext";

const CartPage = () => {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } =
    useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateItemQuantity(item, item.quantity - 1);
    } else {
      removeFromCart(item.name, item.category, item.subcategory);
    }
  };

  const increaseQuantity = (item) => {
    updateItemQuantity(item, item.quantity + 1);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500 mb-8">Your cart is empty</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cartItems.map((item) => (
          <div
            key={`${item.name}-${item.category}-${item.subcategory || ""}`}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={item.image || "/api/placeholder/80/80"}
                alt={item.name}
                className="w-full h-full object-cover rounded"
              />
            </div>

            <div className="ml-4 flex-grow">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-500 text-sm">
                {item.category}
                {item.subcategory && ` - ${item.subcategory}`}
              </p>
              <p className="text-green-600 font-bold mt-1">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center">
              <button
                className="p-2 text-gray-500 hover:text-red-500"
                onClick={() => decreaseQuantity(item)}
              >
                {item.quantity > 1 ? <FiMinus /> : <FiTrash2 />}
              </button>

              <span className="mx-3 font-medium">{item.quantity}</span>

              <button
                className="p-2 text-gray-500 hover:text-blue-500"
                onClick={() => increaseQuantity(item)}
              >
                <FiPlus />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-lg font-medium">Total:</span>
            <span className="text-2xl font-bold ml-2">${total.toFixed(2)}</span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Checkout functionality would go here")}
              className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
