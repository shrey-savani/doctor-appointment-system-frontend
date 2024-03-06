import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./feature/alertSlice";
import userSlice from "./feature/userSlice";

export const store = configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer
    }
})

export default store;