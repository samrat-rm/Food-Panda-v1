import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { signInUsingPopup, signOutUser } from "../features/userSlice";
import { setCartShow } from "../features/cartShowSlice";
import { useDispatch, useSelector } from "react-redux";

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";

const Header = () => {
    let adminEmail = "samratrm2@gmail.com";
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let auth = getAuth(app);
    let provider = new GoogleAuthProvider();
    let user = useSelector((store) => store.user.value);
    let cartInfo = useSelector((store) => store.cartInfo.value);
    let prevCartShow = useSelector((store) => store.cartShow.value);
    let [userLogin, setUserLogin] = useState({
        photoURL: user ? user.photoURL : "",
        logout: false,
    });

    function login() {
        if (!user) {
            signInWithPopup(auth, provider)
                .then((response) => {
                    let data = response.user.providerData[0];
                    dispatch(
                        signInUsingPopup({
                            data,
                        })
                    );

                    localStorage.setItem("user", JSON.stringify(data));
                })
                .catch((error) => alert(error));
        } else {
            setUserLogin((prev) => ({
                ...prev,
                logout: !prev.logout,
            }));
        }
    }
    function logoutUser() {
        dispatch(signOutUser());
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    }
    function closeAfterTimeout() {
        setTimeout(() => {
            setUserLogin((prev) => ({
                ...prev,
                logout: false,
            }));
        }, 500);
    }
    function toggleCartShow() {
        dispatch(setCartShow(!prevCartShow));
    }

    return (
        <header className="w-full fixed z-50 bg-gray-800 md:p-3 py-0 md:px-16 p-0">
            {/*desktop and tablet */}
            <div className="hidden md:flex h-full w-full justify-between items-center ">
                <Link to={"/"} className="flex items-center gap-2 ">
                    <img
                        src="images/panda-2.svg"
                        className="object-cover w-10"
                        alt="logo"
                    />
                    <p className="text-white font-bold text-xl">Food Panda</p>
                </Link>
                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -200 }}
                        className="flex items-center gap-8"
                    >
                        <li
                            onClick={() => {
                                setUserLogin((prev) => ({
                                    ...prev,
                                    logout: false,
                                }));
                            }}
                            className="text-base text-white hover:text-blue-200 duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            Home
                        </li>
                        <li
                            onClick={() => {
                                setUserLogin((prev) => ({
                                    ...prev,
                                    logout: false,
                                }));
                            }}
                            className="text-base text-white hover:text-blue-200 duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            Menu
                        </li>
                        <li
                            onClick={() => {
                                setUserLogin((prev) => ({
                                    ...prev,
                                    logout: false,
                                }));
                            }}
                            className="text-base text-white hover:text-blue-200 duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            About Us
                        </li>
                        <li
                            onClick={() => {
                                setUserLogin((prev) => ({
                                    ...prev,
                                    logout: false,
                                }));
                            }}
                            className="text-base text-white hover:text-blue-200 duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            Service
                        </li>
                    </motion.ul>
                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket
                            onClick={toggleCartShow}
                            className=" text-white text-2xl ml-8 cursor-pointer"
                        />
                        {cartInfo && cartInfo.length > 0 && (
                            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2 ">
                                <p className=" text-xs text-white font-semibold">
                                    {cartInfo.length}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.8 }}
                            src={user ? user.photoURL : Avatar}
                            className=" w-10 min-w-[40px] h-10 min-h-[40px] text-white drop-shadow-xl rounded-full "
                            alt={user ? user.displayName : "user image"}
                            onClick={() => {
                                login();
                            }}
                        />
                        {userLogin.logout && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.4 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className=" bg-white w-40 rounded-lg absolute top-12 right-0 flex flex-col shadow-2xl "
                            >
                                {user.email === adminEmail && (
                                    <Link to="/createItem">
                                        <p
                                            onClick={() => {
                                                setUserLogin((prev) => ({
                                                    ...prev,
                                                    logout: false,
                                                }));
                                            }}
                                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all text-textColor text-base "
                                        >
                                            New item <MdAdd />
                                        </p>
                                    </Link>
                                )}
                                <p
                                    onClick={logoutUser}
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:text-red-500 hover:bg-slate-100 transition-all text-textColor text-base "
                                >
                                    Logout <MdLogout />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            {/*mobile */}
            <div className="mt-0 flex items-center justify-between md:hidden h-full pt-3 pr-5 px-4 bg-gray-800 ">
                <div className="relative py-2">
                    <motion.img
                        whileTap={{ scale: 0.8 }}
                        src={user ? user.photoURL : Avatar}
                        className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full "
                        alt="user profile"
                        onClick={login}
                    />
                    {userLogin.logout && (
                        <motion.div
                            onMouseLeave={closeAfterTimeout}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className=" bg-white w-40 shadow-sm rounded-lg absolute top-11 left-0 flex flex-col "
                        >
                            {user.email === adminEmail && (
                                <Link to="/createItem">
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all text-textColor text-base ">
                                        New item <MdAdd />
                                    </p>
                                </Link>
                            )}
                            <ul className="flex flex-col items-start ">
                                <li className="px-4 py-2 flex items-center w-full gap-3 hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                    Home
                                </li>
                                <li className="px-4 py-2 flex items-center gap-3 w-full  hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                    Services
                                </li>
                                <li className="px-4 py-2 gap-3 flex items-center w-full  hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                    About Us
                                </li>
                                <li className="px-4 py-2 gap-3 flex items-center w-full  hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                    Menu
                                </li>
                            </ul>
                            <p
                                onClick={logoutUser}
                                className="text-center px-4 m-2 py-2 flex items-center gap-3 cursor-pointer hover:text-red-500 hover:bg-slate-100 transition-all bg-slate-100 rounded-md shadow-md text-textColor text-base "
                            >
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    )}
                </div>
                <Link to={"/"} className="flex items-center gap-2 ">
                    <img
                        src="images/panda-2.svg"
                        className="object-cover w-8"
                        alt="logo"
                    />
                    <p className=" text-lg text-white font-bold ">Food Panda</p>
                </Link>

                <div className="relative flex items-center justify-center">
                    <MdShoppingBasket className=" text-white text-2xl ml-8 cursor-pointer" />

                    {cartInfo && cartInfo.length > 0 && (
                        <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2 ">
                            <p className=" text-xs text-white font-semibold">
                                {cartInfo.length}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
