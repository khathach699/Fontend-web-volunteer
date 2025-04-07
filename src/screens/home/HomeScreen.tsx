import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import logo from "/src/assets/logos/logo.png";
import avatar from "/src/assets/backgrounds/Rectangle 9.png";
import HeaderComponent from "../../components/Header";
import FeaturedMembers from "./components/FeaturedMembers";
import { Typography } from "antd";

const activities = [
  {
    id: 1,
    logo: "/src/assets/logos/3d_avatar_19.png",
    image: "/src/assets/backgrounds/Rectangle 24.png",
    title: "Tổ chức A",
    description:
      "Tháng vừa qua chúng tôi đã có những hoạt động vô cùng ý nghĩa. Cảm ơn các bạn tình nguyện viên đã cùng tham gia với tổ chức của chúng tôi...",
  },
  {
    id: 2,
    logo: "/src/assets/logos/3d_avatar_20.png",
    title: "Tổ chức Beta",
    image: "/src/assets/backgrounds/Rectangle 26.png",
    description:
      "Tháng vừa qua chúng tôi đã có những hoạt động vô cùng ý nghĩa. Cảm ơn các bạn tình nguyện viên đã cùng tham gia với tổ chức của chúng tôi...",
  },
  {
    id: 3,
    logo: "/src/assets/logos/1.png",
    image: "/src/assets/backgrounds/logo (1).png",
    title: "Tổ chức C",
    description:
      "Chúng tôi rất vui vì đã tổ chức nhiều sự kiện giúp cộng đồng phát triển và gắn kết... Chúng tôi rất vui vì đã tổ chức nhiều sự kiện giúp cộng đồng phát triển và gắn kết... Chúng tôi rất vui vì đã tổ chức nhiều sự kiện giúp cộng đồng phát triển và gắn kết... Chúng tôi rất vui vì đã tổ chức nhiều sự kiện giúp cộng đồng phát triển và gắn kết...",
  },
];

const newMembers = [
  {
    avatar: "/src/assets/logos/1.png", // Đảm bảo ảnh nằm trong thư mục public/logos
    title: "John Doe",
    number: 120,
    start: <FaStar />,
  },
  {
    avatar: "/src/assets/logos/2.png",
    title: "Jane Smith",
    number: 80,
    start: <FaStar />,
  },
  {
    avatar: "/src/assets/logos/3.png",
    title: "Jane Smith",
    number: 80,
    start: <FaStar />,
  },
  {
    avatar: "/src/assets/logos/4.png",
    title: "Jane Smith",
    number: 80,
    start: <FaStar />,
  },
  {
    avatar: "/src/assets/logos/5.png", // Link ảnh tạm
    title: "Alex Brown",
    number: 95,
    start: <FaStar />,
  },

  {
    avatar: "/src/assets/logos/3d_avatar_20.png", // Link ảnh tạm
    title: "Alex Brown",
    number: 95,
    start: <FaStar />,
  },
  {
    avatar: "/src/assets/backgrounds/Rectangle 9.png", // Link ảnh tạm
    title: "background Brown background Brown background Brown",
    number: 95,
    start: <FaStar color="black" />,
  },
];

const Members = [
  {
    avatar: "/src/assets/logos/1.png", // Đảm bảo ảnh nằm trong thư mục public/logos
    title: "John Doe",
    number: 120,
  },
  {
    avatar: "/src/assets/logos/2.png",
    title: "Jane Smith",
    number: 80,
  },
  {
    avatar: "/src/assets/logos/3.png",
    title: "Jane Smith",
    number: 80,
  },
  {
    avatar: "/src/assets/logos/4.png",
    title: "Jane Smith",
    number: 80,
  },
  {
    avatar: "/src/assets/logos/5.png", // Link ảnh tạm
    title: "Alex Brown",
    number: 95,
  },

  {
    avatar: "/src/assets/logos/3d_avatar_20.png", // Link ảnh tạm
    title: "Alex Brown",
    number: 95,
  },
  {
    avatar: "/src/assets/backgrounds/Rectangle 9.png", // Link ảnh tạm
    title: "background Brown background Brown background Brown",
    number: 95,
  },
];

