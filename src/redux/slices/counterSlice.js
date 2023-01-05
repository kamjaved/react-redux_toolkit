import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },

  reducers: {
    incrementCount: (state, action) => {
      state.count += 1;
    },

    decrementCount: (state, action) => {
      state.count -= 1;
    },

    reset: (state, action) => {
      state.count = 0;
    },
    incrementByValue: (state, action) => {
      state.count += action.payload;
    }
  }
});

export const { incrementCount, decrementCount, reset, incrementByValue } =
  counterSlice.actions;
export default counterSlice.reducer;
