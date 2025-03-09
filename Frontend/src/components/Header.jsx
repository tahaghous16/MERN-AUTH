import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  return (
    <header className="flex flex-col items-center justify-center h-screen w-full text-center shadow-md px-4 sm:px-6 md:px-8 transition-all duration-300">
      {userData ? (
        <div className="animate-fade-in">
          <div className=" text-green-800 px-4 py-2 rounded-lg  mb-4">
            ✅ Successfully Logged In
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-green-600">
            Welcome,{" "}
            <span className="text-green-800 bg-green-200 px-2 rounded-lg shadow-sm">
              {userData.name}!
            </span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-gray-600 italic">
            Let's accomplish something great today!
          </p>
        </div>
      ) : (
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center">
            Welcome to <span className="text-green-600">MERN AUTH</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
            <span className="text-green-600 font-semibold">MERN AUTH</span> is a
            secure and scalable authentication system built with{" "}
            <span className="text-green-500 font-semibold">
              MongoDB, Express, React,
            </span>{" "}
            and <span className="text-green-500 font-semibold">Node.js.</span>
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
