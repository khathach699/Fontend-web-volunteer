import AvatarAdmin from "../components/AvatarAdmin";
import TableAdmin from "../components/TableAdmin";

const VolunteerManagement = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-black">
        <h2 className="font-bold m-0">QUẢN LÝ TÌNH NGUYỆN VIÊN</h2>
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

      <div className="mt-4 font-medium">DANH SÁCH TÌNH NGUYỆN VIÊN</div>
      <TableAdmin />
    </div>
  );
};

export default VolunteerManagement;
