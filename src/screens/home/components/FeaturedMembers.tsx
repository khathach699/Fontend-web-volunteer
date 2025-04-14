import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MemberProps {
  avatar: string;
  title: string;
  number: number;
  start?: React.ReactNode;
}

// Sử dụng props để truyền dữ liệu từ bên ngoài
interface FeaturedMembersProps {
  members: MemberProps[];
}

const FeaturedMembers: React.FC<FeaturedMembersProps> = ({ members }) => {
  // Sắp xếp thành viên theo số point từ cao đến thấp
  const sortedMembers = [...members].sort((a, b) => b.number - a.number);

  // Tính số lượng slides để hiển thị
  const slidesPerView = Math.min(sortedMembers.length, 5);
  // Chỉ bật loop khi có đủ slide
  const enableLoop = sortedMembers.length > slidesPerView;

  return (
    <div
      style={{
        width: "1200px",
        height: "300px",
        padding: "20px",
        background: "#F7F7F8",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.9)",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={500}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        loop={enableLoop}
        style={{ width: "90%", height: "240px", margin: "auto" }}
      >
        {sortedMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "220px",
                width: "100%",
                background: "#fff",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={member.avatar}
                  alt={member.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/src/assets/logos/avt.png";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    margin: "0 0 8px 0",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {member.title}
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}
                >
                  <span>{member.number}</span>
                  {member.start && (
                    <div
                      style={{
                        color: "#FFD700",
                        marginLeft: "8px",
                        transform: "scale(1.2)",
                      }}
                    >
                      {member.start}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedMembers;
