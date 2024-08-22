import { createSlice } from "@reduxjs/toolkit";

const initialState = { habitData: [] };

export const userSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    updateHabitData: (state, action) => {
      state.habitData = action.payload;
    },
  },
});

export const { updateHabitData } = userSlice.actions;
export default userSlice.reducer;
