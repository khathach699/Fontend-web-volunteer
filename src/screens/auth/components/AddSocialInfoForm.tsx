import React, { useState } from "react";
import style from "../../../types/style";
interface AddSocialInfoFormProps {
  onClose: () => void;
  onSubmit: (channel: string, url: string) => void;
}

const AddSocialInfoForm: React.FC<AddSocialInfoFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [channel, setChannel] = useState("Facebook");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(channel, url);
    onClose();
  };

  return (
    <div>
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
        THÊM THÔNG TIN
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Chọn kênh thông tin */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Chọn kênh thông tin
          </label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        {/* Nhập đường dẫn */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Nhập đường dẫn đến trang cá nhân của bạn:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Nhập đường dẫn"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          />
        </div>

        {/* Nút Gửi và Hủy */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="submit"
            onClick={onClose}
            style={{
              backgroundColor: "#609966",
              border: "1px solid #609966",
              borderRadius: "10px",
              padding: "5px 15px",
              fontSize: "14px",
              color: "#000000",
              cursor: "pointer",
              marginTop: "10px",
              display: "block",
            }}
          >
            Hủy
          </button>
          <button type="submit" style={style.Upfilebtn}>
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSocialInfoForm;
