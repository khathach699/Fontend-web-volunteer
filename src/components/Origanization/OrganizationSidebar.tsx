import React from "react";
import { EditOutlined as Pencil } from "@ant-design/icons";

interface OrganizationSidebarProps {
  organization: {
    Id: string;
    name: string;
    avatar: string;
  };
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({
  organization,
  onImageUpload,
}) => {
  const style = {
    Btn: {
      width: "240px",
      height: "40px",
      cursor: "pointer",
      margin: "10px 0",
      borderRadius: "50px",
      border: "2px solid #609966",
      boxShadow: "0px 2px 5px rgba(152, 177, 141, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  };

  return (
    <div
      className="col-4 col-md-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "justify-content",
      }}
    >
      <div className="d-flex" style={{ position: "relative" }}>
        <div
          className="rounded-circle border-success shadow position-relative overflow-hidden"
          style={{
            width: "240px",
            height: "240px",
            margin: "0 0 20px 0",
            border: "5px solid #609966",
          }}
        >
          <img
            src={organization.avatar || "src/assets/logos/avt.png"}
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <button
          className="btn btn-update"
          style={{
            right: 150,
            bottom: 0,
            background: "transparent",
            color: "#40513B",
            position: "absolute",
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            border: "none",
          }}
        >
          <label style={{ cursor: "pointer" }}>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                onImageUpload(
                  e,
                  organization.Id || organization.name || "default-id"
                )
              }
            />
            <Pencil style={{ fontSize: "30px" }} />
          </label>
        </button>
      </div>
      <button className="btn btn-light" style={style.Btn}>
        <img
          src="src/assets/logos/fb.png"
          alt="Facebook"
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Liên hệ qua Facebook
      </button>
      <button className="btn btn-light" style={style.Btn}>
        <img
          src="src/assets/logos/google.png"
          alt="Email"
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
        Liên hệ qua Email
      </button>
      <button className="btn btn-light" style={style.Btn}>
        <img
          src="src/assets/logos/plus.png"
          alt="Plus"
          style={{ width: "20px", height: "20px", marginRight: "8px" }}
        />
      </button>
    </div>
  );
};

export default OrganizationSidebar;
