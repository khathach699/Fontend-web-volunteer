import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/home/HomeScreen";
import Admin from "../screens/Admin/Admin";
import Activity from "../screens/activity/Activity";
import Statistics from "../screens/Admin/Statistics";
import VolunteerManagement from "../screens/Admin/VolunteerManagement";
import PostManagement from "../screens/Admin/PostManagement";
import OriginManagement from "../screens/Admin/OriginManagement";
import CampainManagement from "../screens/Admin/CampainManagement";
import Profile from "../screens/profile/Profile";
import Organization from "../screens/organization/Organization";
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
