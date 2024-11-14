import { createSlice } from "@reduxjs/toolkit";
import { TABS } from "@/constant/tabs";

const tabSlice = createSlice({
    name: "tab",
    initialState: {
        currentTab: TABS[0].name,
    },
    reducers: {
        setCurrentTab: (state, action) => {
            const tab = TABS.find(t => t.path === action.payload);
            if (tab) {
                state.currentTab = tab.name;
            }
        },
    },
});

export const { setCurrentTab } = tabSlice.actions;
export default tabSlice.reducer;