const Text = Typography;
const HomeScreen = () => {
  return (
    <>
      <HeaderComponent />
      {/* //px-4 */}
      <div
        className="d-flex flex-column justify-content-center align-items-center  "
        style={{
          minHeight: "100vh",
          width: "100%",
          overflowY: "auto",
          paddingTop: "100px",
          background: "#EDF1D6",
        }}
      >
        <div
          className="container justify-content-center align-items-center"
          style={{
            width: "1200px",
            height: "480px",
            padding: "20px",
            // border: "1px solid #000",
            background: "#F7F7F8",
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.9)",
          }}
        >
          <div
            style={{
              width: "100%",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Bạn muốn tìm gì?"
              style={{
                width: "70%",
                height: "40px",
                padding: "10px",
                borderRadius: "50px",
                border: "2px solid #",
                background: "#9DC08B",
                color: "#000",
              }}
            />
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={500}
            style={{ width: "100%", height: "350px" }}
          >
            <SwiperSlide>
              <img
                src={logo}
                alt="Slide 1"
                style={{ width: "100%", height: "80%", objectFit: "contain" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={avatar}
                alt="Slide 2"
                style={{ width: "100%", height: "80%", objectFit: "contain" }}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <Text
          style={{
            fontSize: 30,
            marginRight: "auto",
            marginTop: "70px",
            marginLeft: "11%",
          }}
        >
          HOẠT ĐỘNG NỔI BẬT
        </Text>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={500}
          pagination={{ clickable: true }}
          spaceBetween={5}
          slidesPerView={2}
          loop={true}
          style={{ width: "77%", height: "250px", margin: "auto" }}
        >
          {activities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <div
                style={{
                  background: "#fff",
                  height: "200px",
                  // maxHeight: "200px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "15px",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
              >
                <div className="row d-flex align-items-center">
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={activity.logo}
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                      <h3 style={{ fontSize: "16px", margin: "0" }}>
                        {activity.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        textAlign: "justify",
                      }}
                    >
                      {activity.description}
                    </p>
                  </div>

                  <div className="col-6">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Text
          style={{
            fontSize: 30,
            marginRight: "auto",
            marginTop: "70px",
            marginLeft: "11%",
          }}
        >
          THÀNH VIÊN NỔI BẬT
        </Text>

        <FeaturedMembers members={newMembers} />
        <Text
          style={{
            fontSize: 30,
            marginRight: "auto",
            marginTop: "70px",
            marginLeft: "11%",
          }}
        >
          TỔ CHỨC NỔI BẬT
        </Text>

        <FeaturedMembers members={Members} />
        <Text
          style={{
            fontSize: 30,
            marginRight: "auto",
            marginTop: "70px",
            marginLeft: "11%",
          }}
        >
          GIỚI THIỆU VỀ TRANG WEB
        </Text>
        <div
          style={{
            width: "1200px",
            height: "480px",
            background: "#FFFFFF",
            backgroundImage: "url('/src/assets/backgrounds/logo (1).png')",
            backgroundSize: "80% auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex", // Chia layout
            // justifyContent: "space-between", // Cách đều 2 cột
            // alignItems: "center", // Canh giữa theo chiều dọc
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.9)",
            padding: "20px",
          }}
        >
          <div style={{ flex: 7 }}>
            <ul className="list-info">
              <li>Là nơi để kết nối cộng đồng với nhau</li>
              <li>Cùng nhau làm những điều ý nghĩa</li>
              <li>Cùng nhau làm những điều ý nghĩa</li>
              <li>
                Những cá nhân sẽ tìm thấy những hoạt động thiện nguyện mình muốn
                tham gia
              </li>
              <li>Các tổ chức có thể tìm thêm những cánh tay cùng chung sức</li>
            </ul>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <img
                src="/src/assets/logos/Rectangle 34.png"
                alt=""
                style={{ width: "100px" }}
              />
            </div>
            <div>
              <img
                src="/src/assets/logos/Rectangle 38.png"
                alt=""
                style={{ width: "100px" }}
              />
            </div>
          </div>

          <div style={{ flex: 1, alignSelf: "center" }}>
            <img
              src="/src/assets/logos/Rectangle 39.png"
              alt=""
              style={{ width: "100px" }}
            />
          </div>
        </div>

        <footer
          style={{
            width: "100%",
            marginTop: "50px",
            height: "100px",
            boxShadow: "0px 4px 10px rgba(00, 0, 0, 0.9)",
            background: "#9DC08B",
          }}
        ></footer>
      </div>
    </>
  );
};

export default HomeScreen;
