import React, { useEffect, useState } from "react";
import { CheckOutlined, EditOutlined as Pencil } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

interface OrganizationData {
  info: string;
  totalCampaigns: number;
  recentCampaigns: Array<{
    _id: string;
    name: string;
    participated: number;
    [key: string]: any; // Thêm các thuộc tính khác nếu cần
  }>;
}

interface RootState {
  authReducer: {
    data: {
      token: string;
      _id: string;
      name: string;
      rule: number;
    };
  };
}

const OrganizationHeader: React.FC = () => {
  const token = useSelector((state: RootState) => state.authReducer.data.token);
  const [organizationData, setOrganizationData] =
    useState<OrganizationData | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        console.log(
          "Starting API call for OrganizationHeader with token:",
          token
        );
        const decoded = jwtDecode<{ id: string }>(token);
        const userId = decoded.id;
        console.log("Decoded userId:", userId);

        const response = await fetch(
          `http://localhost:3001/organizations/organizationUserid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response status:", response.status);
        const result = await response.json();
        console.log("API response data:", result);

        if (result.success) {
          console.log("Setting organization data:", result.data);
          setOrganizationData(result.data);
        } else {
          console.log("API returned success: false", result);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    if (token) {
      console.log("Token exists, fetching data...");
      fetchOrganizationData();
    } else {
      console.log("No token found");
    }
  }, [token]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    console.log("Follow toggled, new state:", !isFollowing);
  };

  const handleEditName = () => {
    console.log("Edit name clicked");
    // TODO: Thêm logic để chỉnh sửa tên tổ chức
  };

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

  console.log("Current organizationData:", organizationData);

  if (!organizationData) {
    return <div>Loading...</div>;
  }

  // Tính totalVolunteers từ participated của các campaigns
  const totalVolunteers = organizationData.recentCampaigns.reduce(
    (sum, campaign) => sum + (campaign.participated || 0),
    0
  );
  console.log("Calculated totalVolunteers:", totalVolunteers);

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
          {organizationData.recentCampaigns[0]?.name || "TỔ CHỨC BETA"}
          <button
            onClick={handleEditName}
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
            ĐÃ PHÁT ĐỘNG {organizationData.totalCampaigns || 0} CHIẾN DỊCH
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
            CÓ {totalVolunteers || 0} TÌNH NGUYỆN VIÊN THEO DÕI
          </div>
          <button
            onClick={handleFollowToggle}
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
