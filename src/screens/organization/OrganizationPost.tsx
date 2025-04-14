import React from "react";

interface OrganizationPostProps {
  organization: {
    name: string;
    time: string;
    content: string;
    avatar: string;
    images: string[];
  };
  showAllImages: boolean;
  setShowAllImages: (show: boolean) => void;
}

const OrganizationPost: React.FC<OrganizationPostProps> = ({
  organization,
  showAllImages,
  setShowAllImages,
}) => {
  const style = {
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

  return (
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
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
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
  );
};

export default OrganizationPost;
