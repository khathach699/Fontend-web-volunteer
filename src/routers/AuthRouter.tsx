import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  SignUp,
  ForgotPasswordOTP,
  Admin,
} from "../screens/auth/index";
import HomeScreen from "../screens/home/HomeScreen";
import { authSelector, AuthState } from "../reduxs/reducers/authReducer";
import { useSelector } from "react-redux";
import Activity from "../screens/auth/Activity";
import Statistics from "../screens/auth/Admin/Statistics";
import VolunteerManagement from "../screens/auth/Admin/VolunteerManagement";
import PostManagement from "../screens/auth/Admin/PostManagement";
import OriginManagement from "../screens/auth/Admin/OriginManagement";
const AuthRouter = () => {
  const auth: AuthState = useSelector(authSelector);

  return (
    <Routes>
      {!auth.token ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ForgotPasswordOTP" element={<ForgotPasswordOTP />} />
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/admin/statistics" element={<Statistics />} />
          <Route
            path="/admin/volunteer-management"
            element={<VolunteerManagement />}
          />
          <Route path="/admin/post-management" element={<PostManagement />} />
          <Route
            path="/admin/origin-management"
            element={<OriginManagement />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<HomeScreen />} />
        </>
      )}
    </Routes>
  );
};

export default AuthRouter;
