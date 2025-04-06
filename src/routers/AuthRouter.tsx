import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  SignUp,
  NewPassword,
  ForgotPasswordOTP,
  Admin,
} from "../screens/auth/index";
import Activity from "../screens/auth/Activity";

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
        <Route path="/Activity" element={<Activity />}></Route>
        <Route path="/Admin/*" element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
