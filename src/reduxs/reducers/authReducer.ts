import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa interface cho trạng thái auth
export interface AuthState {
  token: string;
  _id: string;
  name: string;
  rule: number;
}

// Trạng thái ban đầu
const initialState: AuthState = {
  token: "",
  _id: "",
  name: "",
  rule: 0,
};

// Tạo slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: initialState,
  },
  reducers: {
    addAuth: (state, action: { payload: AuthState }) => {
      state.data = action.payload;
    },
  },
});

// Định nghĩa kiểu cho toàn bộ state của store
interface RootState {
  authReducer: {
    data: AuthState;
  };
}

export const authReducer = authSlice.reducer;
export const { addAuth } = authSlice.actions;

// Selector với kiểu RootState thay cho any
export const authSelector = (state: RootState) => state.authReducer.data;
