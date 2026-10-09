// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaArrowRight, FaGoogle, FaPhone, FaPhoneAlt } from "react-icons/fa";
// import { FaMeta } from "react-icons/fa6";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { SiMarketo } from "react-icons/si";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [loginMethod, setLoginMethod] = useState("email");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const handleMethodChange = (method) => {
//     setLoginMethod(method);
//     reset();
//     setError("");
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError("");

//     try {
//       if (loginMethod === "email") {
//         console.log("Email login data:", data);
//         navigate("/password");
//         reset();

//       } else {
//         console.log("Phone login data:", data);
//         reset();

//       }
//       navigate("/phoneVer");
//       // Handle successful submission (redirect, show success message, etc.)
//     } catch (err) {
//       setError(err.message || "An error occurred during login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSocialLogin = async (provider) => {
//     setLoading(true);
//     setError("");

//     try {
//       console.log(`Social login with ${provider}`);

//     } catch (err) {
//       setError(err.message || "An error occurred during social login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-[190px] w-full flex items-center mx-auto pt-10 pb-5">
//         <div className="text-white p-2 rounded-sm bg-[#B6349A]">
//           <SiMarketo size={25} />
//         </div>
//         <h1 className="text-[#B6349A] text-4xl font-bold ">EasyMart</h1>
//       </div>
//       <hr className="border-gray-200" />

//       <div className="max-w-[430px] w-full mx-auto my-10 px-4">
//         <h1 className="uppercase text-2xl font-bold text-gray-800 mb-6">
//           Sign Up
//         </h1>
//         <div className="bg-[#FCFCFC] rounded-[24px] p-6 gap-8 flex flex-col shadow-md">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => handleMethodChange("email")}
//               className={`flex items-center gap-3 text-base font-semibold rounded-md px-4 py-3 transition-colors ${
//                 loginMethod === "email"
//                   ? "bg-[#B6349A] text-white"
//                   : "text-[#B6349A] bg-[#FCFCFC] outline outline-1 outline-[#B6349A]"
//               }`}
//             >
//               <MdOutlineMailOutline /> Email
//             </button>
//             <button
//               onClick={() => handleMethodChange("phone")}
//               className={`flex items-center gap-3 text-base font-semibold rounded-md px-4 py-3 transition-colors ${
//                 loginMethod === "phone"
//                   ? "bg-[#B6349A] text-white"
//                   : "text-[#B6349A] bg-[#FCFCFC] outline outline-1 outline-[#B6349A]"
//               }`}
//             >
//               <FaPhoneAlt /> Phone
//             </button>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
//               {error}
//             </div>
//           )}

