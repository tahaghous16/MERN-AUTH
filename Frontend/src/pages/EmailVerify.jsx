import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);
  const { backendUrl, userData, getUserData, isLoggedin } =
    useContext(AppContent);

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

  //submit OTP
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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

      {/* OTP Verification Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Enter Verification OTP
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={onSubmitHandler}
        >
          <div className="flex justify-center space-x-2" onPaste={handlePaste}>
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
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
