import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setDeleteUser: (state) => {
      return { authUser: null, otherUsers: null, selectedUser: null };
    },
  },
});

export const { setAuthUser, setOtherUser, setSelectedUser, setDeleteUser } =
  userSlice.actions;
export default userSlice.reducer;
