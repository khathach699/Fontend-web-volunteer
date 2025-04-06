import AvatarAdmin from "../components/AvatarAdmin";
import TableAdmin from "../components/TableAdmin";
import WaitTable from "../components/WaitTable";

const OriginManagement = () =>{
    return (
        <div>
            <div className="flex p-4 bg-white border-1 border-black rounded-2xl justify-between ">
                <h2 className="font-bold m-0">QUẢN LÝ TỔ CHỨC</h2>
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
            </div>
            <div className="flex justify-start ">DANH SÁCH TỔ CHỨC</div>
            <TableAdmin/>
            <br/>
            <div className="flex justify-end ">
                <div className="flex items-center">
                    <button className=" text-black px-4 py-2 rounded-3xl mr-2 bg-white" style={{ border: "1px solid black" }}>KHÔNG CHẤP NHẬN</button>
                    <button className=" text-black px-4 py-2 rounded-3xl mr-2" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>DUYỆT</button>
                </div>
            </div>
            <div className="flex justify-start ">CÁC TỔ CHỨC ĐANG CHỜ DUYỆT</div>
            <WaitTable/>
        </div>
    )
}

export default OriginManagement;