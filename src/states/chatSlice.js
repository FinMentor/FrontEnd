import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        isInChatRoom: false,
        currentRoomId: null,
        expertNickname: null,
    },
    reducers: {
        enterChatRoom: (state, action) => {
            state.isInChatRoom = true;
            state.currentRoomId = action.payload.chatroomId;
            state.expertNickname = action.payload.expertNickname;
        },
        exitChatRoom: state => {
            state.isInChatRoom = false;
            state.currentRoomId = null;
            state.expertNickname = null;
        },
    },
});

export const { enterChatRoom, exitChatRoom } = chatSlice.actions;
export default chatSlice.reducer;
