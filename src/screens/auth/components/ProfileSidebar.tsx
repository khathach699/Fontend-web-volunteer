import { EditOutlined } from "@ant-design/icons"; // Adjust the import path if necessary

interface ProfileSidebarProps {
  organization: {
    avatar?: string;
    name?: string;
  };
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  style: {
    Btn: React.CSSProperties;
  };
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ organization, handleImageUpload, style }) => {
    return (
        <div
          className="col-6 col-md-4"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "50px",
          }}
        >
          <div className="d-flex" style={{ position: "relative" }}>
            <div
              className="rounded-circle border-success shadow position-relative overflow-hidden"
              style={{
                width: "240px", // Adjusted size to match the image
                height: "240px",
                margin: "0 0 20px 0", // Adjusted margin
                border: "5px solid #609966",
              }}
            >
              <img
                src="src/assets/logos/avt.png"
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <button
              className="btn btn-update"
              style={{
                right: 150,
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
                  onChange={(e) => handleImageUpload(e, organization.name || "default-id")}
                />
                <EditOutlined style={{ fontSize: "30px" }} />
              </label>
            </button>
          </div>
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
    );
  };
  export default ProfileSidebar;