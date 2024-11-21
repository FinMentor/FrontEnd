import { createSlice } from "@reduxjs/toolkit";

const navigatorSlice = createSlice({
    name: "navigator",
    initialState: {
        showNavigator: true,
    },
    reducers: {
        setShowNavigator: (state, action) => {
            state.showNavigator = action.payload;
        },
    },
});

export const { setShowNavigator } = navigatorSlice.actions;
export default navigatorSlice.reducer;
