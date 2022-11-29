import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import foodItemsReducer from "../features/foodItemsSlice";
import cartShowReducer from "../features/cartShowSlice";
import cartInfoReducer from "../features/cartItemsSlice";

let store = configureStore({
    reducer: {
        user: userReducer,
        foodItems: foodItemsReducer,
        cartShow: cartShowReducer,
        cartInfo: cartInfoReducer,
    },
});

export default store;
