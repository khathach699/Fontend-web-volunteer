import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAuth } from "../reduxs/reducers/authReducer";
import { toast } from "react-toastify";

const HeaderComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the removeAuth action to clear auth state
    dispatch(removeAuth());
    // Show success message
    toast.success("Đăng xuất thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    // Close dropdown
    setIsDropdownOpen(false);
    // Redirect to login page
    navigate("/login");
    // window.location.reload();
  };

  return (
    <div
      style={{
        // border: "1px solid #40513B",
        paddingLeft: "100px",
        paddingRight: "100px",
        background: "#EDF1D6",
        fontFamily: "'Jura', sans-serif",
        width: "100%",
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
                <button
                  onClick={handleLogout}
                  className="dropdown-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
