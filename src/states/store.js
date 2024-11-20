import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import chatReducer from "./chatSlice";
import navigatorReducer from "./navigatorSlice";
import matchingReducer from "./matchingSlice";
const store = configureStore({
    reducer: {
        tab: tabReducer,
        chat: chatReducer,
        navigator: navigatorReducer,
        matching: matchingReducer,
    },
});

export default store;
