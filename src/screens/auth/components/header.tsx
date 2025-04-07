import { Link } from "react-router-dom";

interface HeaderProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ isDropdownOpen, setIsDropdownOpen }) => {
    return (
      <header
        className="flex justify-between items-center py-4 px-8"
        style={{ height: "80px", display: "flex", padding: "10px", alignItems: "center" }}
      >
        <div className="flex items-start">
          <img
            src="src/assets/logos/logo.png"
            alt="Logo"
            className="h-10 object-cover"
            style={{ height: "100px", width: "auto" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Trang chủ
          </Link>
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Hoạt động
          </Link>
          <Link to="/" style={{ color: "#40513B", marginRight: "40px" }}>
            Tình Nguyện
          </Link>
          <Link to="/Nonti" style={{ color: "#40513B", marginRight: "40px" }}>
            Thông báo
          </Link>
        </div>
        <div className="dropdown" style={{ position: "relative" }}>
          <div
            style={{
              fontSize: "16px",
              fontFamily: "'popins', sans-serif",
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="src/assets/logos/avt.png"
              alt="icon"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-right show mt-2">
                <Link to="/Profile" className="dropdown-item ">Thông tin cá nhân</Link>
                <Link to="/Upfile" className="dropdown-item ">Nâng cấp lên tổ chức</Link>
                <Link to="/ChangePassword" className="dropdown-item ">Đổi mật khẩu</Link>
                <Link to="/" className="dropdown-item ">Đăng xuất</Link>
              </div>
            )}
          </div>
        </div>
      </header >
    );
  };
  export default Header;