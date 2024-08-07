import { createSlice } from "@reduxjs/toolkit";

//Valeurs initiales
const initialState = {
  username: "",
  token: "",
  characterId: "",
  money: 0,
  HP: 0,
  XP: 0,
  caracs: {}
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
    updateAllReducer: (state, action) => {
      console.log(action.payload)
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.characterId = action.payload.characterId;
      state.money = action.payload.money;
      state.HP = action.payload.HP;
      state.XP = action.payload.XP;
      state.caracs = action.payload.caracs
    }
  },
});

export const { updateUsername, updateToken, updateAllReducer } = userSlice.actions;
export default userSlice.reducer;

