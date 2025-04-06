import AvatarAdmin from "../components/AvatarAdmin";
import TableAdmin from "../components/TableAdmin";

const VolunteerManagement = () =>{
    return (
        <div>
            <div className="flex p-4 bg-white border-1 border-black rounded-2xl justify-between ">
                <h2 className="font-bold m-0">QUẢN LÝ TÌNH NGUYỆN VIÊN</h2>
                <div className="justify-self-end mr-[20]">
                <AvatarAdmin/>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <div className="flex items-center">
                    <button className=" text-black px-4 py-2 rounded-3xl mr-2" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>VÔ HIỆU</button>
                    <button className=" text-black px-4 py-2 rounded-3xl mr-2" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>XÓA</button>
                    <button className=" text-black px-4 py-2 rounded-3xl mr-2" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>XUẤT EXCEL</button>

                </div>
                {/* <div className="flex items-center">
                    <input type="text" placeholder="Tìm kiếm" className="border border-gray-300 rounded-lg px-4 py-2 mr-2" />
                    <button className="bg-[#A5CBA1] text-white px-4 py-2 rounded-lg">Tìm kiếm</button>
                </div> */}
            </div>
            <div className="flex justify-start ">DANH SÁCH TÌNH NGUYỆN VIÊN</div>
            <TableAdmin/>
        </div>
    )
}

export default VolunteerManagement;