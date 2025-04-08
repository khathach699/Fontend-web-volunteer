import { useState } from "react";
import Statistics from "./Statistics";
import VolunteerManagement from "./VolunteerManagement";
import PostManagement from "./PostManagement";
import OriginManagement from "./OriginManagement";
import SideBar from "../auth/components/SidebBar";

const Admin = () => {
  const [selectedPage, setSelectedPage] = useState("Statistics");

  const renderContent = () => {
    switch (selectedPage) {
      case "Statistics":
        return <Statistics />;
      case "VolunteerManagement":
        return <VolunteerManagement />;
      case "PostManagement":
        return <PostManagement />;
      case "OriginManagement":
        return <OriginManagement />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EDF1D6] flex">
      <SideBar onSelect={setSelectedPage} />
      <div className="flex-1 ml-20">
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
