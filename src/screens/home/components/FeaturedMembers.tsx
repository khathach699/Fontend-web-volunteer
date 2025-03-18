import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Member {
  avatar: string;
  title: string;
  number: number;
  start?: React.ReactNode;
}

// Sử dụng props để truyền dữ liệu từ bên ngoài
interface FeaturedMembersProps {
  members: Member[];
}

const FeaturedMembers: React.FC<FeaturedMembersProps> = ({ members }) => {
  return (
    <div
      style={{
        width: "1200px",
        height: "240px",
        padding: "20px",
        background: "#F7F7F8",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.9)",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={5}
        loop={true}
        style={{ width: "100%", height: "230px" }}
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="d-flex flex-column align-items-center">
              <img
                src={member.avatar}
                alt={member.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <div>
                {member.number} {member.start}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "24px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {member.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedMembers;
