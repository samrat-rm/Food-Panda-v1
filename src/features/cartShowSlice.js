import { createSlice } from "@reduxjs/toolkit";
let cartShowState = {
    value: false,
};

let cartShowSlice = createSlice({
    name: "cartShow",
    initialState: cartShowState,
    reducers: {
        setCartShow: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCartShow } = cartShowSlice.actions;
export default cartShowSlice.reducer;
