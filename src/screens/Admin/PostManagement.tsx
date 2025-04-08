import AvatarAdmin from "../auth/components/AvatarAdmin";
import NoDeleteTable from "../auth/components/NoDeleteTable";
import WaitTable from "../auth/components/WaitTable";

const PostManagement = () => {
  return (
    <div>
      <div className="flex p-4 bg-white border-1 border-black rounded-2xl justify-between ">
        <h2 className="font-bold m-0">QUẢN LÝ BÀI ĐĂNG</h2>
        <div className="justify-self-end mr-[20]">
          <AvatarAdmin />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="text-black px-4 py-2 rounded-3xl mt-4"
          style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}
        >
          XUẤT EXCEL
        </button>
      </div>
      <div className="flex justify-start ">DANH SÁCH BÀI ĐĂNG</div>
      <NoDeleteTable />
      <div className="flex justify-end">
        <button
          className="text-black px-4 py-2 mr-2 rounded-3xl mt-4 bg-white"
          style={{ border: "1px solid black" }}
        >
          KHÔNG CHẤP NHẬN
        </button>
        <button
          className="text-black px-4 py-2 rounded-3xl mt-4"
          style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}
        >
          DUYỆT
        </button>
      </div>
      <div className="flex justify-start ">CÁC BÀI ĐĂNG ĐANG CHỜ DUYỆT</div>
      <WaitTable />
    </div>
  );
};

export default PostManagement;
