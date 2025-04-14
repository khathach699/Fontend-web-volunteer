import React, { useState, useEffect } from "react";
import {
  MoreHoriz,
  IosShare,
  Handshake,
  VolunteerActivism,
} from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { AlertProps } from "@mui/material/Alert";
import Quyengop from "./quyengop";
import { Link } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho Campaign (dựa trên dữ liệu từ API)
interface Image {
  imgUrl: string;
}

interface Organization {
  _id: string;
  info: string;
  certificate: string;
  bankName: string;
  bankNumber: string;
  isdeleted: boolean;
  user: string;
  isVerified: boolean;
}

interface State {
  _id: string;
  name: string;
  isdeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Campaign {
  _id: string;
  name: string;
  organization: Organization;
  state: State | null;
  numberOfPeople: number;
  amountOfMoney: number;
  donate: number;
  isAccepted: boolean;
  isdeleted: boolean;
  Start: string;
  NumberOfDay: number;
  participated: number;
  img: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  content?: string;
  Text?: string;
  AmountOfMoney?: number;
  Donated?: number;
  images?: Image[]; // Thêm trường images để lưu mảng ảnh
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

const Camp = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]); // Lưu danh sách chiến dịch từ API
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const [showForm, setShowForm] = useState<string | null>(null); // ID của chiến dịch đang mở form quyên góp
  const [open, setOpen] = useState(false); // Snackbar cho sao chép link
  const [severity, setSeverity] = useState<AlertColor>("success"); // Trạng thái của Snackbar

  // Gọi API khi component được render
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3001/campaigns/getall?isAccepted=true"
        );
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setCampaigns(result.data.campaigns);
          } else {
            setError("Không thể tải danh sách chiến dịch.");
          }
        } else {
          setError("Lỗi khi gọi API: " + response.statusText);
        }
      } catch (err) {
        setError("Lỗi kết nối: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Xử lý sao chép link
  const handleCopyLink = (campaignId: string) => {
    const link = `${window.location.origin}/campaign/${campaignId}`; // Tạo link động cho chiến dịch
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setSeverity("success");
        setOpen(true);
      })
      .catch(() => {
        setSeverity("error");
        setOpen(true);
      });
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading)
    return (
      <div className="text-center text-lg text-gray-600">
        Đang tải dữ liệu...
      </div>
    );
  if (error)
    return <div className="text-center text-lg text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center">
      {campaigns.map((campaign) => {
        // Xử lý các trường dữ liệu không đồng nhất
        const description =
          campaign.content || campaign.Text || "Không có mô tả.";
        const totalAmount =
          campaign.AmountOfMoney || campaign.amountOfMoney || 0;
        const donatedAmount = campaign.Donated || campaign.donate || 0;

        // Lấy danh sách ảnh từ mảng images, tối đa 3 ảnh
        const displayImages = campaign.images
          ? campaign.images.slice(0, 3).map((image) => image.imgUrl)
          : campaign.img
            ? [campaign.img]
            : [];

        return (
          <div
            key={campaign._id}
            className="bg-white w-11/12 max-w-4xl rounded-2xl border border-gray-200 shadow-lg m-4 p-6 transition-all duration-300 hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://www.w3schools.com/w3images/avatar6.png"
                    alt="Avatar"
                    className="rounded-full w-12 h-12 border-2 border-green-200"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {campaign.organization.info || "Tổ Chức Alpha"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-green-600">
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">đã phát động</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {campaign.name}
                  </div>
                </div>
                <div className="relative">
                  <button className="text-gray-600 hover:text-green-600 transition-all duration-200">
                    <MoreHoriz sx={{ fontSize: 32 }} />
                  </button>
                  {/* Dropdown menu có thể thêm sau nếu cần */}
                </div>
              </div>

              {/* Hiển thị trạng thái và thông tin chiến dịch */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:bg-green-100 transition-all duration-200">
                  {campaign.state?.name || "Không xác định"}
                </div>
                <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:bg-green-100 transition-all duration-200">
                  {campaign.NumberOfDay} ngày
                </div>
                <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:bg-green-100 transition-all duration-200">
                  {campaign.participated} người tham gia
                </div>
              </div>

              {/* Mô tả chiến dịch */}
              <p className="text-base text-gray-700 mt-4 leading-relaxed">
                {description}
              </p>

              {/* Hiển thị ảnh chiến dịch */}
              <div className="flex space-x-4 mt-4">
                {displayImages.length > 0 ? (
                  displayImages.map((imgUrl, index) => (
                    <img
                      key={index}
                      className="rounded-xl object-cover border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105"
                      src={imgUrl}
                      alt={`Campaign Image ${index + 1}`}
                      style={{ width: "120px", height: "120px" }}
                    />
                  ))
                ) : (
                  <div
                    className="rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-medium"
                    style={{ width: "120px", height: "120px" }}
                  >
                    Không có ảnh
                  </div>
                )}
              </div>

              {/* Tiến độ quyên góp */}
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Đã quyên góp: {donatedAmount.toLocaleString()} /{" "}
                  {totalAmount.toLocaleString()} VND
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((donatedAmount / totalAmount) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Footer với nút "Thích", "Quyên góp" và "Chia sẻ" */}
            <div className="flex justify-between items-center mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 cursor-pointer group">
                <Handshake
                  sx={{
                    color: "#4b5563",
                    fontSize: 32,
                    transition: "color 0.2s",
                  }}
                  className="group-hover:text-green-600"
                />
                <h4 className="text-gray-600 group-hover:text-green-600 transition-all duration-200">
                  {campaign.participated}
                </h4>
              </div>
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200"
                onClick={() => setShowForm(campaign._id)}
              >
                <VolunteerActivism sx={{ color: "#4b5563", fontSize: 32 }} />
                <h4 className="text-gray-700 hover:text-green-600 transition-all duration-200">
                  Quyên góp
                </h4>
              </button>
              <div
                className="flex items-center space-x-2 cursor-pointer group px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                onClick={() => handleCopyLink(campaign._id)}
              >
                <IosShare
                  sx={{
                    color: "#4b5563",
                    fontSize: 32,
                  }}
                  className="group-hover:text-green-600"
                />
                <h4 className="text-gray-700 group-hover:text-green-600 transition-all duration-200">
                  Chia sẻ
                </h4>
              </div>
            </div>

            {/* Modal Quyên góp */}
            {showForm === campaign._id && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
                onClick={() => setShowForm(null)}
              >
                <div
                  style={{
                    backgroundColor: "#f7fafc",
                    borderRadius: "16px",
                    padding: "24px",
                    width: "640px",
                    maxWidth: "95%",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    transform: "scale(0.9)",
                    animation: "scaleIn 0.3s ease forwards",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Quyengop
                    onClose={() => setShowForm(null)}
                    onSubmit={(channel, url) => {
                      console.log(`Channel: ${channel}, URL: ${url}`);
                      setShowForm(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Snackbar cho sao chép link */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {severity === "success"
            ? "Đã sao chép đường link!"
            : "Sao chép thất bại!"}
        </Alert>
      </Snackbar>

      {/* Thêm CSS animation cho modal */}
      <style>
        {`
          @keyframes scaleIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Camp;
