import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  SignUp,
  NewPassword,
  ForgotPasswordOTP,
  Organization,
  Profile,
  ChangePassword,
  Upfile,
  Nonti,
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
        <Route path="/newPassword" element={<NewPassword />}></Route>
        <Route path="/Organization" element={<Organization />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/ChangePassword" element={<ChangePassword/>}></Route>
        <Route path="/Upfile" element={<Upfile/>}></Route>
        <Route path="/Nonti" element={<Nonti/>}></Route>
        
        <Route
          path="/ForgotPasswordOTP"
          element={<ForgotPasswordOTP />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
