import { useState } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { IosShare } from "@mui/icons-material";

// Khai báo mảng hình ảnh ở ngoài component
const Picture = [
    "src/assets/img/2.png",
    "src/assets/img/3.png",
    "src/assets/img/4.png",
    "src/assets/img/5.png",
];

const Post = () => {
    const [likes, setLikes] = useState(100); // Khởi tạo số likes ban đầu
    const [isLiked, setIsLiked] = useState(false); // Trạng thái thích bài viết

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1); // Thay đổi số lượng thích khi click
    };

    return (
        <div className="bg-white w-3/4 rounded-3xl border-2 m-2">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" className="rounded-full  w-12" />
                        <h2 className="w-fit m-2 text-[#40513B]">Tổ Chức Alpha</h2>
                        <p className="text-[#609966] m-0 mx-4 w-fit">1 giờ trước</p>
                    </div>
                    <MoreHoriz sx={{ color: "#40513B", fontSize: 40 }} />
                </div>
                <p className="text-lg my-3 mx-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa reprehenderit nobis saepe facilis facere quo? Asperiores exercitationem unde quam eius nulla consequatur necessitatibus deleniti impedit corporis? Itaque quod ad maxime!</p>

                {/* Hiển thị ảnh từ mảng Picture */}
                <div className="flex  w-40 h-40 m-2">
                    {Picture.map((item, index) => (
                        <img key={index} className="mx-3 rounded-2xl object-cover" src={item} alt="Pic" />
                    ))}
                </div>
            </div>

            {/* Footer với nút "Thích" và "Chia sẻ" */}
            <div className="flex border-1 border-[#40513B] rounded-b-3xl p-2">
                <div className="flex items-center" onClick={handleLike} >
                    <Favorite sx={{ color: isLiked ? "#EA3323" : "#40513B", fontSize: 40, marginLeft: 2 }} />
                    <h4 className={`text-${isLiked ? "red-500" : "gray-700"} m-1`}>{likes}</h4>
                </div>
                <div className="flex w-full justify-end ">
                    <IosShare sx={{ color: "#40513B", fontSize: 40, marginLeft: 2 }} />
                    <h4 className="text-[#40513B] m-1">Chia sẻ</h4>
                </div>
            </div>
        </div>
    );
};

export default Post;
