import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        isInChatRoom: false,
        currentRoomId: null,
    },
    reducers: {
        enterChatRoom: (state, action) => {
            state.isInChatRoom = true;
            state.currentRoomId = action.payload;
        },
        exitChatRoom: state => {
            state.isInChatRoom = false;
            state.currentRoomId = null;
        },
    },
});

export const { enterChatRoom, exitChatRoom } = chatSlice.actions;
export default chatSlice.reducer;
