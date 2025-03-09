import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl, userData, getUserData, isLoggedin } =
    useContext(AppContent);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPasword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  //Enter OTP and Move to the next Line
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  //For Backspace key While user delete input OTP Number
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  //Paste OTP Number in Field
  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").trim();
    const pasteArray = paste.split("").slice(0, 6);

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#"
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-white tracking-wide"
          >
            MERN AUTH.
          </a>
        </div>
      </div>

      {/* Reset Password Form */}
      {!isEmailSent && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Reset Password
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your registered email
          </p>

          <form className="flex flex-col space-y-4" onSubmit={onSubmitEmail}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/*Enter the OTP*/}
      {!isOtpSubmitted && isEmailSent && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Reset Password OTP
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter the 6-digit code sent to your email
          </p>

          {/* OTP Inputs */}
          <form
            className="flex flex-col items-center space-y-6"
            onSubmit={onSubmitOTP}
          >
            <div
              className="flex justify-center space-x-2"
              onPaste={handlePaste}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 border border-gray-300 text-center text-xl font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Enter new password*/}

      {isOtpSubmitted && isEmailSent && (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            New Password
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your registered email
          </p>

          <form
            className="flex flex-col space-y-4"
            onSubmit={onSubmitNewPassword}
          >
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPasword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
