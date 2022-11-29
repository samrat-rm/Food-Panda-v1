import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setCartShow } from "../features/cartShowSlice";
import { setClearCart } from "../features/cartItemsSlice";
import emptySvg from "../img/empty.svg";
import CartItem from "./CartItem";
import PaymentStatus from "./PaymentStatus";
import "./scrollbarRemover.css";

const CartContainer = () => {
    let dispatch = useDispatch();
    let user = useSelector((store) => store.user.value);
    let cartInfo = useSelector((store) => store.cartInfo.value);
    let subTotal = cartInfo.reduce((p, c) => {
        let { qty, price } = c;
        let newPrice = parseFloat(price);
        return p + newPrice * qty;
    }, 0);
    let [paymentStatus, setPaymentStatus] = useState(false);
    let cartItemsArray = cartInfo.map((item, ind) => (
        <CartItem key={ind} item={item} index={ind} />
    ));
    let deliveryPrice = 2.5;
    function closeCart() {
        dispatch(setCartShow(false));
    }
    function clearCart() {
        dispatch(setClearCart());
    }
    function paymentGateway() {
        if (subTotal === 0) {
            alert("Please add something to cart");
            return;
        } else {
            let total =
                subTotal +
                (cartItemsArray && cartItemsArray.length > 0
                    ? deliveryPrice
                    : 0);
            total = Math.round(total * 100);
            // have to pass the total in terms of paise so *100
            console.log(total);
            let options = {
                key: "rzp_test_Kox6do7MhJG3uc",
                key_secret: "QDeTYhNYChEyLK1EVZOrsp8A",
                amount: total,
                currency: "INR",
                name: "FOOD PANDA",
                description: "Web development project for job opportunities",
                handler: function (response) {
                    alert(response.razorpay_payment_id);
                },
                prefill: {
                    name: "samrat",
                    email: "samratrm1@gmail.com",
                    contact: "1234567890",
                },
                notes: {
                    address: "razorpay Corporate Office",
                },
                theme: {
                    color: "#f97a1e",
                },
            };
            var pay = window.Razorpay(options);
            pay.open(); // opens the gateway
            setPaymentStatus(true);
            setTimeout(() => {
                setPaymentStatus(false);
            }, 3000);
            clearCart(); // clear cart after payment
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -200 }}
            className="w-[90vw]  md:w-375 h-[100vh] bg-slate-200 drop-shadow-md flex flex-col fixed rounded-2xl top-0 mx-3 md:mx-0 right-3 md:right-5  z-[100]"
        >
            {paymentStatus && <PaymentStatus />}
            <div className="w-full flex justify-between items-center p-4 cursor-pointer ">
                <motion.div whileTap={{ scale: 0.75 }}>
                    <MdOutlineKeyboardBackspace
                        onClick={closeCart}
                        className="text-textColor text-3xl"
                    />
                </motion.div>
                <p className=" text-textColor font-semibold text-lg ">Cart</p>
                <motion.p
                    whileTap={{ scale: 0.8 }}
                    onClick={clearCart}
                    className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base  "
                >
                    Clear <RiRefreshFill />
                </motion.p>
            </div>
            {/* Bottom section */}
            <div className="w-auto h-full  mx-3 mb-3 rounded-2xl flex flex-col">
                {/*Cart Items Section */}
                <div className=" w-full h-340  px-6 py-5 flex flex-col overflow-y-auto gap-3 ">
                    {/* Cart Item* */}
                    {cartItemsArray && cartItemsArray.length > 0 ? (
                        cartItemsArray
                    ) : (
                        <div className="flex flex-col items-center  justify-center">
                            <img src={emptySvg} className="h-8 w-8 " alt="" />{" "}
                            <h3 className="font-semibold">Cart is empty</h3>
                        </div>
                    )}
                </div>
                {/* Cart Total Section  */}
                <div className="w-full flex-1 bg-cartTotal rounded-lg flex flex-col items-center shadow-lg shadow-black justify-evenly px-8 py-2">
                    <div className="w-full flex items-center justify-between ">
                        <p className="text-gray-400 text-lg ">Sub Total</p>
                        <p className="text-gray-400 text-lg">
                            $ {subTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-between ">
                        <p className="text-gray-400 text-lg">Delivery</p>
                        <p className="text-gray-400 text-lg">
                            ${" "}
                            {cartItemsArray && cartItemsArray.length > 0
                                ? deliveryPrice
                                : 0}
                        </p>
                    </div>
                    {/* Divider Line */}
                    <div className="w-full border-b border-gray-600 my-2 "></div>
                    <div className="w-full flex justify-between items-center shadow-lg ">
                        <p className="text-gray-200 text-xl font-semibold">
                            Total
                        </p>
                        <p className="text-gray-200 text-xl font-semibold">
                            ${" "}
                            {(
                                subTotal +
                                (cartItemsArray && cartItemsArray.length > 0
                                    ? deliveryPrice
                                    : 0)
                            ).toFixed(2)}
                        </p>
                    </div>
                    {user ? (
                        <motion.button
                            onClick={paymentGateway}
                            className="w-full p-2 rounded-full bg-yellow-300  text-gray-800 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out "
                        >
                            Check out
                        </motion.button>
                    ) : (
                        <motion.button className="w-full p-2 rounded-full bg-yellow-300  text-gray-800 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out ">
                            Login to Check out
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
export default CartContainer;
