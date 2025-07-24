import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.items.push({
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        items: action.payload,
      });
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
