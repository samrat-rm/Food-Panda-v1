import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../utils/fetchLocalStorageUserData";

let userInfo = fetchUser();
let initialState = {
    value: userInfo,
};

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInUsingPopup: (state, action) => {
            state.user = {
                ...action.payload,
            };
            window.location.reload();
        },
        signOutUser: (state, action) => {
            state.user = null;
        },
    },
});

export const { signInUsingPopup, signOutUser } = userSlice.actions;
export default userSlice.reducer;
