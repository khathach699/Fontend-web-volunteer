import React from "react";
import { CheckOutlined, EditOutlined as Pencil } from "@ant-design/icons";

interface OrganizationHeaderProps {
  organization: {
    name: string;
    totalCampaigns: number;
    totalVolunteers: number;
  };
  isFollowing: boolean;
  onFollowToggle: () => void;
  onEditName: () => void;
}

const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({
  organization,
  isFollowing,
  onFollowToggle,
  onEditName,
}) => {
  const style = {
    followButton: {
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "12px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      transition: "transform 0.2s ease-in-out",
      cursor: "pointer",
    },
    followButtonActive: {
      backgroundColor: "#388E3C",
      transform: "scale(1.05)",
    },
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>
        <span
          style={{
            fontSize: "24px",
            fontWeight: "initial",
            color: "#4CAF50",
          }}
        >
          THÔNG TIN TỔ CHỨC
        </span>
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "52px",
            gap: "20px",
            fontWeight: "bold",
            color: "#4CAF50",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {organization.name || "TỔ CHỨC BETA"}
          <button
            onClick={onEditName}
            style={{
              cursor: "pointer",
              padding: "5px",
              background: "transparent",
              color: "#40513B",
              transition:
                "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              border: "none",
            }}
          >
            <Pencil style={{ fontSize: "30px" }} />
          </button>
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "5px 10px",
              fontSize: "12px",
              color: "#4CAF50",
              boxShadow: "2px 2px 10px rgba(64, 81, 59, 0.3)",
            }}
          >
            ĐÃ PHÁT ĐỘNG {organization.totalCampaigns || "20"} CHIẾN DỊCH
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "5px 10px",
              fontSize: "12px",
              color: "#4CAF50",
              boxShadow: "2px 2px 10px rgba(64, 81, 59, 0.3)",
            }}
          >
            CÓ {organization.totalVolunteers || "3000"} TÌNH NGUYỆN VIÊN THEO
            DÕI
          </div>
          <button
            onClick={onFollowToggle}
            style={{
              ...style.followButton,
              ...(isFollowing ? style.followButtonActive : {}),
              boxShadow: "2px 2px 10px rgba(64, 81, 59, 0.3)",
            }}
          >
            {isFollowing ? (
              <>
                ĐÃ THEO DÕI <CheckOutlined style={{ marginLeft: "5px" }} />
              </>
            ) : (
              "THEO DÕI"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHeader;
