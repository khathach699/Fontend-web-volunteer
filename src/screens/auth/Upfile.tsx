import React, { useState } from "react";
import axios from "axios";
import Header from "./components/header";
import ProfileSidebar from "./components/ProfileSidebar";
import style from "../../types/style";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

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

const Upfile: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useSelector((state: RootState) => state.authReducer.data.token);

  // Kiểm tra token trước khi decode
  let userId = "";
  if (!token) {
    setError("Vui lòng đăng nhập để gửi yêu cầu");
  } else {
    try {
      const decoded = jwtDecode<{ id: string }>(token);
      userId = decoded.id;
      console.log("Decoded userId:", userId);
    } catch (err) {
      console.error("Error decoding token:", err);
      setError("Token không hợp lệ. Vui lòng đăng nhập lại");
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setCertificate(selectedFile);
      console.log(
        "File selected:",
        selectedFile.name,
        "Size:",
        selectedFile.size,
        "Type:",
        selectedFile.type
      );
    } else {
      console.log("No file selected");
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Image uploaded:", file, "ID:", id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra token và userId
    if (!token || !userId) {
      setError("Vui lòng đăng nhập để gửi yêu cầu");
      console.log("Error: Missing token or userId", { token, userId });
      return;
    }

    // Kiểm tra các trường bắt buộc
    if (!organizationName || !bankName || !accountNumber || !certificate) {
      setError("Vui lòng điền đầy đủ thông tin và tải lên giấy chứng nhận");
      console.log("Error: Missing required fields", {
        organizationName,
        bankName,
        accountNumber,
        certificate,
      });
      return;
    }

    try {
      // Tạo FormData để gửi dữ liệu
      const formData = new FormData();
      formData.append("info", organizationName);
      formData.append("bankName", bankName);
      formData.append("bankNumber", accountNumber);
      if (certificate) {
        formData.append("certificate", certificate);
      }

      console.log("Sending data to API:", {
        info: organizationName,
        bankName,
        bankNumber: accountNumber,
        certificate: certificate?.name,
      });

      // Gửi request POST tới API với userId trong URL
      const response = await axios.post(
        `http://localhost:3001/organizations/request/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", response.data);

      if (response.data.success) {
        setSuccess("Yêu cầu đã được gửi thành công, đang chờ phê duyệt");
        // Reset form sau khi gửi thành công
        setOrganizationName("");
        setBankName("");
        setAccountNumber("");
        setCertificate(null);
        console.log("Form reset after successful submission");
      } else {
        setError("Gửi yêu cầu thất bại. Vui lòng thử lại");
        console.log("API returned success: false", response.data);
      }
    } catch (err) {
      console.error("Error sending request:", err);
      setError("Không thể kết nối đến server. Vui lòng thử lại");
      console.log("Error details:", err.response?.data || err.message);
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
                <label
                  htmlFor="certificate-upload"
                  style={{
                    ...style.Upfilebtn,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="src/assets/logos/plus.png"
                    alt="Plus"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  {certificate ? certificate.name : "Tải tệp lên"}
                </label>
                <input
                  id="certificate-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
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
              Tên tổ chức
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
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
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
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
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              Số tài khoản
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
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
            {error && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#ffebee",
                  borderRadius: "8px",
                  color: "#c62828",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#e8f5e9",
                  borderRadius: "8px",
                  color: "#2e7d32",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                {success}
              </div>
            )}
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
