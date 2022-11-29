import { createSlice } from "@reduxjs/toolkit";

let foodItemsState = {
    value: null,
};

let foodItemsSlice = createSlice({
    name: "foodItems",
    initialState: foodItemsState,
    reducers: {
        setFoodItems: (state, action) => {
            state.foodItems = { ...action.payload };
        },
    },
});

export const { setFoodItems } = foodItemsSlice.actions;
export default foodItemsSlice.reducer;
