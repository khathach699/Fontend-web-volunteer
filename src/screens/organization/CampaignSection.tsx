import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import axios from "axios";

interface Campaign {
  _id: string;
  title?: string;
  name: string;
  thumbnail?: string;
  img?: string;
  description?: string;
  content?: string;
}

interface CampaignSectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  organizationId: string;
}

const CampaignSection: React.FC<CampaignSectionProps> = ({
  open,
  setOpen,
  organizationId,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!organizationId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/campaigns`,
          {
            params: { organizationId },
          }
        );

        if (response.data && response.data.success) {
          setCampaigns(response.data.data || []);
        } else {
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
  }, [organizationId]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", color: "#4CAF50", margin: 0 }}>
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
            }}
          >
            <MdMenu style={{ fontSize: "30px" }} />
          </button>
          {open && (
            <div
              className="dropdown-menu dropdown-menu-right show mt-2"
              style={{
                position: "absolute",
                right: "0",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                minWidth: "180px",
              }}
            >
              <Link to="/" className="dropdown-item">
                Đã hoàn thành
              </Link>
              <Link to="/" className="dropdown-item">
                Chưa hoàn thành
              </Link>
              <Link to="/" className="dropdown-item">
                Đang triển khai
              </Link>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Đang tải chiến dịch...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger mt-3">{error}</div>
      ) : campaigns.length === 0 ? (
        <div className="text-center mt-4">
          <p>Không tìm thấy chiến dịch nào cho tổ chức này.</p>
        </div>
      ) : (
        <div className="row mt-3">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img
                  src={
                    campaign.thumbnail ||
                    campaign.img ||
                    "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt={campaign.title || campaign.name}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {campaign.title || campaign.name}
                  </h5>
                  <p className="card-text">
                    {campaign.description?.substring(0, 100) ||
                      campaign.content?.substring(0, 100)}
                    {(campaign.description &&
                      campaign.description.length > 100) ||
                    (campaign.content && campaign.content.length > 100)
                      ? "..."
                      : ""}
                  </p>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="btn btn-success w-100"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignSection;
