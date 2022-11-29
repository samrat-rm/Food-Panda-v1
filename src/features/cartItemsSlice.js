import { createSlice } from "@reduxjs/toolkit";
import { fetchCartInfo } from "../utils/fetchLocalStorageUserData";

let fetchedFromLocalStorage = fetchCartInfo();
let initialState = {
    value: fetchedFromLocalStorage,
};

let cartInfoSlice = createSlice({
    name: "cartInfo",
    initialState,
    reducers: {
        setCartInfo: (state, action) => {
            state.value = [...state.value, action.payload];
            localStorage.setItem("cartInfo", JSON.stringify(state.value));
        },
        setClearCart: (state, action) => {
            state.value = [];
            localStorage.setItem("cartInfo", JSON.stringify([]));
        },
        removeItem: (state, action) => {
            state.value = state.value.filter((item) => {
                if (item.id === action.payload) {
                    return false;
                }
                return true;
            });
            localStorage.removeItem("cartInfo");
            localStorage.setItem("cartInfo", JSON.stringify(state.value));
        },
        modifyQuantity: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCartInfo, setClearCart, removeItem, modifyQuantity } =
    cartInfoSlice.actions;
export default cartInfoSlice.reducer;
