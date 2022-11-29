import React, { useEffect, useRef } from "react";
import { HomeContainer } from "../components/index";
import { motion } from "framer-motion";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { RowContainer } from "./index";
import { useSelector } from "react-redux";
import { MenuContainer, CartContainer } from "../components/index";

const MainContainer = () => {
    let scrl = useRef();
    let foodItems = useSelector((store) => store.foodItems.foodItems);
    let cartShow = useSelector((store) => store.cartShow);
    useEffect(() => {}, [cartShow]);
    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
    };
    return (
        <div className="flex h-auto flex-col justify-center items-center w-full mx-0 overflow-x-hidden ">
            <HomeContainer />
            {foodItems && (
                <section className="w-full p-4 my-6 ">
                    <div className="w-full  flex items-center justify-between ">
                        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 ">
                            Our fresh and helthy
                        </p>
                        <div className="hidden md:flex gap-3  items-center ">
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                onClick={() => slide(-300)}
                                className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500  cursor-pointer transition-all duration-100 ease-in-out shadow-lg flex items-center justify-center"
                            >
                                <MdChevronLeft className="text-white text-lg " />
                            </motion.div>
                            <motion.div
                                onClick={() => slide(300)}
                                whileTap={{ scale: 0.8 }}
                                className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out shadow-lg flex items-center justify-center"
                            >
                                <MdChevronRight className="text-white text-lg " />
                            </motion.div>
                        </div>
                    </div>
                    <RowContainer
                        scrl={scrl}
                        flag={true}
                        data={foodItems}
                        categoryOfData={"fruits"}
                    />
                    <MenuContainer />
                    {cartShow.value && <CartContainer />}
                </section>
            )}
        </div>
    );
};

export default MainContainer;
