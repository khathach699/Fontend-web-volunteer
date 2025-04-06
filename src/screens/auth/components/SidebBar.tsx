import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SideBar = ({ onSelect }: { onSelect: (page: string) => void }) => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const handleSelect = (page: string) => {
        onSelect(page);
    };

    return (
        <div className="h-screen w-sm bg-white ">
            <img className="px-15" src="../src/assets/img/logo.png" alt="logo" />
            <Link to="/Admin/Statistics">
                <button
                    onClick={() => handleSelect('Statistics')}
                    className={`w-full h-15 text-black justify-items-start border-black border pl-[200px]`}
                    style={{
                        backgroundColor: currentPage === "/Admin/Statistics" ? "#EDF1D6" : "#ffffff"
                      }}
                >
                    <h4>Thống kê</h4>
                </button>
            </Link>
            <Link to="/Admin/VolunteerManagement">
                <button
                    onClick={() => handleSelect('VolunteerManagement')}
                    className={`w-full h-15 text-black justify-items-start border-black border pl-[200px]`}
                    style={{
                        backgroundColor: currentPage === "/Admin/VolunteerManagement" ? "#EDF1D6" : "#ffffff"
                      }}
                >
                    <h4>Quản lý tình nguyện viên</h4>
                </button>
            </Link>
            <Link to="/Admin/OriginManagement">
                <button
                    onClick={() => handleSelect('OriginManagement')}
                    className={`w-full h-15 text-black justify-items-start border-black border pl-[200px]`} style={{
                        backgroundColor: currentPage === "/Admin/OriginManagement" ? "#EDF1D6" : "#ffffff"
                      }}
                >
                    <h4>Quản lý tổ chức</h4>
                </button>
            </Link>
            <Link to="/Admin/PostManagement">
                <button
                    onClick={() => handleSelect('PostManagement')}
                    className={`w-full h-15 text-black justify-items-start border-black border pl-[200px]`} style={{
                        backgroundColor: currentPage === "/Admin/PostManagement" ? "#EDF1D6" : "#ffffff"
                      }}
                >
                    <h4>Quản lý bài đăng</h4>
                </button>
            </Link>
            <Link to="/Admin/CampainManagement">
                <button
                    onClick={() => handleSelect('CampainManagement')}
                    className={`w-full h-15 text-black justify-items-start border-black border pl-[200px]`} style={{
                        backgroundColor: currentPage === "/Admin/CampainManagement" ? "#EDF1D6" : "#ffffff"
                      }}
                >
                    <h4>Quản lý chiến dịch</h4>
                </button>
            </Link>
        </div>
    );
};

export default SideBar;