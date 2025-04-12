import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { FaCheck, FaStar } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

interface Organization {
  name?: string;
  totalCampaigns?: number;
  totalVolunteers?: number;
  avatar?: string;
}

interface OrganizationInfoProps {
  organization: Organization;
  handleEditOrganizationName: () => void;
  handleFollowToggle: () => void;
  isFollowing: boolean;
  style: {
    followButton: React.CSSProperties;
    followButtonActive?: React.CSSProperties;
  };
}
interface CampaignSectionProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const OrganizationInfo: React.FC<OrganizationInfoProps & CampaignSectionProps> = ({ organization, handleEditOrganizationName, handleFollowToggle, isFollowing, style, open, setOpen }) => {
  return (
    <div className="col-md-12" style={{ display: "flex", flexDirection: "column", }}>
      <h2>
        <span style={{ fontSize: "24px", fontWeight: "initial", color: "#4CAF50" }}>
          THÔNG TIN TỔ CHỨC
        </span>
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "52px", gap: "20px", fontWeight: "bold", color: "#4CAF50", justifyContent: "center", display: "flex", alignItems: "center" }}>
          {organization.name || "TỔ CHỨC BETA"}
          <button
            onClick={handleEditOrganizationName}
            style={{
              cursor: "pointer",
              padding: "5px",
              background: "transparent",
              color: "#40513B",
              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              border: "none",
            }}
          >
            <EditOutlined style={{ fontSize: "30px" }} />
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
              boxShadow: "2px 2px 10px rgba(64, 81, 59, 0.3)"
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
              boxShadow: "2px 2px 10px rgba(64, 81, 59, 0.3)"
            }}
          >
            CÓ {organization.totalVolunteers || "3000"}TÌNH NGUYỆN VIÊN THEO DÕI
          </div>
          <button
            onClick={handleFollowToggle}
            style={{
              ...style.followButton,
              ...(isFollowing ? style.followButtonActive : {}),
              boxShadow: "2px 2px 10px rgba(64, 81, 59, 0.3)"
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
      <div >
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
                  className="dropdown-menu dropdown-menu-right show mt-2 "
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
                  <Link to="/" className="dropdown-item" >Đã hoàn thành</Link>
                  <Link to="/" className="dropdown-item" >Chưa hoàn thành</Link>
                  <Link to="/" className="dropdown-item" >Đang triển khai</Link>
                </div>
              )}

            </div>
          </div>
        </div>
        {[
          { name: "CHIẾN DỊCH THÁNG 3", points: 50, status: "Hoàn thành", completed: true, orgname: "TỔ CHỨC A" },
          { name: "CHIẾN DỊCH THÁNG 3", points: 50, status: "Hoàn thành", completed: true, orgname: "TỔ CHỨC A" },
          { name: "CHIẾN DỊCH THÁNG 4", points: 50, status: "Không hoàn thành", completed: false, orgname: "TỔ CHỨC B" },
        ].map((task, index) => (
          < div
            key={index}
            style={{
              display: "flex", // Hiển thị tất cả item, bỏ điều kiện display: index < 3
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff", // Nền xanh nhạt giống thiết kế
              borderRadius: "20px",
              padding: "10px",
              marginBottom: "20px",
              border: "2px solid #40513B",
            }}
          >
            {/* Avatar và tên tổ chức */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "transparent", // Màu nền avatar
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                <img
                  src={organization.avatar || "src/assets/logos/avt.png"}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}></img>
              </div>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#40513B", // Màu chữ giống thiết kế
                  marginRight: "10px",
                  alignContent: "center",
                }}
              >
                {task.orgname || "TỔ CHỨC A"}
              </span>
              {/* Tên chiến dịch */}
              <span
                style={{
                  fontSize: "16px", // Tăng kích thước chữ
                  fontWeight: "bold", // Chữ đậm
                  color: "#fff",
                  backgroundColor: "#9DC08B", // Nền xanh giống thiết kế
                  padding: "5px 5px",
                  alignContent: "center",
                  borderRadius: "5px",
                }}
              >
                {task.name.toUpperCase()} {/* Chuyển tên chiến dịch thành chữ in hoa */}
              </span>
            </div>

            {/* Điểm số và trạng thái */}
            <div style={{ display: "flex", alignContent: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#333",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {task.points} <FaStar style={{ color: "#FFD700", marginLeft: "5px" }} />{" "}
                {/* Thêm biểu tượng ngôi sao vàng */}
              </span>
              <span
                style={{
                  display: "flex",
                  alignContent: "center",
                  fontSize: "14px",
                  color:
                    task.status === "Hoàn thành"
                      ? "#4CAF50" // Xanh cho hoàn thành
                      : task.status === "Không hoàn thành"
                        ? "#FF0000" // Đỏ cho không hoàn thành
                        : "#FFC107", // Vàng cho đang thực hiện
                  backgroundColor:
                    task.status === "Hoàn thành"
                      ? "rgba(76, 175, 80, 0.1)" // Nền nhạt cho hoàn thành
                      : task.status === "Không hoàn thành"
                        ? "rgba(255, 0, 0, 0.1)" // Nền nhạt cho không hoàn thành
                        : "rgba(255, 193, 7, 0.1)", // Nền nhạt cho đang thực hiện
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                {task.status === "Hoàn thành" && (
                  <FaCheck style={{ marginRight: "5px" }} />
                )}
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrganizationInfo;