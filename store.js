import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice"
import restaurantReducer from "./features/restaurantSlice"
import userReducer from "./features/userSlice"

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            basket: basketReducer,
            restaurant: restaurantReducer
        },
    }
);