import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaCheck, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Spin, Alert } from "antd";
import { jwtDecode } from "jwt-decode";
import handleAPI from "../../apis/handleAPI";

// Định nghĩa kiểu dữ liệu trả về từ API
interface Organization {
  Inform: string;
  UserID: string;
  _id?: string;
}

interface Campaign {
  _id: string;
  name: string;
  organization: Organization | null;
  content: string;
  numberOfPeople: number;
  amountOfMoney: number;
  donate: number;
  isAccepted: boolean;
  isdeleted: boolean;
  dayStart: string;
  numberOfDay: number;
  participated: number;
  img: string;
  images: {
    _id: string;
    imgUrl: string;
    isdeleted: boolean;
    CampID: string;
  }[];
}

interface MemberCampaign {
  _id: string;
  UserID: string;
  CampID: string;
  StatusID: number;
  IsDelete: number;
  CreatedAt: string;
  campaign: Campaign;
}

interface ActivityProps {
  name: string;
  points: number;
  status: string;
  completed: boolean;
  orgname: string;
  imageUrl?: string;
}

// Define RootState type based on store
type RootState = {
  authReducer: {
    data: {
      token: string;
      _id: string;
      name: string;
      rule: number;
    };
  };
};

const getStatusFromStatusID = (statusID: number): string => {
  switch (statusID) {
    case 1:
      return "Hoàn thành";
    case 2:
      return "Đang thực hiện";
    case 3:
      return "Không hoàn thành";
    default:
      return "Không xác định";
  }
};

const ActivityList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const token = useSelector((state: RootState) => state.authReducer.data.token);
  const [allActivities, setAllActivities] = useState<ActivityProps[]>([]); // Lưu trữ tất cả hoạt động

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        setLoading(true);
        const decoded = jwtDecode<{ id: string }>(token);
        const userId = decoded.id;

        // Fetch member-campaign records for the user
        const api = "/member-campaign/user";
        const res = await handleAPI<{
          success: boolean;
          data: { memberCampaigns: MemberCampaign[] };
        }>(api, { userId }, "post");

        if (res.success && res.data.memberCampaigns) {
          console.log("API response:", res.data.memberCampaigns);

          // Nếu không có dữ liệu, sử dụng dữ liệu mẫu để hiển thị
          if (res.data.memberCampaigns.length === 0) {
            console.log("No data from API, using sample data");
            const sampleData = [
              {
                name: "CHIẾN DỊCH THÁNG 3",
                points: 50,
                status: "Hoàn thành",
                completed: true,
                orgname: "TỔ CHỨC A",
              },
              {
                name: "CHIẾN DỊCH THÁNG 4",
                points: 50,
                status: "Đang thực hiện",
                completed: false,
                orgname: "TỔ CHỨC B",
              },
              {
                name: "CHIẾN DỊCH THÁNG 5",
                points: 50,
                status: "Không hoàn thành",
                completed: false,
                orgname: "TỔ CHỨC C",
              },
            ];
            setAllActivities(sampleData);
            setActivities(sampleData);
          } else {
            // Transform the data to match ActivityProps interface
            const transformedActivities = res.data.memberCampaigns.map((mc) => {
              const campaign = mc.campaign;

              // Lấy status từ StatusID
              const status = getStatusFromStatusID(mc.StatusID);
              const isCompleted = status === "Hoàn thành";

              // Lấy hình ảnh từ campaign.images hoặc campaign.img
              const imageUrl =
                campaign && campaign.images && campaign.images.length > 0
                  ? campaign.images[0].imgUrl
                  : campaign?.img || undefined;

              // Tạo dữ liệu cho activity
              return {
                name: campaign?.name || "Chiến dịch không xác định",
                points: campaign?.participated || 50,
                status: status,
                completed: isCompleted,
                orgname:
                  campaign?.organization?.Inform || "Tổ chức không xác định",
                imageUrl: imageUrl,
              };
            });

            console.log("Transformed activities:", transformedActivities);
            setAllActivities(transformedActivities);
            setActivities(transformedActivities);
          }
        } else {
          console.log("API error, using sample data");
          const sampleData = [
            {
              name: "CHIẾN DỊCH THÁNG 3",
              points: 50,
              status: "Hoàn thành",
              completed: true,
              orgname: "TỔ CHỨC A",
            },
            {
              name: "CHIẾN DỊCH THÁNG 4",
              points: 50,
              status: "Đang thực hiện",
              completed: false,
              orgname: "TỔ CHỨC B",
            },
            {
              name: "CHIẾN DỊCH THÁNG 5",
              points: 50,
              status: "Không hoàn thành",
              completed: false,
              orgname: "TỔ CHỨC C",
            },
          ];
          setAllActivities(sampleData);
          setActivities(sampleData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Đã xảy ra lỗi khi tải dữ liệu hoạt động");
        // Sử dụng dữ liệu mẫu khi có lỗi
        const sampleData = [
          {
            name: "CHIẾN DỊCH THÁNG 3",
            points: 50,
            status: "Hoàn thành",
            completed: true,
            orgname: "TỔ CHỨC A",
          },
          {
            name: "CHIẾN DỊCH THÁNG 4",
            points: 50,
            status: "Đang thực hiện",
            completed: false,
            orgname: "TỔ CHỨC B",
          },
          {
            name: "CHIẾN DỊCH THÁNG 5",
            points: 50,
            status: "Không hoàn thành",
            completed: false,
            orgname: "TỔ CHỨC C",
          },
        ];
        setAllActivities(sampleData);
        setActivities(sampleData);
        setLoading(false);
      }
    };

    if (token) {
      fetchUserActivities();
    }
  }, [token]);

  // Áp dụng bộ lọc khi filter thay đổi
  useEffect(() => {
    if (allActivities.length === 0) return;

    if (filter === "all") {
      setActivities(allActivities);
    } else if (filter === "completed") {
      setActivities(
        allActivities.filter(
          (activity) =>
            activity.status.toLowerCase().includes("hoàn thành") &&
            !activity.status.toLowerCase().includes("không")
        )
      );
    } else if (filter === "in-progress") {
      setActivities(
        allActivities.filter((activity) =>
          activity.status.toLowerCase().includes("đang thực hiện")
        )
      );
    } else if (filter === "incomplete") {
      setActivities(
        allActivities.filter((activity) =>
          activity.status.toLowerCase().includes("không hoàn thành")
        )
      );
    }
  }, [filter, allActivities]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "24px", color: "#4CAF50", margin: 0 }}>
            HOẠT ĐỘNG ĐÃ THAM GIA
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
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setFilter("all");
                    setOpen(false);
                  }}
                >
                  Tất cả
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setFilter("completed");
                    setOpen(false);
                  }}
                >
                  Đã hoàn thành
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setFilter("in-progress");
                    setOpen(false);
                  }}
                >
                  Đang thực hiện
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setFilter("incomplete");
                    setOpen(false);
                  }}
                >
                  Không hoàn thành
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {activities.length === 0 ? (
        <Alert message="Không tìm thấy hoạt động nào phù hợp" type="info" />
      ) : (
        activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))
      )}
    </div>
  );
};

