import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice"
import restaurantReducer from "./features/restaurantSlice"
import loginReducer from "./features/loginSlice"

export const store = configureStore(
    {
        reducer: {
            login: loginReducer,
            basket: basketReducer,
            restaurant: restaurantReducer
        },
    }
);