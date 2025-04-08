import AvatarAdmin from "../auth/components/AvatarAdmin";

const Statistics = () => {
  return (
    <div>
      <div className="flex p-4 bg-white border-2 border-black rounded-2xl justify-between ">
        <h2 className="font-bold m-0">THỐNG KÊ</h2>
        <div className="justify-self-end mr-[20]">
          <AvatarAdmin />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
