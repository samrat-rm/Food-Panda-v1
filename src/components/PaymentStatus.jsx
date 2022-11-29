import React from "react";
import successSVG from "../img/success.svg";

function PaymentStatus() {
    return (
        <div className=" bg-[rgba(0,0,0,0.9)] rounded-2xl z-[101] flex flex-col justify-center items-center fixed right-0 left-0 top-0 bottom-0 ">
            <img
                src={successSVG}
                className="h-20 w-20 mb-20"
                alt="success payment"
            />
            <h1 className=" font-bold text-3xl text-[#fff]">Order Placed</h1>
        </div>
    );
}

export default PaymentStatus;
