import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import "./HomeContainer.css";
const HomeContainer = () => {
    const heroItems = heroData.map((item) => (
        <div
            key={item.id}
            className=" min-w-[150px] lg:w-190 md:min-w-[190px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col justify-between items-end md:items-center md:h-auto h-56 lg:justify-center lg:mx-2 mx-auto lg:my-0 shadow-xl addingMargin "
        >
            <img
                src={item.img}
                alt="item "
                className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
            />
            <p className="text-base md:text-lg font-semibold text-textColor mt-2">
                {item.name}
            </p>
            <p className="text md:text-sm font-semibold text-lighttextGray my-2 ">
                {item.desc}
            </p>
            <p className="text-md font-semibold text-headingColor">
                <span className="text-sm font-semibold text-red-500">$</span>
                {item.price}
            </p>
        </div>
    ));
    return (
        <section
            className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-auto "
            id="home"
        >
            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
                <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">
                        Bike Delivery
                    </p>
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
                        <img
                            src={Delivery}
                            className="w-full h-full object-contain"
                            alt="delivery"
                        />
                    </div>
                </div>

                <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in
                    <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
                        Your City
                    </span>
                </p>

                <p className="text-base text-black text-center md:text-left md:w-[80%]">
                    Food Panda can be quick and convenient ways to get food
                    delivered straight to your door. There are a variety of
                    options, with many apps offering delivery and pickup from
                    restaurants, convenience stores, supermarkets, and even
                    liquor stores.
                </p>

                <button
                    type="button"
                    className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 font-semibold text-white "
                >
                    Order Now
                </button>
            </div>
            <div className="py-2 flex-1 flex overflow-hidden relative">
                <img
                    src={HeroBg}
                    className="h-420 lg:h-685 w-full lg:w-auto md:ml-auto "
                    alt="hero-bg"
                />
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap md:overflow-visible overflow-scroll scroll-none ">
                    {heroItems}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
