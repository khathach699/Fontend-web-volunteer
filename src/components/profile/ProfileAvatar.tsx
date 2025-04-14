import React from "react";
import { EditOutlined as Pencil } from "@ant-design/icons";
import { toast } from "react-toastify";

interface ProfileAvatarProps {
  avatarUrl?: string;
  onAvatarUpdate: (newAvatarUrl: string) => void;
  userId: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  onAvatarUpdate,
  userId,
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("Không có file được chọn");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`/api/upload-avatar/${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Lỗi khi upload ảnh");
      }

      const data = await response.json();
      console.log("Upload thành công:", data);

      // Call the callback to update avatar in parent component
      onAvatarUpdate(data.avatarUrl);
      toast.success("Cập nhật ảnh đại diện thành công!");
    } catch (error) {
      console.error("Lỗi upload:", error);
      toast.error("Không thể upload ảnh, vui lòng thử lại.");
    }
  };

  const style = {
    Btn: {
      width: "240px",
      height: "40px",
      cursor: "pointer",
      margin: "10px 0",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="d-flex" style={{ position: "relative" }}>
        <div
          className="rounded-circle border-success shadow position-relative overflow-hidden"
          style={{
            width: "360px",
            height: "360px",
            margin: "0 0 20px 0",
            border: "5px solid #609966",
          }}
        >
          <img
            src={avatarUrl || "src/assets/logos/avt.png"}
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
              onChange={handleImageUpload}
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
  );
};

export default ProfileAvatar;
