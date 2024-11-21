import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import chatReducer from "./chatSlice";
import navigatorReducer from "./navigatorSlice";
import matchingReducer from "./matchingSlice";
import pageReducer from "./pageSlice";
const store = configureStore({
    reducer: {
        tab: tabReducer,
        page: pageReducer,
        chat: chatReducer,
        navigator: navigatorReducer,
        matching: matchingReducer,
    },
});

export default store;
