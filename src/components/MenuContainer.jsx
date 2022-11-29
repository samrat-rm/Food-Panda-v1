import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RowContainer } from "./index";
import "./scrollbarRemover.css";
const MenuContainer = () => {
    const [filter, setFilter] = useState("chicken");
    let foodItems = useSelector((store) => store.foodItems.foodItems);

    return (
        <section className="w-full my-6 " id="menu">
            <div className="w-full flex flex-col items-center justify-center ">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 mr-auto before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 ">
                    Our hot Dishes
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 w-full flex items-center justify-start lg:justify-center gap-8 mt-6 overflow-x-auto scrollbar-none shadow-2xl removeScrollBar">
                    {categories &&
                        categories.map((category) => (
                            <motion.div
                                whileTap={{ scale: 0.7 }}
                                key={category.id}
                                onClick={() => setFilter(category.urlParamName)}
                                className={`group ${
                                    filter === category.urlParamName
                                        ? "bg-blue-600 hover:bg-blue-800 "
                                        : "bg-gray-100 hover:bg-red-600"
                                }    w-24 min-w-[94px] h-28 cursor-pointer  rounded-lg shadow-lg flex flex-col gap-3 items-center justify-center  py-6 `}
                            >
                                <div
                                    className={`w-14 h-14 rounded-full  shadow-lg shadow-gray-500  flex items-center justify-center ${
                                        filter === category.urlParamName
                                            ? "bg-white  shadow-blue-800  group-hover:shadow-gray-800"
                                            : "bg-cartNumBg group-hover:bg-gray-800 group-hover:shadow-red-800"
                                    } `}
                                >
                                    <IoFastFood
                                        className={`text-card  h-10 w-5 text-lg${
                                            filter === category.urlParamName
                                                ? " text-blue-800  "
                                                : "group-hover:text-textColor"
                                        }  `}
                                    />
                                </div>
                                <p
                                    className={`text-sm text-textColor   ${
                                        filter === category.urlParamName
                                            ? "text-white font-semibold group-hover:text-white"
                                            : "text-textColor group-hover:text-card"
                                    } `}
                                >
                                    {category.name === "Icecreams"
                                        ? "Ice Cream"
                                        : category.name}
                                </p>
                            </motion.div>
                        ))}
                </div>
                <div className="w-full overflow-x-scroll flex justify-start items-center">
                    <RowContainer
                        flag={false}
                        data={foodItems}
                        categoryOfData={filter}
                    />
                </div>
            </div>
        </section>
    );
};

export default MenuContainer;
