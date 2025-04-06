import React, { useState, useEffect, JSX } from "react";
import { Card, List, Typography, Button, Tag, Spin, Alert, Avatar } from "antd";
import { CheckOutlined, EditOutlined as Pencil } from "@ant-design/icons";
import { FaCheck, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdMenu } from "react-icons/md";


interface Activity {
  campaign: { name: string; stars: number; status: string; orgname: string;}[];
  stars: number;
  status: "Hoàn thành" | "Không hoàn thành" | "Đang thực hiện";
}

interface Volunteer {
  name: string;
  points: number;
  avatar: string;
  activities: Activity[];
}

const ProfilePage = () => {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("") // Cập nhật API 
      .then(response => {
        setVolunteer(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      });
  }, []);
  //chỉnh sửa tên 
  const handleEditVolunteerName = () => {
    alert("Chỉnh sửa tên tổ chức: " + volunteer?.name);
  };
  // Hàm xử lý upload ảnh
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0]; // Lấy file từ input
    if (!file) {
      console.error("Không có file được chọn");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`/api/upload-avatar/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Lỗi khi upload ảnh");
      }

      const data = await response.json();
      console.log("Upload thành công:", data);

      // Cập nhật state volunteer để hiển thị ảnh mới
      setVolunteer((prev) => {
        if (!prev) return null; // Handle the case where prev is null
        return {
          ...prev,
          avatar: data.avatarUrl, // Giả sử API trả về URL ảnh mới
          name: prev.name, // Ensure required fields are preserved
          points: prev.points,
          activities: prev.activities,
        };
      });
    } catch (error) {
      console.error("Lỗi upload:", error);
      setError("Không thể upload ảnh, vui lòng thử lại.");
    }
  };

  // Hiển thị trạng thái tải hoặc lỗi
  if (loading) return <Spin tip="Đang tải dữ liệu..." size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;
  const style = {
    Btn: {
      width: "240px",
      height: "40px",
      cursor: "pointer",
      margin: "10px 0", // Adjusted margin for vertical stacking
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
      style={{
        border: "2px solid #40513B",
        overflowY: "auto",
        paddingLeft: "100px",
        paddingRight: "100px",
        width: "100vw",
        height: "100vh",
        background: "#EDF1D6",
        fontFamily: "'Jura', sans-serif",
      }}
    >
      <header
        className="flex justify-between items-center py-4 px-8"
        style={{ height: "80px", display: "flex", padding: "10px", alignItems: "center" }}
      >
        <div className="flex items-start">
          <img
            src="src/assets/logos/logo.png"
            alt="Logo"
            className="h-10 object-cover"
            style={{ height: "100px", width: "auto" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Trang chủ
          </Link>
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Hoạt động
          </Link>
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Tình Nguyện
          </Link>
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Thông báo
          </Link>
        </div>
        <div className="dropdown" style={{ position: "relative" }}>
          <div
            style={{
              fontSize: "16px",
              fontFamily: "'popins', sans-serif",
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="src/assets/logos/avt.png"
              alt="icon"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-right show mt-2">
                <Link to="/Profile" className="dropdown-item ">Thông tin cá nhân</Link>
                <Link to="/Setting" className="dropdown-item ">Nâng cấp lên tổ chức</Link>
                <Link to="/Changepassword" className="dropdown-item ">Đổi mật khẩu</Link>
                <Link to="/" className="dropdown-item ">Đăng xuất</Link>
              </div>
            )}
          </div>
        </div>
      </header >
      <div
        className="row"
        style={{
          padding: "20px",
          flexDirection: "row",
        }}
      >
        <div className="col-4 col-md-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="d-flex" style={{ position: "relative" }}>
            <div
              className="rounded-circle border-success shadow position-relative overflow-hidden"
              style={{
                width: "360px", // Adjusted size to match the image
                height: "360px",
                margin: "0 0 20px 0", // Adjusted margin
                border: "5px solid #609966",
              }}
            >
              <img
                src="src/assets/logos/avt.png"
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <button
              className="btn btn-update"
              style={{
                right: -10,
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
                  onChange={(e) => handleImageUpload(e, volunteer?.name || "default-id")}
                />
                <Pencil style={{ fontSize: "40px" }} />
              </label>
            </button>
          </div>
        <div>
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
        </div>
        <div className="col-8 col-md-8" style={{ display: "flex", flexDirection: "column" }}>
          <h2>
            <span style={{ fontSize: "24px", fontWeight: "initial", color: "#4CAF50" }}>
              THÔNG TIN CÁ NHÂN
            </span>
          </h2>
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: "52px", gap: "20px", fontWeight: "bold", color: "#4CAF50", justifyContent: "center", display: "flex", alignItems: "center" }}>
              {volunteer?.name || "NGUYỄN VĂN A"}
              <button
                onClick={handleEditVolunteerName}
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  background: "transparent",
                  color: "#40513B",
                  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                  border: "none",
                }}
              >
                <Pencil style={{ fontSize: "30px" }} />
              </button>
            </h1>
          </div>
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
              { name: "CHIẾN DỊCH THÁNG 3", points: 50, status: "Hoàn thành", completed: true, orgname: "TỔ CHỨC A" },
              { name: "CHIẾN DỊCH THÁNG 3", points: 50, status: "Hoàn thành", completed: true, orgname: "TỔ CHỨC A" },
              { name: "CHIẾN DỊCH THÁNG 4", points: 50, status: "Không hoàn thành", completed: false, orgname: "TỔ CHỨC B" },
              { name: "CHIẾN DỊCH THÁNG 5", points: 50, status: "Hoàn thành", completed: true, orgname: "TỔ CHỨC C" },
            ].map((task, index) => (
              <div
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
                      src={ volunteer?.avatar|| "src/assets/logos/avt.png"}
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
                    { task.orgname|| "TỔ CHỨC A"}
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
      </div>
  );
};
export default ProfilePage;
