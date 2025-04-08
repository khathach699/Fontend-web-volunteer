import React from "react";
import { Routes, Route } from "react-router-dom";
import index from "../screens/index";
import { authSelector, AuthState } from "../reduxs/reducers/authReducer";
import { useSelector } from "react-redux";
const AuthRouter = () => {
  const auth: AuthState = useSelector(authSelector);

  return (
    <Routes>
      {!auth.token ? (
        <>
          <Route path="/" element={<index.Login />} />
          <Route path="/signUp" element={<index.SignUp />} />
          <Route path="/ForgotPassword" element={<index.ForgotPassword />} />
          <Route
            path="/ForgotPasswordOTP"
            element={<index.ForgotPasswordOTP />}
          />
          <Route path="*" element={<index.Login />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<index.HomeScreen />} />
          <Route path="/activity" element={<index.Activity />} />
          <Route path="/admin/statistics" element={<index.Statistics />} />
          <Route
            path="/admin/volunteer-management"
            element={<index.VolunteerManagement />}
          />
          <Route
            path="/admin/post-management"
            element={<index.PostManagement />}
          />
          <Route
            path="/admin/origin-management"
            element={<index.OriginManagement />}
          />
          <Route path="/admin" element={<index.Admin />} />
          <Route path="*" element={<index.HomeScreen />} />
        </>
      )}
    </Routes>
  );
};

export default AuthRouter;