//           <div className="w-full">
//             {loginMethod === "email" ? (
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       errors.email
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-gray-300 focus:ring-[#B6349A]"
//                     }`}
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                         message: "Invalid email address",
//                       },
//                     })}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
//                 >
//                   {loading ? "Processing..." : "Continue"} <FaArrowRight />
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Phone Number
//                   </label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     placeholder="+1234567890"
//                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                       errors.phone
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-gray-300 focus:ring-[#B6349A]"
//                     }`}
//                     {...register("phone", {
//                       required: "Phone number is required",
//                       pattern: {
//                         value: /^\+?[0-9\s\-]+$/,
//                         message: "Invalid phone number",
//                       },
//                       minLength: {
//                         value: 6,
//                         message: "Phone number must be at least 6 characters",
//                       },
//                       maxLength: {
//                         value: 10,
//                         message: "phone number is incorrect",
//                       },
//                     })}
//                   />
//                   {errors.phone && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.phone.message}
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
//                 >
//                   {loading ? "Sending OTP..." : "Continue"} <FaArrowRight />
//                 </button>
//               </form>
//             )}
//           </div>

//           <div className="relative">
//             <hr className="border-gray-300" />
//             <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FCFCFC] px-2 text-gray-500 text-sm">
//               or
//             </p>
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={() => handleSocialLogin("facebook")}
//               className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] text-[#B6349A] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
//             >
//               <FaMeta /> Sign up with Meta
//             </button>
//             <button
//               onClick={() => handleSocialLogin("google")}
//               className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
//             >
//               <FaGoogle /> Sign up with Google
//             </button>
//           </div>
//           <div className="text-center">
//             <p>
//               Already have an account?{" "}
//               <Link to="/login" className="text-[#B6349A] text-lg">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

{
  /* <div className=""></div>; */
}
// import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { FaArrowRight, FaGoogle, FaPhoneAlt } from "react-icons/fa";
// // import { FaMeta } from "react-icons/fa6";
// // import { MdOutlineMailOutline } from "react-icons/md";
// // import { SiMarketo } from "react-icons/si";
// // import { Link, useNavigate } from "react-router-dom";
// // import { auth } from "../../../backendExtention/firebaseFile";
// // import {
// //   createUserWithEmailAndPassword,
// //   GoogleAuthProvider,
// //   signInWithPopup,
// //   sendEmailVerification,
// // } from "firebase/auth";

// // export default function Register() {
// //   const [loginMethod, setLoginMethod] = useState("email");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //   } = useForm();

// //   const handleMethodChange = (method) => {
// //     setLoginMethod(method);
// //     reset();
// //     setError("");
// //   };

// //   const onSubmit = async (data) => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       if (loginMethod === "email") {
// //         // Store email in session storage for password page
// //         sessionStorage.setItem("userEmail", data.email);
// //         console.log("Email login data:", data);
// //         navigate("/password");
// //       } else {
// //         console.log("Phone login data:", data);
// //         navigate("/phoneVer");
// //       }
// //     } catch (err) {
// //       setError(err.message || "An error occurred during login");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Function to handle email registration with password
// //   const handleEmailRegistration = async (email, password) => {
// //     try {
// //       // Create user with email and password
// //       const userCredential = await createUserWithEmailAndPassword(
// //         auth,
// //         email,
// //         password
// //       );
// //       const user = userCredential.user;

// //       // Send email verification
// //       await sendEmailVerification(user);

// //       console.log("User registered:", user);
// //       return user;
// //     } catch (error) {
// //       console.error("Error registering with email:", error);
// //       throw error;
// //     }
// //   };

// //   const handleSocialLogin = async (provider) => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       if (provider === "google") {
// //         const googleProvider = new GoogleAuthProvider();
// //         const result = await signInWithPopup(auth, googleProvider);

// //         // The signed-in user info
// //         const user = result.user;
// //         console.log("Google sign-in successful:", user);

// //         // Redirect to dashboard or home page after successful login
// //         navigate("/dashboard");
// //       } else if (provider === "facebook") {
// //         // Facebook authentication would go here
// //         console.log("Facebook authentication not implemented yet");
// //         setError("Facebook authentication is not available at the moment");
// //       }
// //     } catch (err) {
// //       console.error("Social login error:", err);

// //       // Handle common errors
// //       if (err.code === "auth/popup-closed-by-user") {
// //         setError("Sign-in popup was closed before completing the sign-in");
// //       } else if (err.code === "auth/cancelled-popup-request") {
// //         setError("Sign-in popup request was cancelled");
// //       } else if (err.code === "auth/popup-blocked") {
// //         setError("Sign-in popup was blocked by the browser");
// //       } else {
// //         setError(err.message || "An error occurred during social login");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-[190px] w-full flex items-center mx-auto pt-10 pb-5">
// //         <div className="text-white p-2 rounded-sm bg-[#B6349A]">
// //           <SiMarketo size={25} />
// //         </div>
// //         <h1 className="text-[#B6349A] text-4xl font-bold ">EasyMart</h1>
// //       </div>
// //       <hr className="border-gray-200" />

// //       <div className="max-w-[430px] w-full mx-auto my-10 px-4">
// //         <h1 className="uppercase text-2xl font-bold text-gray-800 mb-6">
// //           Sign Up
// //         </h1>
// //         <div className="bg-[#FCFCFC] rounded-[24px] p-6 gap-8 flex flex-col shadow-md">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => handleMethodChange("email")}
// //               className={`flex items-center gap-3 text-base font-semibold rounded-md px-4 py-3 transition-colors ${
// //                 loginMethod === "email"
// //                   ? "bg-[#B6349A] text-white"
// //                   : "text-[#B6349A] bg-[#FCFCFC] outline outline-1 outline-[#B6349A]"
// //               }`}
// //             >
// //               <MdOutlineMailOutline /> Email
// //             </button>
// //             <button
// //               onClick={() => handleMethodChange("phone")}
// //               className={`flex items-center gap-3 text-base font-semibold rounded-md px-4 py-3 transition-colors ${
// //                 loginMethod === "phone"
// //                   ? "bg-[#B6349A] text-white"
// //                   : "text-[#B6349A] bg-[#FCFCFC] outline outline-1 outline-[#B6349A]"
// //               }`}
// //             >
// //               <FaPhoneAlt /> Phone
// //             </button>
// //           </div>

// //           {error && (
// //             <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
// //               {error}
// //             </div>
// //           )}

// //           <div className="w-full">
// //             {loginMethod === "email" ? (
// //               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //                 <div className="space-y-2">
// //                   <label
// //                     htmlFor="email"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Email
// //                   </label>
// //                   <input
// //                     id="email"
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                       errors.email
// //                         ? "border-red-500 focus:ring-red-500"
// //                         : "border-gray-300 focus:ring-[#B6349A]"
// //                     }`}
// //                     {...register("email", {
// //                       required: "Email is required",
// //                       pattern: {
// //                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                         message: "Invalid email address",
// //                       },
// //                     })}
// //                   />
// //                   {errors.email && (
// //                     <p className="text-red-500 text-xs mt-1">
// //                       {errors.email.message}
// //                     </p>
// //                   )}
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
// //                 >
// //                   {loading ? "Processing..." : "Continue"} <FaArrowRight />
// //                 </button>
// //               </form>
// //             ) : (
// //               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //                 <div className="space-y-2">
// //                   <label
// //                     htmlFor="phone"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Phone Number
// //                   </label>
// //                   <input
// //                     id="phone"
// //                     type="tel"
// //                     placeholder="+1234567890"
// //                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                       errors.phone
// //                         ? "border-red-500 focus:ring-red-500"
// //                         : "border-gray-300 focus:ring-[#B6349A]"
// //                     }`}
// //                     {...register("phone", {
// //                       required: "Phone number is required",
// //                       pattern: {
// //                         value: /^\+?[0-9\s\-]+$/,
// //                         message: "Invalid phone number",
// //                       },
// //                       minLength: {
// //                         value: 6,
// //                         message: "Phone number must be at least 6 characters",
// //                       },
// //                       maxLength: {
// //                         value: 10,
// //                         message: "phone number is incorrect",
// //                       },
// //                     })}
// //                   />
// //                   {errors.phone && (
// //                     <p className="text-red-500 text-xs mt-1">
// //                       {errors.phone.message}
// //                     </p>
// //                   )}
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
// //                 >
// //                   {loading ? "Sending OTP..." : "Continue"} <FaArrowRight />
// //                 </button>
// //               </form>
// //             )}
// //           </div>

// //           <div className="relative">
// //             <hr className="border-gray-300" />
// //             <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FCFCFC] px-2 text-gray-500 text-sm">
// //               or
// //             </p>
// //           </div>

// //           <div className="space-y-3">
// //             <button
// //               onClick={() => handleSocialLogin("facebook")}
// //               className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] text-[#B6349A] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
// //               disabled={loading}
// //             >
// //               <FaMeta /> Sign up with Meta
// //             </button>
// //             <button
// //               onClick={() => handleSocialLogin("google")}
// //               className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
// //               disabled={loading}
// //             >
// //               <FaGoogle /> Sign up with Google
// //             </button>
// //           </div>
// //           <div className="text-center">
// //             <p>
// //               Already have an account?{" "}
// //               <Link to="/login" className="text-[#B6349A] text-lg">
// //                 Login
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaGoogle, FaPhoneAlt } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiMarketo } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../backendExtention/firebaseFile";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Register() {
  const [loginMethod, setLoginMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    reset();
    setError("");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      if (loginMethod === "email") {
        // Store email in localStorage for password page
        localStorage.setItem("userEmailForSignUp", data.email);
        navigate("/password");
      } else {
        // Phone number logic
        navigate("/phoneVer");
      }
    } catch (err) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError("");

    try {
      if (provider === "google") {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Redirect to dashboard after successful login
        navigate("/dashboard");
      } else if (provider === "facebook") {
        setError("Facebook authentication is not available at the moment");
      }
    } catch (err) {
      console.error("Social login error:", err);
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "Sign-in popup was closed before completing"
          : err.message || "An error occurred during social login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... (keep your existing UI code) ... */}

      <div className="max-w-[430px] w-full mx-auto my-10 px-4">
        <h1 className="uppercase text-2xl font-bold text-gray-800 mb-6">
          Sign Up
        </h1>
        <div className="bg-[#FCFCFC] rounded-[24px] p-6 gap-8 flex flex-col shadow-md">
          {/* Method selection buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleMethodChange("email")}
              className={`flex items-center gap-3 text-base font-semibold rounded-md px-4 py-3 transition-colors ${
                loginMethod === "email"
                  ? "bg-[#B6349A] text-white"
                  : "text-[#B6349A] bg-[#FCFCFC] outline outline-1 outline-[#B6349A]"
              }`}
            >
              <MdOutlineMailOutline /> Email
            </button>
            <button
              onClick={() => handleMethodChange("phone")}
              className={`flex items-center gap-3 text-base font-semibold rounded-md px-4 py-3 transition-colors ${
                loginMethod === "phone"
                  ? "bg-[#B6349A] text-white"
                  : "text-[#B6349A] bg-[#FCFCFC] outline outline-1 outline-[#B6349A]"
              }`}
            >
              <FaPhoneAlt /> Phone
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="w-full">
            {loginMethod === "email" ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#B6349A]"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading || !isValid}
                  className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Continue"} <FaArrowRight />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Phone form remains the same */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#B6349A]"
                    }`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[0-9\s\-]+$/,
                        message: "Invalid phone number",
                      },
                      minLength: {
                        value: 6,
                        message: "Phone number must be at least 6 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "phone number is incorrect",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Continue"} <FaArrowRight />
                </button>
              </form>
            )}
          </div>

          {/* Social login buttons */}
          <div className="relative">
            <hr className="border-gray-300" />
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FCFCFC] px-2 text-gray-500 text-sm">
              or
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] text-[#B6349A] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              <FaMeta /> Sign up with Meta
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              <FaGoogle /> Sign up with Google
            </button>
          </div>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-[#B6349A] text-lg">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
