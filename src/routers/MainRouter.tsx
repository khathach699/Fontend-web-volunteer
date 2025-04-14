import { Routes, Route } from "react-router-dom";
import index from "../screens/index";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<index.HomeScreen />} />
      <Route path="/activity" element={<index.Activity />} />
      <Route path="/campaign" element={<index.Campaign />} />
      <Route path="/admin" element={<index.Admin />} />
      <Route path="/admin/statistics" element={<index.Statistics />} />
      <Route
        path="/admin/volunteermanagement"
        element={<index.VolunteerManagement />}
      />
      <Route
        path="/admin/campainmanagement"
        element={<index.CampainManagement />}
      />
      <Route path="/admin/postmanagement" element={<index.PostManagement />} />
      <Route
        path="/admin/originmanagement"
        element={<index.OriginManagement />}
      />
      <Route path="/upfile" element={<index.Upfile />} />
      <Route path="/notification" element={<index.Nonti />} />
      <Route path="/Changepassword" element={<index.ChangePassword />} />
      <Route path="/profile" element={<index.Profile />} />
      <Route path="/organization" element={<index.Organization />} />
      <Route path="*" element={<index.HomeScreen />} />
    </Routes>
  );
};

export default MainRouter;
