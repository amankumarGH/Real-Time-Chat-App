import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  
  initialState: {
    messages: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setDeleteMessage: (state) => {
      return { messages: null };
    },
  },
});

export const { setMessages, setDeleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
