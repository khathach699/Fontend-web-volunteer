import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/home/HomeScreen";
import Admin from "../screens/auth/Admin";
import Activity from "../screens/auth/Activity";
import Statistics from "../screens/auth/Admin/Statistics";
import VolunteerManagement from "../screens/auth/Admin/VolunteerManagement";
import PostManagement from "../screens/auth/Admin/PostManagement";
import OriginManagement from "../screens/auth/Admin/OriginManagement";
import CampainManagement from "../screens/auth/Admin/CampainManagement";
import Profile from "../screens/auth/Profile";
import Organization from "../screens/auth/Organization";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/statistics" element={<Statistics />} />
      <Route
        path="/admin/volunteermanagement"
        element={<VolunteerManagement />}
      />
      <Route path="/admin/campainmanagement" element={<CampainManagement />} />
      <Route path="/admin/postmanagement" element={<PostManagement />} />
      <Route path="/admin/originmanagement" element={<OriginManagement />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="*" element={<HomeScreen />} />
    </Routes>
  );
};

export default MainRouter;
