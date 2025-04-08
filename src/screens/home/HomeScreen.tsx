import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import logo from "/src/assets/logos/logo.png";
import avatar from "/src/assets/backgrounds/Rectangle 9.png";
import HeaderComponent from "../../components/common/Header";
import FeaturedMembers from "./components/FeaturedMembers";
import { Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import handleAPI from "../../apis/handleAPI";

// Add interface for featured user
// interface FeaturedUser {
//   _id: string;
//   fullname: string;
//   avatar?: string;
//   point: number;
// }

// Interface for API response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Interface for featured campaign
// interface FeaturedCampaign {
//   id: string;
//   name: string;
//   img?: string;
//   images?: Array<{ imgUrl: string }>;
//   participated: number;
//   organization?: {
//     Inform: string;
//   };
//   content?: string;
//   location?: string;
//   startDate?: string;
//   endDate?: string;
//   status?: string;
//   targetAmount?: number;
//   currentAmount?: number;
// }

// Define interface for activity items
interface ActivityItem {
  id: string | number;
  logo: string;
  image: string;
  title: string;
  description: string;
}

// Update activities to use dynamic data instead of static
const defaultActivities: ActivityItem[] = [
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
      "Chúng tôi rất vui vì đã tổ chức nhiều sự kiện giúp cộng đồng phát triển và gắn kết...",
  },
];

