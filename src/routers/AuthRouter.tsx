import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  SignUp,
  NewPassword,
  ForgotPasswordOTP,
} from "../screens/auth/index";
import HomeScreen from "../screens/home/HomeScreen";

const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        ForgotPasswordOTP
        <Route path="/" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/newPassword" element={<NewPassword />}></Route>
        <Route path="/home" element={<HomeScreen />}></Route>
        <Route
          path="/ForgotPasswordOTP"
          element={<ForgotPasswordOTP />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
