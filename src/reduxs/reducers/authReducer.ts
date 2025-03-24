import { createSlice } from "@reduxjs/toolkit";
import { localDataNames } from "../../constants/appInfos";

export interface AuthState {
  token: string;
  _id: string;
  name: string;
  rule: number;
}

// Lấy dữ liệu từ localStorage nếu có, nếu không thì dùng mặc định
const getInitialState = (): AuthState => {
  const storedAuth = localStorage.getItem(localDataNames.authData);
  return storedAuth
    ? JSON.parse(storedAuth)
    : {
        token: "",
        _id: "",
        name: "",
        rule: 0,
      };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: getInitialState(), // Dùng hàm để lấy initial state
  },
  reducers: {
    addAuth: (state, action: { payload: AuthState }) => {
      state.data = action.payload;
      syncLocal(action.payload);
    },
    removeAuth: (state) => {
      state.data = {
        token: "",
        _id: "",
        name: "",
        rule: 0,
      };
      syncLocal(state.data);
    },
  },
});

interface RootState {
  authReducer: { data: AuthState };
}

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer.data;

function syncLocal(payload: AuthState) {
  localStorage.setItem(localDataNames.authData, JSON.stringify(payload));
}
