import React from "react";
import "../Admin.css";

interface SidebarItemProps {
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, active }) => {
    return <div className={`sidebar-item ${active ? "active" : ""}`}>{label}</div>;
  };

export default SidebarItem;
