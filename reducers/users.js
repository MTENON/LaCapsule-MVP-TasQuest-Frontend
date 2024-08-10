import { createSlice } from "@reduxjs/toolkit";

//Valeurs initiales
const initialState = {
  username: "",
  token: "",
  characterId: "",
  characterName: "",
  money: 0,
  HP: 0,
  XP: 0,
  caracs: [{}],
  questId: null
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
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.characterId = action.payload.characterId;
      state.money = action.payload.money;
      state.HP = action.payload.HP;
      state.XP = action.payload.XP;
      state.caracs = action.payload.caracs;
      state.questId = action.payload.questId
    },
    updateQuestId: (state, action) => {
      state.questId = action.payload;
    }
  },
});

export const { updateUsername, updateToken, updateAllReducer, updateQuestId } = userSlice.actions;
export default userSlice.reducer;

