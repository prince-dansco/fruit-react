import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../backendExtention/firebaseFile";

export default function Password() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");

  const handleBack = () => {
    navigate("/signUp");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const userEmail = localStorage.getItem("userEmailForSignUp");

      if (!userEmail) {
        throw new Error("Email not found. Please complete the signup process.");
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        data.password
      );

      // User created successfully
      const user = userCredential.user;
      console.log("User created:", user);

      // Clear the stored email
      localStorage.removeItem("userEmailForSignUp");

      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNoSpaces = !/\s/.test(password);
  const hasNumber = /[0-9]/.test(password);

  // Check if all validations pass
  const allValid = hasMinLength && hasUpperCase && hasNoSpaces && hasNumber;

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[190px] w-full flex items-center mx-auto pt-10 pb-5">
          <div className="text-white p-2 rounded-sm bg-[#B6349A]">
            <SiMarketo size={25} />
          </div>
          <h1 className="text-[#B6349A] text-4xl font-bold ">EasyMart</h1>
        </div>
        <hr className="border-gray-200" />

        <div className="max-w-[430px] w-full mx-auto my-10 px-4">
          <button
            onClick={handleBack}
            className="flex items-center text-[#B6349A] mb-4 px-2 py-3 outline outline-1 rounded-full"
          >
            <FaArrowLeft className="mr-2" />
          </button>
          <h1 className="text-[#0D0C0D] font-semibold text-[32px] leading-[48px] mb-2">
            create password
          </h1>
          <div className="my-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 bg-[#f5f2f2] p-3 rounded-md"
            >
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}

              <label htmlFor="password">password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  name="password"
                  id="password"
                  placeholder="password"
                  className="p-[15.5px] rounded-md bg-white border-none w-full outline  outline-0"
                  {...register("password", {
                    required: true,
                    validate: {
                      minLength: (v) => v.length >= 8,
                      hasUpperCase: (v) => /[A-Za-z]/.test(v),
                      hasNoSpaces: (v) => !/\s/.test(v),
                      hasNumber: (v) => /[0-9]/.test(v),
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[30%] transform -translate-y-1/2 text-gray-500 mt-3"
                >
                  {showPassword ? (
                    <FaEyeSlash size={30} className="text-[#B6349A]" />
                  ) : (
                    <FaEye size={30} className="text-[#B6349A]" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                disabled={!allValid || loading}
                className={`flex items-center gap-3 ${
                  allValid ? "bg-[#B6349A]" : "bg-gray-400"
                } text-white py-3 rounded-full justify-center my-3 text-base font-semibold`}
              >
                {loading ? "Creating account..." : "Continue"}
                {!loading && <FaArrowRight />}
              </button>
              <div className="my-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1 ${
                      hasMinLength ? "bg-green-500" : "bg-[#E7E6E7]"
                    } text-white rounded-full`}
                  >
                    <FaCheck size={10} />
                  </div>
                  <p className="text-[#0D0C0D] text-sm font-medium">
                    Must be at least 8 characters long
                  </p>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <div
                    className={`p-1 ${
                      hasUpperCase ? "bg-green-500" : "bg-[#E7E6E7]"
                    } text-white rounded-full`}
                  >
                    <FaCheck size={10} />
                  </div>
                  <p className="text-[#0D0C0D] text-sm font-medium">
                    Include at least one uppercase letter (A-Z)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1 ${
                      hasNoSpaces ? "bg-green-500" : "bg-[#E7E6E7]"
                    } text-white rounded-full`}
                  >
                    <FaCheck size={10} />
                  </div>
                  <p className="text-[#0D0C0D] text-sm font-medium">
                    No spaces allowed
                  </p>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <div
                    className={`p-1 ${
                      hasNumber ? "bg-green-500" : "bg-[#E7E6E7]"
                    } text-white rounded-full`}
                  >
                    <FaCheck size={10} />
                  </div>
                  <p className="text-[#0D0C0D] text-sm font-medium">
                    Include at least one number (0-9)
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
