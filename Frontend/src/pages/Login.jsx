import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        }, { withCredentials: true });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gray-100">
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

      {/* Card Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-16 h-auto min-h-[400px] max-h-[600px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login Account"}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login To Your Account"}
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-400"
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-green-500 cursor-pointer"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full hover:bg-green-500 text-cyan-50 border-2 py-2 rounded-lg bg-green-600  transition"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Button */}
        <p className="text-center text-gray-600 mt-4">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-green-500 font-semibold hover:underline ml-1"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