const ActivityItem: React.FC<{ activity: ActivityProps }> = ({ activity }) => {
  // Hàm xác định màu sắc dựa trên trạng thái
  const getStatusColor = (status: string = "") => {
    const statusLower = status.toLowerCase();

    if (statusLower.includes("hoàn thành") && !statusLower.includes("không")) {
      return {
        text: "#4CAF50", // Màu xanh cho văn bản
        bg: "rgba(76, 175, 80, 0.1)", // Màu xanh nhạt cho nền
      };
    } else if (statusLower.includes("đang thực hiện")) {
      return {
        text: "#FFC107", // Màu vàng cho văn bản
        bg: "rgba(255, 193, 7, 0.1)", // Màu vàng nhạt cho nền
      };
    } else if (statusLower.includes("không hoàn thành")) {
      return {
        text: "#FF0000", // Màu đỏ cho văn bản
        bg: "rgba(255, 0, 0, 0.1)", // Màu đỏ nhạt cho nền
      };
    } else {
      return {
        text: "#757575", // Màu xám cho văn bản
        bg: "rgba(117, 117, 117, 0.1)", // Màu xám nhạt cho nền
      };
    }
  };

  // Lấy màu sắc dựa trên trạng thái
  const statusColor = getStatusColor(activity.status);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
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
            backgroundColor: "transparent",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px",
            fontSize: "14px",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {activity.imageUrl ? (
            <img
              src={activity.imageUrl}
              alt="Campaign"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src="src/assets/logos/avt.png"
              alt="Avatar"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#40513B",
            marginRight: "10px",
            alignContent: "center",
          }}
        >
          {activity.orgname || "Tổ chức không xác định"}
        </span>
        {/* Tên chiến dịch */}
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#9DC08B",
            padding: "5px 5px",
            alignContent: "center",
            borderRadius: "5px",
          }}
        >
          {activity.name
            ? activity.name.toUpperCase()
            : "CHIẾN DỊCH KHÔNG XÁC ĐỊNH"}
        </span>
      </div>

      {/* Điểm số và trạng thái */}
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            color: "#333",
            marginRight: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {activity.points || 0}
          <FaStar style={{ color: "#FFD700", marginLeft: "5px" }} />
        </span>
        <span
          style={{
            display: "flex",
            alignContent: "center",
            fontSize: "14px",
            color: statusColor.text,
            backgroundColor: statusColor.bg,
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {(activity.status || "").toLowerCase().includes("hoàn thành") && (
            <FaCheck style={{ marginRight: "5px" }} />
          )}
          {activity.status || "Đang xử lý"}
        </span>
      </div>
    </div>
  );
};

export default ActivityList;
