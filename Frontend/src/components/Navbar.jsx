import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { backendUrl, userData, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerifivationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`
      );

      if (data.success) {
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white tracking-wide">
          MERN AUTH.
        </a>

        <ul className="hidden md:flex space-x-6 text-lg">
          {userData ? (
            <div className="text-green-500 w-10 h-10 flex justify-center items-center rounded-full bg-blue-50 relative group">
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                  {!userData.isAccountVerified && (
                    <li
                      onClick={sendVerifivationOtp}
                      className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Verify Email
                    </li>
                  )}

                  <li
                    onClick={logout}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <li>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-md"
              >
                Login
              </button>
            </li>
          )}
        </ul>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-2 mt-4 p-4 rounded-lg shadow-md">
          <li>
            <button
              onClick={() => navigate("/login")}
              className="w-20 bg-white text-green-600 px-3 py-1.5 rounded-full text-sm hover:bg-green-600 hover:text-white transition-all shadow-md"
            >
              Login
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
