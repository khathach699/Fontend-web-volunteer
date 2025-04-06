import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckOutlined, EditOutlined as Pencil } from "@ant-design/icons";
import { MdMenu } from "react-icons/md";
import Header from "./components/header"; 
import ProfileSidebar from "./components/ProfileSidebar";
import OrganizationInfo from "./components/OrganizationInfo";
import PostSection from "./components/PostSection";

const OrganizationProfile = () => {
  // Define the Organization type
  type Organization = {
    Id: number | null;
    name: string;
    time: string;
    content: string;
    images: string[];
    avatar: string;
    totalCampaigns: number;
    totalVolunteers: number;
    campaigns: any[]; // Replace 'any' with a specific type if available
  };
  
    const [organization, setOrganization] = useState<Organization>({
    Id: null,
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
      margin: "10px 0",
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
      transition: "transform 0.2s ease-in-out",
      cursor: "pointer",
    },
    followButtonActive: {
      backgroundColor: "#388E3C",
      transform: "scale(1.05)",
    },
    volunteerCountButton: {
      backgroundColor: "#fff",
      border: "1px solid #609966",
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
  const [error, setError] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    axios.post("/api/follow", { organizationId: organization.Id, follow: !isFollowing })
      .then((response) => {
        console.log("Follow status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating follow status:", error);
        setIsFollowing(isFollowing);
      });
  };

  const handleEditOrganizationName = () => {
    alert("Chỉnh sửa tên tổ chức: " + organization.name);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
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

      setOrganization((prev: any) => ({
        ...prev,
        avatar: data.avatarUrl,
      }));
    } catch (error) {
      console.error("Lỗi upload:", error);
      setError("Không thể upload ảnh, vui lòng thử lại.");
    }
  };

  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setOrganization(response.data);
      })
      .catch((error) => {
        console.error("Error loading organization data:", error);
      });
  }, []);

  return (
    <div style={{ 
      border: "2px solid #40513B",
      overflowY: "auto",
      paddingLeft: "100px",
      paddingRight: "100px",
      width: "100vw",
      height: "100vh",
      background: "#EDF1D6",
      fontFamily: "'Jura', sans-serif",
    }}>
      <Header isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      <div className="row" style={{ padding: "20px", display: "flex", flexDirection: "row" }}>
        <ProfileSidebar organization={organization} handleImageUpload={handleImageUpload} style={style} />
        <div className="col-8 col-md-8" style={{ display: "flex", flexDirection: "column" }}>
          <OrganizationInfo
            organization={organization}
            handleEditOrganizationName={handleEditOrganizationName}
            handleFollowToggle={handleFollowToggle}
            isFollowing={isFollowing}
            style={style}
            open={open}
            setOpen={setOpen}
          />
          <PostSection
            organization={organization}
            showAllImages={showAllImages}
            setShowAllImages={setShowAllImages}
            style={style}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
