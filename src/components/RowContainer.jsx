import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import missing from "../img/missing.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCartInfo, modifyQuantity } from "../features/cartItemsSlice";
import "./scrollbarRemover.css";
const RowContainer = ({ flag, data, categoryOfData, scrl }) => {
    let dispatch = useDispatch();
    let cartInfo = useSelector((store) => store.cartInfo.value);
    function addItemToCartInfo(item) {
        let alreadyInCart = false;
        let id = item.id;
        cartInfo.map((item) => {
            if (id === item.id) {
                alreadyInCart = true;
            }
        });
        if (alreadyInCart) {
            let payload = cartInfo.map((item) => {
                if (item.id === id) {
                    let newItem = { ...item };
                    newItem.qty = newItem.qty + 1;
                    console.log(newItem);
                    return newItem;
                } else {
                    return item;
                }
            });
            dispatch(modifyQuantity(payload));
        } else {
            dispatch(setCartInfo(item));
        }
    }
    let foodItemsArray = [];
    if (data) {
        for (let i = 0; i < Object.keys(data).length; i++) {
            if (data[`${i}`].category !== categoryOfData) {
                continue;
            }
            foodItemsArray.push(
                <motion.div
                    key={i}
                    className={`w-275 h-[225px] relative transition-none bg-no-repeat bg-cover shadow-black  min-w-[275px] scroll-smooth md:w-340  hover:mt-3 md:min-w-[300px] rounded-lg py-2 px-4 backdrop-blur-lg hover:drop-shadow-2xl hover:shadow-black z-20 hover:border-b-[0.4rem] border-gray-300 flex flex-col items-center justify-evenly  ${
                        !flag
                            ? "my-3 hover:scale-105 bg-white"
                            : "my-12 bg-cardBg "
                    }`}
                >
                    <div className="w-full flex items-center justify-between ">
                        <motion.div className="w-40 h-auto -mt-8 drop-shadow-2xl">
                            <img
                                src={data[`${i}`].imageURL}
                                alt=""
                                className="w-full h-full max-h-32 drop-shadow-2xl object-contain"
                            />
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            onClick={() => addItemToCartInfo(data[`${i}`])}
                            className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                        >
                            <MdShoppingBasket className="text-white" />
                        </motion.div>
                    </div>
                    <div className="w-full flex flex-col justify-end items-end ">
                        <p className="text-black text-base md:text-lg font-semibold">
                            {data[`${i}`].title}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 ">
                            {data[`${i}`].calories} calories
                        </p>
                        <div className="flex gap-8 items-center">
                            <p className="text-headingColor text-lg font-semibold">
                                <span className="text-red-500 text-sm">$</span>
                                {data[`${i}`].price}
                            </p>
                        </div>
                    </div>
                </motion.div>
            );
        }
    }

    return (
        <div
            ref={scrl}
            className={`w-full z-10 flex items-center relative scrollbar-none my-12  scroll-smooth rounded-2xl  ${
                flag
                    ? "overflow-x-scroll removeScrollBar shadow-[inset_-25px_0px_15px_2px_rgba(196,196,196,1)] bg-gray-50 gap-3"
                    : "overflow-hidden flex-wrap justify-center  gap-0 md:gap-10 py-4 md:py-8 shadow-lg  md:mx-10 mt-20 shadow-black bg-gray-300"
            }`}
        >
            {!flag && (
                <div className="hidden md:block  ">
                    {" "}
                    <div className="absolute z-0 w-[450px] rotate-45 h-[350px] -top-10 bg-gray-400 -left-14 rounded-[200px]  "></div>
                    <div className="absolute z-0 w-[550px] rotate-45 h-[550px] bottom-10 bg-gray-400 right-14 rounded-full  "></div>
                </div>
            )}
            {data ? (
                foodItemsArray
            ) : (
                <div className="w-full flex items-center justify-center">
                    <img
                        src={NotFound}
                        className="h-[400px] z-20 w-auto "
                        alt="not found"
                    />
                    <p className="z-20 self-start  text-red-500 p-3 bg-gray-200 rounded-lg ">
                        <img
                            src={missing}
                            className="w-4 mx-auto h-4 "
                            alt="missing"
                        />
                        Items not available
                    </p>
                </div>
            )}
        </div>
    );
};

export default RowContainer;
