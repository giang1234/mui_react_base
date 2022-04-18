import { createSlice } from "@reduxjs/toolkit";

const auth = localStorage.getItem("accessToken");

const initialState = {
    isLoggedIn: auth ? true : false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginFulfilled: (state, action) => ({
            ...state,
            isLoggedIn : true
        }),
        loginRejected: (state, action) => ({
            ...state,
            isLoggedIn : false,
            user : null,
        }),
        logoutFulfilled: (state, action) => ({
            ...state,
            isLoggedIn : false,
            // user : null,
        }),
        clearState: (state) => ({
            ...state,
            isLoggedIn: false
        })
    }
});

export default authSlice;
