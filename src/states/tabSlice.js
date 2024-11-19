import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const tabSlice = createSlice({
    name: "tab",
    initialState: {
        currentTabIndex: 0,
    },
    reducers: {
        setCurrentTabIndex: (state, action) => {
            state.currentTabIndex = action.payload;
        },
    },
});

export const selectCurrentTabIndex = state => state.tab.currentTabIndex;
export const { setCurrentTabIndex } = tabSlice.actions;

export function useCurrentTabIndex() {
    const dispatch = useDispatch();
    const setTabIndex = React.useCallback(
        value => {
            dispatch(setCurrentTabIndex(value));
        },
        [dispatch],
    );
    return [useSelector(selectCurrentTabIndex), setTabIndex];
}

export default tabSlice.reducer;
