import { useState } from "react";
import logoImg from "../images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utlis/firebase";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  return (
    <div className="bg-[#1f1f2e] shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="logo">
          <img
            className="h-20 w-auto object-contain"
            src={logoImg}
            alt="logo"
          />
        </div>

        <div className="lg:hidden">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {user && (
          <ul className="hidden lg:flex space-x-6 text-white font-medium items-center">
            <li className="px-4 hover:text-orange-400 cursor-pointer">
              <Link to="/home">Home</Link>
            </li>
            <li className="px-4 hover:text-orange-400 cursor-pointer">
              <Link to="/browse">Browse</Link>
            </li>
            <li className="px-4 hover:text-orange-400 cursor-pointer">
              <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>
            <li className="px-4 hover:text-orange-400 cursor-pointer">
              <Link to="/my-orders">My Order</Link>
            </li>
            <li className="px-4 flex flex-col items-start text-orange-300 font-semibold">
              <span>{user.displayName}</span>
              <button
                onClick={handleSignout}
                className="text-white hover:text-orange-400 font-bold"
              >
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </div>

      {menuOpen && user && (
        <ul className="lg:hidden mt-4 space-y-3 text-white font-medium">
          <li>
            <Link to="/home" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/browse" onClick={() => setMenuOpen(false)}>
              Browse
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart ({cartItems.length})
            </Link>
          </li>
          <li>
            <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
              My Order
            </Link>
          </li>
          <li className="text-orange-300">
            <span>{user.displayName}</span>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleSignout();
              }}
              className="text-white hover:text-orange-400 font-bold block mt-1"
            >
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
