import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaGoogle, FaPhoneAlt } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { SiMarketo } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../backendExtention/firebaseFile";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";

export default function Login() {
  const [loginMethod, setLoginMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const phoneNumber = watch("phone");

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    reset();
    setError("");
  };

  // Setup RecaptchaVerifier when needed for phone authentication
  const setupRecaptcha = () => {
    // Clear any existing recaptcha
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (recaptchaContainer) {
      recaptchaContainer.innerHTML = "";
    }

    // Create new verifier
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    return recaptchaVerifier;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      if (loginMethod === "email") {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const user = userCredential.user;
        console.log("User logged in:", user);
        reset();
        navigate("/dashboard");
      } else {
        // Phone login logic
        console.log("Phone login data:", data);
        const formattedPhone = data.phone; // Ensure phone number has country code

        sessionStorage.setItem("phoneNumber", formattedPhone);

        // Navigate to phone verification page
        navigate("/phoneVer");
      }
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "An error occurred during login";

      if (err.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage =
          "Account temporarily disabled due to many failed attempts";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (err.code === "auth/invalid-phone-number") {
        errorMessage = "Invalid phone number format";
      }

      setError(errorMessage);
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
        console.log("Google sign-in successful:", user);
        navigate("/dashboard");
      } else if (provider === "facebook") {
        // Facebook authentication would go here
        setError("Facebook authentication is not available at the moment");
      }
    } catch (err) {
      console.error("Social login error:", err);

      let errorMessage = "An error occurred during social login";
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup was closed before completing";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[190px] w-full flex items-center mx-auto pt-10 pb-5">
        <div className="text-white p-2 rounded-sm bg-[#B6349A]">
          <SiMarketo size={25} />
        </div>
        <h1 className="text-[#B6349A] text-4xl font-bold ">EasyMart</h1>
      </div>
      <hr className="border-gray-200" />

      <div className="max-w-[430px] w-full mx-auto my-10 px-4">
        <h1 className="uppercase text-2xl font-bold text-gray-800 mb-6">
          Login
        </h1>
        <div className="bg-[#FCFCFC] rounded-[24px] p-6 gap-8 flex flex-col shadow-md">
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
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#B6349A]"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-[#B6349A] text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={loading || !isValid}
                  className="w-full flex justify-center items-center gap-2 bg-[#B6349A] text-white py-2 px-4 rounded-md hover:bg-[#9E2D87] transition-colors disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"} <FaArrowRight />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Please enter your number with the country code (e.g +234 for
                    Nigeria)
                  </p>
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
              <FaMeta /> Sign in with Meta
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-2 bg-[#F8F7F8] py-2 px-4 text-base font-base rounded-md hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              <FaGoogle /> Sign in with Google
            </button>
          </div>
          <div className="">
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-[#B6349A] text-lg">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Hidden recaptcha container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
