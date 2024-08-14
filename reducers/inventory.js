import { createSlice } from "@reduxjs/toolkit";

//import fake data for reducer
const inventoryData = require('../assets/inventory.json')
const equipmentData = require('../assets/equipement.json')

//Valeurs initiales
const initialState = {
  equipment: equipmentData,
  inventory: inventoryData
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateInventory: (state, action) => {
      state.inventory = action.payload;
    },
    updateEquipment: (state, action) => {
      state.equipment[action.payload.target] = action.payload.change;
    },
    addItem: (state, action) => {
      state.inventory.push(action.payload);
    }
  },
});

export const { updateInventory, updateEquipment, addItem } = inventorySlice.actions;
export default inventorySlice.reducer;

