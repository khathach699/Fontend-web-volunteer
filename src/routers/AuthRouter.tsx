import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  SignUp,
  NewPassword,
  ForgotPasswordOTP,
} from "../screens/auth/index";

const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        ForgotPasswordOTP
        <Route path="/" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/newPassword" element={<NewPassword />}></Route>
        <Route
          path="/ForgotPasswordOTP"
          element={<ForgotPasswordOTP />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
