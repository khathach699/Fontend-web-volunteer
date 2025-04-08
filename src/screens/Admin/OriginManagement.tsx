import AvatarAdmin from "../auth/components/AvatarAdmin";
import TableAdmin from "../auth/components/TableAdmin";
import WaitTable from "../auth/components/WaitTable";

const OriginManagement = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-black">
        <h2 className="font-bold m-0">QUẢN LÝ TỔ CHỨC</h2>
        <div>
          <AvatarAdmin />
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-4 py-2 rounded-3xl border border-black bg-[#9DC08B] text-black">
          VÔ HIỆU
        </button>
        <button className="px-4 py-2 rounded-3xl border border-black bg-[#9DC08B] text-black">
          XÓA
        </button>
        <button className="px-4 py-2 rounded-3xl border border-black bg-[#9DC08B] text-black">
          XUẤT EXCEL
        </button>
      </div>

      <div className="mt-4 font-medium">DANH SÁCH TỔ CHỨC</div>
      <TableAdmin />

      <div className="flex justify-end mt-8 space-x-2">
        <button className="px-4 py-2 rounded-3xl border border-black bg-white text-black">
          KHÔNG CHẤP NHẬN
        </button>
        <button className="px-4 py-2 rounded-3xl border border-black bg-[#9DC08B] text-black">
          DUYỆT
        </button>
      </div>

      <div className="mt-4 font-medium">CÁC TỔ CHỨC ĐANG CHỜ DUYỆT</div>
      <WaitTable />
    </div>
  );
};

export default OriginManagement;
