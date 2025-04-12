import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/header";
import ProfileSidebar from "./components/ProfileSidebar";
import style from "../../types/style";

const Upfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Image uploaded:", file, "ID:", id);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertificate(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/change-password", {
        currentPassword,
        newPassword,
      });
      setSuccess("Password changed successfully");
    } catch (err) {
      setError("Failed to change password");
    }
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
      <Header
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <div
        className="row"
        style={{ padding: "20px", display: "flex", flexDirection: "row" }}
      >
        <ProfileSidebar
          organization={{ name: "Default Organization" }}
          handleImageUpload={handleImageUpload}
          style={style}
        />

        <div
          className="col-12 col-md-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              border: "2px solid #40513B",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                Đơn đề nghị thành lập
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button style={style.Upfilebtn}>
                    <img
                      src="src/assets/logos/plus.png"
                      alt="Plus"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    Tải tệp lên
                  </button>
                </div>
              </label>
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              Giấy chứng nhận
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={style.Upfilebtn}>
                  <img
                    src="src/assets/logos/plus.png"
                    alt="Plus"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  Tải tệp lên
                </button>
              </div>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              {" "}
              Tên ngân hàng
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{
                  width: "360px",
                  height: "40px",
                  gap: "8px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  backgroundColor: "#EDF1D6",
                }}
              />
            </label>
            {/* Số tài khoản */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              {" "}
              Số tài khoản
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                style={{
                  width: "360px",
                  height: "40px",
                  gap: "8px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  backgroundColor: "#EDF1D6",
                }}
              />
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button type="submit" style={style.viewMoreButton}>
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Upfile;
