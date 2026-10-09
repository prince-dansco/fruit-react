import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFounds() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated 404 */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          404
        </motion.div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Oops! Page Not Found</h2>
          <p className="text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Illustration */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </motion.div>

        {/* Back Home Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Return Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}