// Default fallback data
const defaultMembers = [
  {
    avatar: "/src/assets/logos/1.png",
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

// Default fallback data for campaigns
const defaultCampaigns = [
  {
    avatar: "/src/assets/logos/1.png",
    title: "Chiến dịch trồng rừng",
    number: 120,
  },
  {
    avatar: "/src/assets/logos/2.png",
    title: "Chiến dịch hỗ trợ trẻ em vùng cao",
    number: 80,
  },
  {
    avatar: "/src/assets/logos/3.png",
    title: "Chiến dịch phát quà Tết",
    number: 65,
  },
  {
    avatar: "/src/assets/logos/4.png",
    title: "Chiến dịch sửa chữa trường học",
    number: 45,
  },
  {
    avatar: "/src/assets/logos/5.png",
    title: "Chiến dịch quyên góp sách vở",
    number: 30,
  },
];

const Text = Typography;
const HomeScreen = () => {
  const [newMembers, setNewMembers] = useState(defaultMembers);

  const [featuredCampaigns, setFeaturedCampaigns] = useState(defaultCampaigns);

  const [activities, setActivities] =
    useState<ActivityItem[]>(defaultActivities);
  const [loadingActivities, setLoadingActivities] = useState(false);

  useEffect(() => {
    const fetchFeaturedMembers = async () => {
      try {
        const response = await handleAPI<
          ApiResponse<{
            featuredUsers: Array<{
              _id: string;
              fullname: string;
              avatar?: string;
              point: number;
            }>;
          }>
        >("/users/featured?limit=7", {}, "get");

        if (
          response &&
          response.success &&
          response.data &&
          response.data.featuredUsers
        ) {
          const featuredUsers = response.data.featuredUsers;

          if (featuredUsers.length > 0) {
            // Transform API data to match the component's expected format
            const transformedMembers = featuredUsers.map((user) => {
              const result = {
                avatar: user.avatar || "/src/assets/logos/avt.png",
                title: user.fullname || "Volunteer",
                number: user.point || 0,
                start: <FaStar />,
              };

              return result;
            });

            setNewMembers(transformedMembers);
          } else {
            setNewMembers(defaultMembers);
          }
        } else {
          setNewMembers(defaultMembers);
        }
      } catch {
        setNewMembers(defaultMembers);
      }
    };

    const fetchFeaturedCampaigns = async () => {
      try {
        // console.log("Starting to fetch featured campaigns");
        const response = await handleAPI<
          ApiResponse<
            Array<{
              _id: string;
              name: string;
              img?: string;
              images?: Array<{ imgUrl: string }>;
              participated: number;
              organization?: {
                Inform?: string;
                logo?: string;
              };
              content?: string;
              location?: string;
              startDate?: string;
              endDate?: string;
              status?: string;
              targetAmount?: number;
              currentAmount?: number;
            }>
          >
        >("/campaigns/featured", {}, "get");

        // console.log("Campaigns API Response:", response);

        if (response && response.success && Array.isArray(response.data)) {
          const featuredCampaigns = response.data;
          // console.log("Featured campaigns:", featuredCampaigns);

          if (featuredCampaigns.length > 0) {
            // console.log(`Processing ${featuredCampaigns.length} campaigns`);

            // Transform API data to match the component's expected format
            const transformedCampaigns = featuredCampaigns.map((campaign) => {
              // console.log(`Processing campaign ${index + 1}:`, campaign);

              // Lấy ảnh từ campaign, ưu tiên images array trước, sau đó là img
              const imageUrl =
                campaign.images && campaign.images.length > 0
                  ? campaign.images[0].imgUrl
                  : campaign.img || "/src/assets/logos/campaign_default.png";

              // Lấy tên tổ chức
              const orgName =
                campaign.organization?.Inform || "Tổ chức không xác định";

              const result = {
                avatar: imageUrl,
                title: campaign.name || "Chiến dịch",
                number: campaign.participated || 0,
                description: orgName,
                content: campaign.content || "",
                location: campaign.location || "",
                startDate: campaign.startDate || "",
                endDate: campaign.endDate || "",
                status: campaign.status || "",
                targetAmount: campaign.targetAmount || 0,
                currentAmount: campaign.currentAmount || 0,
              };
              return result;
            });
            setFeaturedCampaigns(transformedCampaigns);
          } else {
            setFeaturedCampaigns(defaultCampaigns);
          }
        } else {
          setFeaturedCampaigns(defaultCampaigns);
        }
      } catch {
        setFeaturedCampaigns(defaultCampaigns);
      }
    };

    const fetchFeaturedActivities = async () => {
      try {
        setLoadingActivities(true);

        const response = await handleAPI<
          ApiResponse<
            Array<{
              _id: string;
              name: string;
              content?: string;
              organization?: {
                Inform?: string;
                logo?: string;
              };
              organizationInfo?: {
                name?: string;
                logo?: string;
              };
              images?: Array<{ imgUrl: string }>;
              img?: string;
            }>
          >
        >("/campaigns/featured-activities?limit=3", {}, "get");

        if (response && response.success && Array.isArray(response.data)) {
          const featuredActivities = response.data;

          if (featuredActivities.length > 0) {
            const transformedActivities = featuredActivities.map((activity) => {
              const imageUrl =
                activity.images && activity.images.length > 0
                  ? activity.images[0].imgUrl
                  : activity.img || "/src/assets/backgrounds/Rectangle 24.png";

              let orgLogo = "/src/assets/logos/1.png";
              if (activity.organizationInfo && activity.organizationInfo.logo) {
                orgLogo = activity.organizationInfo.logo;
              } else if (activity.organization && activity.organization.logo) {
                orgLogo = activity.organization.logo;
              }
              let orgName = "Tổ chức không xác định";
              if (activity.organizationInfo && activity.organizationInfo.name) {
                orgName = activity.organizationInfo.name;
              } else if (
                activity.organization &&
                activity.organization.Inform
              ) {
                orgName = activity.organization.Inform;
              }

              const result = {
                id: activity._id,
                logo: orgLogo,
                image: imageUrl,
                title: orgName,
                description:
                  activity.content ||
                  "Không có mô tả cho hoạt động này. Vui lòng tham gia để biết thêm chi tiết.",
              };

              return result;
            });

            setActivities(transformedActivities);
          } else {
            setActivities(defaultActivities);
          }
        } else {
          setActivities(defaultActivities);
        }
      } catch {
        setActivities(defaultActivities);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchFeaturedMembers();
    fetchFeaturedCampaigns();
    fetchFeaturedActivities();
  }, []);

  // Đảm bảo luôn có dữ liệu hiển thị
  const displayActivities =
    activities.length > 0 ? activities : defaultActivities;

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
            color: "#4CAF50",
            fontWeight: "bold",
          }}
        >
          HOẠT ĐỘNG NỔI BẬT
        </Text>

        {loadingActivities ? (
          <div
            style={{
              width: "77%",
              margin: "auto",
              textAlign: "center",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
            <span style={{ marginLeft: "10px", lineHeight: "32px" }}>
              Đang tải hoạt động nổi bật...
            </span>
          </div>
        ) : displayActivities.length === 0 ? (
          <div
            style={{
              width: "77%",
              margin: "auto",
              textAlign: "center",
              padding: "20px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ fontSize: "16px", color: "#666" }}>
              Chưa có hoạt động nổi bật nào. Hãy quay lại sau!
            </p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={500}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={displayActivities.length < 2 ? 1 : 2}
            loop={displayActivities.length >= 3}
            style={{ width: "77%", height: "250px", margin: "auto" }}
          >
            {displayActivities.map((activity) => (
              <SwiperSlide key={activity.id}>
                <div
                  style={{
                    background: "#fff",
                    height: "200px",
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
                          onError={(e) => {
                            // Nếu ảnh lỗi, dùng ảnh mặc định
                            (e.target as HTMLImageElement).src =
                              "/src/assets/logos/1.png";
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "10px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          alt="Logo"
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
                          maxHeight: "120px",
                          overflow: "hidden",
                        }}
                      >
                        {activity.description}
                      </p>
                    </div>

                    <div className="col-6">
                      <img
                        src={activity.image}
                        onError={(e) => {
                          // Nếu ảnh lỗi, dùng ảnh mặc định
                          (e.target as HTMLImageElement).src =
                            "/src/assets/backgrounds/Rectangle 24.png";
                        }}
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
        )}

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
          CHIẾN DỊCH NỔI BẬT
        </Text>

        <FeaturedMembers
          members={
            featuredCampaigns.length >= 5 ? featuredCampaigns : defaultCampaigns
          }
        />
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
