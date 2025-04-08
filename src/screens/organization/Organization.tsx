import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "../../components/common/Header";
import OrganizationHeader from "./OrganizationHeader";
import OrganizationPost from "./OrganizationPost";
import OrganizationSidebar from "./OrganizationSidebar";
import CampaignSection from "./CampaignSection";

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

  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
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

  const handleEditOrganizationName = () => {
    alert("Chỉnh sửa tên tổ chức: " + organization.name);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
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

      setOrganization((prev) => ({
        ...prev,
        avatar: data.avatarUrl,
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
      <HeaderComponent />
      <div
        className="row"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <OrganizationSidebar
          organization={organization}
          onImageUpload={handleImageUpload}
        />
        <div
          className="col-8 col-md-8"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <OrganizationHeader
            organization={organization}
            isFollowing={isFollowing}
            onFollowToggle={handleFollowToggle}
            onEditName={handleEditOrganizationName}
          />
          <CampaignSection
            open={open}
            setOpen={setOpen}
            organizationId={organization.Id}
          />
          <OrganizationPost
            organization={organization}
            showAllImages={showAllImages}
            setShowAllImages={setShowAllImages}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
