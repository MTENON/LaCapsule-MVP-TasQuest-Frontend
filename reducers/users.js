import { createSlice } from "@reduxjs/toolkit";

//Valeurs initiales
const initialState = {
  username: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { updateUsername, updateToken } = userSlice.actions;
export default userSlice.reducer;

