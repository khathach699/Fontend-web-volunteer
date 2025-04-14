import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

interface Campaign {
  _id: string;
  name: string;
  Text?: string;
  content?: string;
  NumberOfPeople: number;
  AmountOfMoney: number;
  Donated: number;
  IsAccepted: boolean;
  IsDeleted: boolean;
  Start: string;
  NumberOfDay: number;
  participated: number;
  organization: string;
  img: string | null;
}

interface OrganizationData {
  info: string;
  totalCampaigns: number;
  recentCampaigns: Campaign[];
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

const OrganizationPost: React.FC = () => {
  const token = useSelector((state: RootState) => state.authReducer.data.token);
  const [organizationData, setOrganizationData] =
    useState<OrganizationData | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        console.log("Starting API call with token:", token);
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

  const style = {
    viewMoreButton: {
      backgroundColor: "#609966",
      border: "none",
      borderRadius: "20px",
      padding: "5px 15px",
      fontSize: "14px",
      color: "#fff",
      cursor: "pointer",
      marginTop: "10px",
      display: "block",
    },
  };

  console.log("Current organizationData:", organizationData);

  if (!organizationData) {
    return <div>Loading...</div>;
  }

  const campaign = organizationData.recentCampaigns[0] || {};
  console.log("Selected campaign:", campaign);

  return (
    <div>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#4CAF50",
          marginBottom: "10px",
        }}
      >
        BÀI ĐĂNG
      </h2>
      <div
        style={{
          position: "relative",
          border: "2px solid #609966",
          backgroundColor: "#fff",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                marginRight: "10px",
              }}
            >
              <img
                src={campaign.img || "src/assets/logos/avt.png"}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {campaign.name || "Tổ chức Beta"}
              </h3>
              <span style={{ fontSize: "12px", color: "#999" }}>
                {new Date(campaign.Start).toLocaleDateString() ||
                  "5 phút trước"}
              </span>
            </div>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            {campaign.Text || campaign.content || organizationData.info}
          </p>
          {showAllImages ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "10px",
              }}
            >
              {campaign.img && (
                <img
                  src={campaign.img}
                  alt="campaign"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    objectFit: "cover",
                    maxHeight: "150px",
                  }}
                />
              )}
              <button
                onClick={() => setShowAllImages(false)}
                style={style.viewMoreButton}
              >
                Thu gọn
              </button>
            </div>
          ) : (
            <div>
              {campaign.img && (
                <img
                  src={campaign.img}
                  alt="campaign"
                  style={{
                    width: "30%",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationPost;
