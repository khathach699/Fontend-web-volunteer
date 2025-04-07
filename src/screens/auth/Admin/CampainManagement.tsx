import AvatarAdmin from "../components/AvatarAdmin";
import CampainTable from "../components/CampainTable";
import WaitTable from "../components/WaitTable";

const CampainManagement = () =>{
    return (
        <div>
            <div className="flex p-4 bg-white border-1 border-black rounded-2xl justify-between ">
                <h2 className="font-bold m-0">QUẢN LÝ CHIẾN DỊCH</h2>
                <div className="justify-self-end mr-[20]">
                <AvatarAdmin/>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="text-black px-4 py-2 rounded-3xl mt-4" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>XUẤT EXCEL</button>
            </div>
            <div className="flex justify-start ">DANH SÁCH CHIẾN DỊCH</div>
            <CampainTable />
            <div className="flex justify-end">
                <button className="text-black px-4 py-2 mr-2 rounded-3xl mt-4 bg-white" style={{ border: "1px solid black" }}>KHÔNG DUYỆT</button>
                <button className="text-black px-4 py-2 rounded-3xl mt-4" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>DUYỆT</button>

            </div>
            <div className="flex justify-start ">CÁC CHIẾN DỊCH ĐANG CHỜ DUYỆT</div>
            <WaitTable/>
        </div>
    )
}

export default CampainManagement;