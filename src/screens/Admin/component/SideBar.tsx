import React from "react";
import "../Admin.css";


const SidebarItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <div
    className={`sidebar-item ${active ? "active" : ""}`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    {label}
  </div>
);

export default function Sidebar({
  activeItem,
  onSelect,
}: {
  activeItem: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="../src/assets/img/logo.png" alt="logo" style={{ width: 150 }} />
      </div>
      {["Thống kê", "Quản lý tình nguyện viên", "Quản lý tổ chức", "Quản lý bài đăng", "Quản lý chiến dịch"].map(
        (label) => (
          <SidebarItem
            key={label}
            label={label}
            active={activeItem === label}
            onClick={() => onSelect(label)}
          />
        )
      )}
    </div>
  );
}
