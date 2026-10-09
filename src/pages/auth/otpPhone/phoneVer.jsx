import { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../backendExtention/firebaseFile";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCountDown, setResendCountDown] = useState(60);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Initialize phone number and recaptcha on component mount
  useEffect(() => {
    // Get phone number from session storage
    const storedPhone = sessionStorage.getItem("phoneNumber");
    if (!storedPhone) {
      navigate("/login");
      return;
    }

    setPhoneNumber(storedPhone);

    // Initialize RecaptchaVerifier
    const recaptchaVerifier = setupRecaptcha();

    // Send OTP immediately when component mounts
    if (recaptchaVerifier) {
      sendOtp(recaptchaVerifier, storedPhone);
    }

    // Cleanup function
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.error("Error clearing recaptcha:", error);
        }
      }
    };
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (resendCountDown > 0) {
      timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountDown]);

  // Focus input field when activeInput changes
  useEffect(() => {
    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput].focus();
    }
  }, [activeInput]);

  // Setup RecaptchaVerifier
  const setupRecaptcha = () => {
    try {
      // Clear any existing recaptcha
      window.recaptchaVerifier = null;
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
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );

      // Store reference globally to ensure it's accessible
      window.recaptchaVerifier = recaptchaVerifier;

      return recaptchaVerifier;
    } catch (error) {
      console.error("Error setting up reCAPTCHA:", error);
      setError("Failed to set up verification. Please refresh the page.");
      return null;
    }
  };

  // Send OTP
  const sendOtp = async (recaptchaVerifier, phone) => {
    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      if (!recaptchaVerifier) {
        throw new Error("reCAPTCHA setup failed");
      }

      // Format phone number correctly - ensure it has international format
      // This assumes phone number is already in "+1234567890" format
      if (!phone.startsWith("+")) {
        phone = "+" + phone;
      }

      const confirmResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );

      setConfirmationResult(confirmResult);
      setSuccess("OTP sent successfully.");
      setResendCountDown(60);
    } catch (err) {
      console.error("Error sending OTP:", err);

      if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number. Please check the number.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.");
      } else if (err.code === "auth/billing-not-enabled") {
        setError(
          "Service requires billing to be enabled on your Firebase project."
        );
      } else if (err.code === "auth/quota-exceeded") {
        setError("SMS quota exceeded. Please try again later.");
      } else if (err.code === "auth/internal-error") {
        setError("Authentication service error. Please try again later.");
      } else {
        setError(`Failed to send OTP: ${err.message || "Unknown error"}`);
      }

      setResendCountDown(0);
    } finally {
      setIsResending(false);
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    if (resendCountDown > 0) return;

    const recaptchaVerifier = setupRecaptcha();
    if (recaptchaVerifier) {
      sendOtp(recaptchaVerifier, phoneNumber);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit numbers
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if a digit was entered
      if (value && index < 5) {
        setActiveInput(index + 1);
      }

      // Auto-verify if all digits are filled
      if (value && index === 5) {
        const completeOtp = [...otp];
        completeOtp[index] = value;
        if (completeOtp.every((digit) => digit !== "")) {
          verifyOtp(completeOtp.join(""));
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split("").slice(0, 6);
      setOtp(pasteArray);
      setActiveInput(5);

      // Auto-verify on paste if valid
      verifyOtp(pasteData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    verifyOtp(code);
  };

  // Verify OTP
  const verifyOtp = async (code) => {
    if (!code || code.length !== 6) return;

    setIsVerifying(true);
    setError("");

    try {
      if (!confirmationResult) {
        throw new Error("Please request OTP first");
      }

      await confirmationResult.confirm(code);
      setSuccess("Verification successful!");

      // Navigate to dashboard after successful verification
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Error verifying OTP:", err);

      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid verification code. Please check the OTP.");
      } else if (err.code === "auth/code-expired") {
        setError("Verification code has expired. Please request a new code.");
      } else {
        setError(`Failed to verify OTP: ${err.message || "Please try again."}`);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="">
      <div className="max-w-[190px] w-full flex items-center mx-auto pt-10 pb-5">
        <div className="text-white p-2 rounded-sm bg-[#B6349A]">
          <SiMarketo size={25} />
        </div>
        <h1 className="text-[#B6349A] text-4xl font-bold ">EasyMart</h1>
      </div>
      <hr className="border-gray-200" />

      <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
        <button
          onClick={handleBack}
          className="flex items-center text-[#B6349A] mb-4 px-2 py-3 outline outline-1 rounded-full"
        >
          <FaArrowLeft className="mr-2" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enter verification code
        </h2>
        <p className="text-gray-600 mb-6">
          We sent a 6-digit code to <br />
          <span className="font-semibold">{phoneNumber || "your phone"}</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-500 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex md:justify-between space-x-2 mb-6 flex-wrap gap-4 md:gap-0">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                placeholder="0"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setActiveInput(index)}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B6349A] focus:border-transparent"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isOtpComplete || isVerifying}
            className={`w-full bg-[#B6349A] text-white py-3 px-4 rounded-md hover:bg-[#9E2D87] transition-colors flex items-center justify-center ${
              !isOtpComplete || isVerifying
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isVerifying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        <div className="text-center text-gray-600">
          <p>
            Haven't received your code?{" "}
            <button
              onClick={handleResend}
              disabled={resendCountDown > 0 || isResending}
              className={`text-[#B6349A] font-semibold hover:underline ${
                resendCountDown > 0 || isResending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isResending
                ? "Sending..."
                : resendCountDown > 0
                ? `Resend in ${resendCountDown}s`
                : "Request a New Code"}
            </button>
          </p>
        </div>
      </div>

      {/* Hidden recaptcha container - styled to ensure it renders properly */}
      <div id="recaptcha-container" className="invisible"></div>
    </div>
  );
}
