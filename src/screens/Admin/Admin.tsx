import React from "react";
import "./Admin.css";
import Sidebar from "./component/SideBar";
import { useState } from "react";
import Statistic from "./Statistics";
import VolunteerManager from "./VolunteerManagement";
import OrganizationManager from "./OriginManagement";
import PostManager from "./PostManagement";
import CampaignManager from "./CampainManagement";

const Admin = () => {
  const [activePage, setActivePage] = useState("Thống kê");

  const renderContent = () => {
    switch (activePage) {
      case "Thống kê":
        return <Statistic />;
      case "Quản lý tình nguyện viên":
        return <VolunteerManager />;
      case "Quản lý tổ chức":
        return <OrganizationManager />;
      case "Quản lý bài đăng":
        return <PostManager />;
      case "Quản lý chiến dịch":
        return <CampaignManager />;
      default:
        return <div>Chưa có nội dung</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activePage} onSelect={setActivePage} />
      <div className="main-content">
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
