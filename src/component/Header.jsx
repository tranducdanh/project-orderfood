import React, { useState } from "react";
import logo from "../img/logo.png";
import avatar from "../img/avatar.png";
import { MdAdd, MdLogout, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../fisebaseconnect";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      // console.log(response);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <div className="fixed z-10 w-screen bg-white backdrop-blur-sm md:backdrop-blur-sm bg-opacity-50 py-5 px-8">
      {/* desktop and tablet */}
      <div className=" hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className=" flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={logo}
            className="w-8 object-cover"
            alt="logo"
          />
          <p className="text-headingColor hover:text-black text-xl font-bold">
            City Food
          </p>
        </Link>
        <div className="flex items-center gap-8 ">
          <ul className="flex items-center gap-8 ml-auto">
            <li className=" text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer">
              <a href="#home">Home</a>
            </li>
            <li className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer">
              <a href="#healthyfruits">Healthy Fruits</a>
            </li>
            <li className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer">
              <a href="#menu">Menu</a>
            </li>
            <li className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer">
              <a href="#aboutus">About Us</a>
            </li>
          </ul>
          <motion.div
            whileTap={{ scale: 0.75 }}
            whileHover={{ scale: 1.05 }}
            onClick={showCart}
            className="relative flex items-center justify-center"
          >
            <MdShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {" "}
                  {cartItems.length}{" "}
                </p>
              </div>
            )}
          </motion.div>
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.75 }}
              src={user ? user.photoURL : avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer "
              alt="avatar"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
              >
                <Link to={"/createItem"}>
                  <p
                    onClick={() => setIsMenu(false)}
                    className="  px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    <MdAdd /> New Item
                  </p>
                </Link>
                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 hover:rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  <MdLogout /> Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*Mobile */}

      <div className="flex items-center justify-between md:hidden w-full h-full">
        {/* gio hang  */}
        <div className="relative flex items-center justify-center">
          <MdShoppingCart
            onClick={showCart}
            className="text-textColor text-2xl ml-8 cursor-pointer"
          />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {" "}
                {cartItems.length}{" "}
              </p>
            </div>
          )}
        </div>
        {/* logo  */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City Food</p>
        </Link>
        {/* avartar  */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.7 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
            src={user ? user.photoURL : avatar}
            alt="avatar"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
            >
              <Link to={"/createItem"}>
                <p
                  onClick={() => setIsMenu(false)}
                  className="hover:rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  <MdAdd /> New Item
                </p>
              </Link>

              {/* menu  */}
              <ul className="flex flex-col px-4 py-3 gap-4">
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer"
                >
                  <a href="#home">Home</a>
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer"
                >
                  <a href="#healthyfruits">Healthy Fruits</a>
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer"
                >
                  <a href="#menu">Menu</a>
                </li>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor hover:text-red-600 hover:font-medium duration-100 transition-all ease-in-out cursor-pointer"
                >
                  <a href="#aboutus">About Us</a>
                </li>
              </ul>

              <p
                className="hover:rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                <MdLogout />
                Logout
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
