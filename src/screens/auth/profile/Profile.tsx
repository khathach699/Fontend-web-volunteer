import React, { useState, useEffect, useRef } from "react";
import { Spin, Alert } from "antd";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import HeaderComponent from "../../../components/common/Header";
import handleAPI from "../../../apis/handleAPI";
import ProfileInfo from "../../profile/ProfileInfo";
import ProfileAvatar from "../../profile/ProfileAvatar";
import ActivityList from "../../profile/ActivityList";
import { Volunteer, ApiResponse } from "../../../types/profile";

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

const ProfilePage = () => {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.authReducer.data.token);
  const apiCalledRef = useRef(false);

  const handleGetVolunteerName = async () => {
    try {
      setLoading(true);
      const api = "/users/detail";
      const decoded = jwtDecode<{ id: string }>(token);
      const id = decoded.id;

      const res = await handleAPI<ApiResponse>(api, { id: id }, "post");
      if (res.success && res.data.user) {
        setVolunteer(res.data.user);
      } else {
        setError("Failed to load profile data");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to load profile data");
    }
  };

  useEffect(() => {
    if (token && !apiCalledRef.current) {
      apiCalledRef.current = true;
      handleGetVolunteerName();
    }
  }, [token]);

  // Handle avatar update
  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setVolunteer((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        avatar: newAvatarUrl,
      };
    });
  };

  // Handle volunteer update (e.g., name change)
  const handleVolunteerUpdate = (updatedVolunteer: Volunteer) => {
    setVolunteer(updatedVolunteer);
  };

  // Hiển thị trạng thái tải hoặc lỗi
  if (loading) return <Spin tip="Đang tải dữ liệu..." size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

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
      <HeaderComponent />
      <div
        className="row"
        style={{
          padding: "20px",
          flexDirection: "row",
        }}
      >
        <div className="col-4 col-md-4">
          <ProfileAvatar
            avatarUrl={volunteer?.avatar}
            onAvatarUpdate={handleAvatarUpdate}
            userId={volunteer?._id || ""}
          />
        </div>
        <div
          className="col-8 col-md-8"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <ProfileInfo
            volunteer={volunteer}
            token={token}
            onUpdateVolunteer={handleVolunteerUpdate}
          />
          <ActivityList />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
