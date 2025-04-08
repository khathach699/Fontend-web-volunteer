import React from "react";
import { EditOutlined as Pencil } from "@ant-design/icons";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { FaStar } from "react-icons/fa";
import handleAPI from "../../apis/handleAPI";

interface Volunteer {
  _id: string;
  fullname: string;
  email: string;
  point: number;
  avatar?: string;
  isdisable: boolean;
  role: {
    _id: string;
    name: string;
    description: string;
    isdeleted: boolean;
  };
  isdeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    user: Volunteer;
  };
}

interface ProfileInfoProps {
  volunteer: Volunteer | null;
  token: string;
  onUpdateVolunteer: (updatedVolunteer: Volunteer) => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  volunteer,
  token,
  onUpdateVolunteer,
}) => {
  const handleEditVolunteerName = async () => {
    try {
      const newName = prompt("Nhập tên mới:", volunteer?.fullname);

      if (!newName || newName.trim() === "") {
        return;
      }

      const decoded = jwtDecode<{ id: string }>(token);
      const id = decoded.id;

      // Call the update user API
      const api = "/users";
      const res = await handleAPI<ApiResponse>(
        api,
        {
          id: id,
          fullname: newName,
        },
        "put"
      );

      if (res.success && res.data.user) {
        // Update the volunteer state with the new name
        onUpdateVolunteer(res.data.user);
        toast.success("Tên đã được cập nhật thành công!");
      } else {
        toast.error("Không thể cập nhật tên. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật tên. Vui lòng thử lại sau.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>
        <span
          style={{
            fontSize: "24px",
            fontWeight: "initial",
            color: "#4CAF50",
          }}
        >
          THÔNG TIN CÁ NHÂN
        </span>
      </h2>
      <div>
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
          {volunteer?.fullname || "NGUYỄN VĂN A"}
          <button
            onClick={handleEditVolunteerName}
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          fontWeight: "bold",
          color: "#4CAF50",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "52px" }}>{volunteer?.point || 0}</h1>
        <FaStar style={{ color: "#FFD700", fontSize: "40px" }} />
      </div>
    </div>
  );
};

export default ProfileInfo;
