import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const pageSlice = createSlice({
    name: "page",
    initialState: {
        currentPage: -1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const selectCurrentPage = state => state.page.currentPage;
export const { setCurrentPage } = pageSlice.actions;

export function useCurrentPageIndex() {
    const dispatch = useDispatch();
    const setPage = React.useCallback(
        value => {
            dispatch(setCurrentPage(value));
        },
        [dispatch],
    );
    return [useSelector(selectCurrentPage), setPage];
}

export default pageSlice.reducer;
