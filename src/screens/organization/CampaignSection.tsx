import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

interface Campaign {
  _id: string;
  title?: string;
  name: string;
  thumbnail?: string;
  img?: string;
  description?: string;
  content?: string;
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

const CampaignSection: React.FC = () => {
  const token = useSelector((state: RootState) => state.authReducer.data.token);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!token) {
        console.log("No token found");
        setError("Vui lòng đăng nhập để xem chiến dịch");
        setLoading(false);
        return;
      }

      try {
        console.log("Starting API call with token:", token);
        setLoading(true);
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

        if (result.success && result.data.recentCampaigns) {
          const mappedCampaigns: Campaign[] = result.data.recentCampaigns.map(
            (campaign: any) => ({
              _id: campaign._id,
              name: campaign.name,
              title: campaign.name,
              img: campaign.img || undefined,
              thumbnail: campaign.img || undefined,
              content: campaign.Text || campaign.content || undefined,
              description: campaign.Text || campaign.content || undefined,
            })
          );
          console.log("Mapped campaigns:", mappedCampaigns);
          setCampaigns(mappedCampaigns);
        } else {
          console.log("API returned success: false or no campaigns", result);
          setError("Không thể tải chiến dịch");
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Không thể kết nối đến server");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [token]);

  console.log("Current campaigns state:", campaigns);

  const style = {
    campaignCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              fontStyle: "italic",
              color: "#4CAF50",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            CHIẾN DỊCH PHÁT ĐỘNG
          </h2>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#40513B",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <MdMenu style={{ fontSize: "32px" }} />
            </button>
            {open && (
              <div
                className="dropdown-menu dropdown-menu-right show mt-2"
                style={{
                  position: "absolute",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  zIndex: 10,
                  minWidth: "200px",
                }}
              >
                <Link
                  to="/"
                  className="dropdown-item"
                  style={{
                    padding: "12px 20px",
                    fontSize: "14px",
                    color: "#40513B",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f7fa")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Đã hoàn thành
                </Link>
                <Link
                  to="/"
                  className="dropdown-item"
                  style={{
                    padding: "12px 20px",
                    fontSize: "14px",
                    color: "#40513B",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f7fa")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Chưa hoàn thành
                </Link>
                <Link
                  to="/"
                  className="dropdown-item"
                  style={{
                    padding: "12px 20px",
                    fontSize: "14px",
                    color: "#40513B",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f7fa")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Đang triển khai
                </Link>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p
              style={{ fontSize: "16px", color: "#40513B", marginTop: "10px" }}
            >
              Đang tải chiến dịch...
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffebee",
              borderRadius: "8px",
              color: "#c62828",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        ) : campaigns.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontSize: "16px", color: "#40513B" }}>
              Không tìm thấy chiến dịch nào cho tổ chức này.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, auto)",
              gap: "20px",
            }}
          >
            {campaigns.slice(0, 4).map((campaign) => (
              <div
                key={campaign._id}
                style={style.campaignCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={
                    campaign.thumbnail ||
                    campaign.img ||
                    "https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.webp?a=1&b=1&s=612x612&w=0&k=20&c=T8LR8_7_56E8X_Q3-PONzFG-fv5BMCk8UKFkbbo1fN4="
                  }
                  alt={campaign.title || campaign.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <div style={{ padding: "20px" }}>
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#40513B",
                      marginBottom: "10px",
                    }}
                  >
                    {campaign.title || campaign.name}
                  </h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {campaign.description?.substring(0, 100) ||
                      campaign.content?.substring(0, 100)}
                    {(campaign.description &&
                      campaign.description.length > 100) ||
                    (campaign.content && campaign.content.length > 100)
                      ? "..."
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignSection;
