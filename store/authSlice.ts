import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: object | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createSession: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    endSession: (state) => {
      state.user = null;
    },
  },
});

export const { createSession, endSession } = authSlice.actions;

export default authSlice.reducer;
