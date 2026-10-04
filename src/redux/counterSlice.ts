import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  value: number;
}

const initialState: initialStateType = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: { payload: number }) => {
      state.value += action.payload;
    },
    decrement: (state, action: { payload: number }) => {
      if (state.value > 0) {
        state.value -= action.payload;
      }
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const selectValue = (state: RooteState) => state.counter.value;

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
