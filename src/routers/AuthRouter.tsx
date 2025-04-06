import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  SignUp,
  ForgotPasswordOTP,
} from "../screens/auth/index";
import HomeScreen from "../screens/home/HomeScreen";
import { authSelector, AuthState } from "../reduxs/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const AuthRouter = () => {
  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        {!auth.token ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ForgotPasswordOTP" element={<ForgotPasswordOTP />} />
            <Route path="*" element={<Login />} />{" "}
            {/* Redirect về Login nếu không khớp */}
          </>
        ) : (
          <>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="*" element={<HomeScreen />} />{" "}
            {/* Redirect về Home nếu không khớp */}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
