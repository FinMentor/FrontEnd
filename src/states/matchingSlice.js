import { createSlice } from "@reduxjs/toolkit";

const matchingSlice = createSlice({
    name: "matching",
    initialState: {
        isInMatching: false,
    },
    reducers: {
        enterMatching: state => {
            state.isInMatching = true;
        },
        exitMatching: state => {
            state.isInMatching = false;
        },
    },
});

export const { enterMatching, exitMatching } = matchingSlice.actions;
export default matchingSlice.reducer;
