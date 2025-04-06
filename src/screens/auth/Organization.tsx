import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckOutlined, EditOutlined as Pencil } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

interface Organization {
  Id: string;
  name: string;
  time: string;
  content: string;
  images: string[];
  avatar: string;
  totalCampaigns: number;
  totalVolunteers: number;
  campaigns: { name: string; stars: number; status: string }[];
}

const OrganizationProfile = () => {
  const [organization, setOrganization] = useState<Organization>({
    Id: "",
    name: "",
    time: "",
    content: "",
    images: [],
    avatar: "",
    totalCampaigns: 0,
    totalVolunteers: 0,
    campaigns: [],
  });

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
    followButton: {
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "12px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      transition: "transform 0.2s ease-in-out", // Animation for scaling
      cursor: "pointer",
    },
    followButtonActive: {
      backgroundColor: "#388E3C", // Slightly darker green when followed
      transform: "scale(1.05)", // Scale up slightly on click
    },
    volunteerCountButton: {
      backgroundColor: "#fff",
      border: "1px solid #609966", // Added border to match the other buttons
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "12px",
      color: "#4CAF50",
    },
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

  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    axios
      .post("/api/follow", {
        organizationId: organization.Id,
        follow: !isFollowing,
      })
      .then((response) => {
        console.log("Follow status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating follow status:", error);
        setIsFollowing(isFollowing); // Revert state on error
      });
  };

  const countleFollowToggle = () => {
    if (isFollowing) {
      setVolunteerCount(volunteerCount - 1); // Decrement count when unfollowing
    } else {
      setVolunteerCount(volunteerCount + 1); // Increment count when following
    }
    setIsFollowing(!isFollowing);
    // Optionally, make an API call to update the follow status and volunteer count on the server
    // axios.post("/api/follow", { organizationId: organization.id, follow: !isFollowing });
  };
  const handleEditOrganizationName = () => {
    alert("Chỉnh sửa tên tổ chức: " + organization.name);
  };
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
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
      setOrganization((prev) => ({
        ...prev,
        avatar: data.avatarUrl, // Giả sử API trả về URL ảnh mới
      }));
    } catch (error) {
      console.error("Lỗi upload:", error);
    }
  };
  useEffect(() => {
    axios
      .get("") // Add an actual API endpoint here
      .then((response) => {
        setOrganization(response.data);
      })
      .catch((error) => {
        console.error("Error loading organization data:", error);
      });
  }, []);

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
        style={{
          height: "80px",
          display: "flex",
          padding: "10px",
          alignItems: "center",
        }}
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
                <Link to="/Profile" className="dropdown-item ">
                  Thông tin cá nhân
                </Link>
                <Link to="/Setting" className="dropdown-item ">
                  Nâng cấp lên tổ chức
                </Link>
                <Link to="/Changepassword" className="dropdown-item ">
                  Đổi mật khẩu
                </Link>
                <Link to="/" className="dropdown-item ">
                  Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div
        className="row"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
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
                width: "240px", // Adjusted size to match the image
                height: "240px",
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
                right: 150,
                bottom: 0,
                background: "transparent",
                color: "#40513B",
                position: "absolute",
                transition:
                  "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                border: "none",
              }}
            >
              <label style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    handleImageUpload(e, organization.name || "default-id")
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
        <div
          className="col-8 col-md-8"
          style={{ display: "flex", flexDirection: "column" }}
        >
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
                onClick={handleEditOrganizationName}
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
                CÓ {organization.totalVolunteers || "3000"}TÌNH NGUYỆN VIÊN THEO
                DÕI
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
          </div>
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
                position: "absolute",
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
                      src={organization.avatar || "src/assets/logos/avt.png"}
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
                      {organization.name || "Tổ chức Beta"}
                    </h3>
                    <span style={{ fontSize: "12px", color: "#999" }}>
                      {organization.time || "5 phút trước"}
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
                  {organization.content ||
                    "Thăng vừa qua chiến tổi đã có những hoạt động vô cùng ý nghĩa. Cảm ơn các bạn tình nguyện viên đã cùng tổi vượt qua chiến dịch này. Những chiến dịch tiếp theo sẽ sớm được bắt đầu, hãy cùng đón chờ nhé!"}
                </p>
                {showAllImages ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(150px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {(organization.images || []).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`postimage-${index}`}
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          objectFit: "cover",
                          maxHeight: "150px",
                        }}
                      />
                    ))}
                    <button
                      onClick={() => setShowAllImages(false)}
                      style={style.viewMoreButton}
                    >
                      Thu gọn
                    </button>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {Array.from({ length: 3 }).map((_, index) => (
                        <img
                          key={index}
                          src={
                            organization.images && organization.images[index]
                              ? organization.images[index]
                              : "src/assets/logos/avt.png"
                          }
                          alt="postimage"
                          style={{
                            width: "30%",
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </div>
                    {organization.images && organization.images.length > 3 && (
                      <button
                        onClick={() => setShowAllImages(true)}
                        style={style.viewMoreButton}
                      >
                        Xem thêm ảnh ({organization.images.length - 3} ảnh)
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationProfile;
