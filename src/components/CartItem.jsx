import React, { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { motion } from "framer-motion";
import { modifyQuantity, removeItem } from "../features/cartItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const CartItem = ({ item }) => {
    let dispatch = useDispatch();
    let cartItems = useSelector((store) => store.cartInfo.value);
    let [quantity, setQuantity] = useState(item.qty);
    function addQuantity(id) {
        let payload = cartItems.map((item) => {
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
    }
    function removeQuantity(id) {
        if (quantity === 1) {
            dispatch(removeItem(id));
        } else {
            let payload = cartItems.map((item) => {
                if (item.id === id) {
                    let newItem = { ...item };
                    newItem.qty = newItem.qty - 1;
                    return newItem;
                } else {
                    return item;
                }
            });
            dispatch(modifyQuantity(payload));
        }
    }
    useEffect(() => {
        setQuantity(item.qty);
    }, [cartItems]);
    return (
        <div className=" w-full p-1 px-2 rounded-lg bg-slate-400 flex items-center gap-2  ">
            <img
                src={item.imageURL}
                className="w-20 h-20 max-w-[60px] rounded-full object-contain "
                alt={item.title}
            />
            {/*Name section  */}
            <div className="flex flex-col gap-2 ">
                <p className="text-lg text-gray-50 ">{item.title}</p>
                <p className="text-sm text-gray-100 block font-semibold ">
                    $ {(item.price * quantity).toFixed(2)}
                </p>
            </div>
            {/* Button Section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer ">
                <motion.div
                    whileTap={{ scale: 0.5 }}
                    onClick={() => removeQuantity(item.id)}
                >
                    <BiMinus className="text-gray-300" />
                </motion.div>
                <p className=" w-5 h-5 p-2 rounded-sm bg-slate-500 text-gray-50 flex items-center justify-center  ">
                    {item.qty}
                </p>
                <motion.div
                    whileTap={{ scale: 0.5 }}
                    onClick={() => addQuantity(item.id)}
                >
                    <BiPlus className="text-gray-300" />
                </motion.div>
            </div>
        </div>
    );
};

export default CartItem;
