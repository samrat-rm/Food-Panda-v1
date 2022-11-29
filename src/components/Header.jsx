import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import { MdShoppingBasket } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { actionType } from "../context/reducer";

const Header = () => {
    let auth = getAuth(app);
    let provider = new GoogleAuthProvider();
    const [{ user }, dispatch] = useStateValue();

    const login = async () => {
        const {
            user: { refreshToken, providerData },
        } = await signInWithPopup(auth, provider);
        dispatch({ type: actionType.SET_USER, user: providerData[0] });
    };
    return (
        <header className="w-screen fixed z-10 bg-headerColor p-6 px-16 ">
            {/*desktop and tablet */}
            <div className="hidden md:flex h-full w-full justify-between items-center ">
                <Link to={"/"} className="flex items-center gap-2 ">
                    <img
                        src="images/panda-2.svg"
                        className="object-cover w-10"
                        alt="logo"
                    />
                    <p className="text-headingColor font-bold text-xl">
                        Food Panda
                    </p>
                </Link>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Home
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Menu
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            About Us
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Service
                        </li>
                    </ul>
                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className=" text-textColor text-2xl ml-8 cursor-pointer" />
                        <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2 ">
                            <p className=" text-xs text-white font-semibold">
                                3
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={Avatar}
                            className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl "
                            alt="user profile"
                            onClick={login}
                        />
                    </div>
                </div>
            </div>
            {/*mobile */}
            <div className="flex md:hidden h-full "></div>
        </header>
    );
};

export default Header;
