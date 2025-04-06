import { MoreHoriz } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { IosShare } from "@mui/icons-material";
const Picture = [
    "src/assets/img/2.png",
    "src/assets/img/3.png",
    "src/assets/img/4.png",
    "src/assets/img/5.png",
]

const Post = () => {
    return (
        <div className="bg-white w-5xl rounded-3xl border-2" >

            <div className="p-4">
                <div className="flex items-center">
                    <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" className="rounded-full h- w-20" />
                    <h2 className="w-full m-2 text-[#40513B]">Tổ Chức Alpha</h2>
                    <p className="text-[#609966] m-0 mx-4 w-full">1 giờ trước</p>
                    <MoreHoriz sx={{ color: "#40513B", fontSize: 40 }} />
                </div>
                <p className="text-lg my-3 mx-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque expedita, harum dicta facere similique recusandae nulla, animi ipsa illum totam necessitatibus ad nobis, voluptatibus numquam non! Esse repellendus unde tempora.
                </p>
                <div className="flex w-40 h-40 m-2">
                    {
                        Picture.map((item) => (
                            <img className="mx-3 rounded-2xl" src={item} alt="Pic" />
                        ))
                    }
                </div>
                <div className="flex">
                    <Favorite sx={{ color: "#EA3323", fontSize: 40, marginLeft: 2 }} />
                    <h4 className="text-[#EA3323] m-1 items-center ">100</h4>
                </div>
            </div>
            <div className="flex border-1 border-[#40513B] rounded-b-3xl p-2 ">
                <div className="w-full flex justify-start">
                    <Favorite sx={{ border:"#EA3323" , fontSize: 40, marginLeft: 2 }} />
                    <h4 className="text-[#40513B] m-1 ">Thích</h4>
                </div>
                <div className="flex w-full justify-end ">
                    <IosShare sx={{ color: "#40513B", fontSize: 40, marginLeft: 2 }} />
                    <h4 className="text-[#40513B] m-1 ">Chia sẻ</h4>
                </div>

            </div>
        </div>

    );
}

export default Post;