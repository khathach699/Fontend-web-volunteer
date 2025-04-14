import React, { useState } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { IosShare, Handshake, VolunteerActivism } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { AlertProps } from "@mui/material/Alert";
import Quyengop from './quyengop';
import { Link } from "react-router-dom";

const Picture = [
    "src/assets/img/2.png",
    "src/assets/img/3.png",
    "src/assets/img/4.png",
    "src/assets/img/5.png",
];

const Tags = [
    "trên 100 người",
    "môi trường",
    "Tp.HCM",
    "50 điểm",
    "1 tháng"
]

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Camp = () => {
    const [likes, setLikes] = useState(100); // Khởi tạo số likes ban đầu
    const [isLiked, setIsLiked] = useState(false); // Trạng thái thích bài viết
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [participants, setParticipants] = useState(50); // Example initial value
    const [maxParticipants, setMaxParticipants] = useState(100); // Example initial value
    const [donation, setDonation] = useState(0); // Initial donation amount
    const [maxDonation, setMaxDonation] = useState(1000000); // Example maximum donation amount
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1); // Thay đổi số lượng thích khi click
    };


    const handleCopyLink = () => {
        const link = window.location.href;

        navigator.clipboard.writeText(link)
            .then(() => {
                setSeverity("success");
                setOpen(true);
            })
            .catch(() => {
                setSeverity("error");
                setOpen(true);
            });
    };

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <div className="bg-white w-2/3 rounded-3xl border-2 m-2">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" className="rounded-full  w-12" />
                        <h3 className="w-fit m-2 text-[#40513B]">Tổ Chức Alpha</h3>
                        <p className="text-[#609966] m-0 mx-4 w-fit">1 giờ trước</p>
                        <p className="text-black m-0 mx-4 w-fit">đã phát động</p>
                        <div className="w-fit bg-[#9DC08B] border rounded-full p-2">CHIẾN DỊCH THÁNG 3</div>
                    </div>
                    <div className="dropdown" style={{ position: "relative" }}>
                        <button
                            className="ml-2 text-[#000000] hover:text-[#EDF1D6] transition-all duration-200"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {/* Link dẫn tới trang chức năng chưa được phát triển*/}
                            {isDropdownOpen && (
                                <div className="dropdown-menu dropdown-menu-right show mt-2">
                                    <Link to="/" className="dropdown-item ">Chỉnh sửa chiến dịch</Link>
                                    <Link to="/" className="dropdown-item ">Xóa chiến dịch</Link>
                                    <Link to="/" className="dropdown-item ">Dừng phát động</Link>
                                    <Link to="/" className="dropdown-item ">Chi tiết</Link>
                                </div>

                            )}
                            <MoreHoriz sx={{ color: "#40513B", fontSize: 40 }} />
                        </button>
                    </div>
                </div>
                <div className="flex m-2">
                    {Tags.map((item) => (
                        <div className="w-fit bg-[#EDF1D6] rounded-full px-3 py-1 m-1 shadow-md">
                            {item}
                        </div>
                    ))}
                </div>
                <p className="text-lg my-3 mx-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa reprehenderit nobis saepe facilis facere quo? Asperiores exercitationem unde quam eius nulla consequatur necessitatibus deleniti impedit corporis? Itaque quod ad maxime!</p>

                {/* Hiển thị ảnh từ mảng Picture */}
                <div className="flex w-40 m-2">
                    {Picture.map((item, index) => (
                        <img key={index} className="mx-3 rounded-2xl object-cover" src={item} alt="Pic" />
                    ))}
                </div>
            </div>
            {/* Footer với nút "Thích" và "Chia sẻ" */}
            <div className="flex justify-between border-1 border-[#40513B] rounded-b-3xl p-2">
                <div className="flex items-center" onClick={handleLike} >
                    <Handshake sx={{ color: isLiked ? "#609966" : "#40513B", fontSize: 40, marginLeft: 2 }} />
                    <h4 className={`text-${isLiked ? "red-500" : "gray-700"} m-1`}>{likes}</h4>
                </div>
                <button className="flex w-fit  " onClick={() => setShowForm(true)}>
                    <VolunteerActivism sx={{ color: "#40513B", fontSize: 40, marginLeft: 2 }} />
                    <h4 className="text-[#40513B] m-1 hover:text-[#609966] ">Quyên góp</h4>
                </button>

                <div className="flex w-fit  " onClick={handleCopyLink}>
                    <IosShare sx={{ color: "#40513B", fontSize: 40, marginLeft: 2 }} />
                    <h4 className="text-[#40513B] m-1 hover:text-[#609966] ">Chia sẻ</h4>
                </div>
                {showForm && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                        onClick={() => setShowForm(false)}
                    >
                        <div
                            style={{
                                backgroundColor: '#EDF1D6',
                                borderRadius: '10px',
                                padding: '20px',
                                width: '600px',
                                maxWidth: '90%',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Quyengop
                                onClose={() => setShowForm(false)}
                                onSubmit={(channel, url) => {
                                    console.log(`Channel: ${channel}, URL: ${url}`);
                                    setShowForm(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {severity === "success" ? " Đã sao chép đường link!" : " Sao chép thất bại!"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Camp;
