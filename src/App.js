import React from "react";
import { Header, MainContainer, CreateContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFoodItems } from "./features/foodItemsSlice";

const App = () => {
    let dispatch = useDispatch();
    const fetchData = async () => {
        await getAllFoodItems()
            .then((data) => dispatch(setFoodItems(data)))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        dispatch(setFoodItems(fetchData()));
    }, []);
    return (
        <AnimatePresence exitBeforeEnter>
            {/* exitBeforeEnter -> Avoids multiple animation pollution by only applying one animation at a time */}
            <div className="w-[100%] h-auto flex flex-col bg-white  ">
                <Header />
                <main className="mt-16 md:mt-24 md:px-16 md:py-4 p-8 w-full ">
                    <Routes>
                        <Route path="/*" element={<MainContainer />} />
                        <Route
                            path="/createItem"
                            element={<CreateContainer />}
                        />
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    );
};

export default App;
