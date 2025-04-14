import { Add } from "@mui/icons-material";
const ButtonNewForCamp = () => {
  return (
    <div>
      <button
        className="m-0 p-0 "
        style={{ borderRadius: 50, backgroundColor: "#EDF1D6" }}
      >
        <div className="bg-[#9DC08B] text-[#40513B] w-fit rounded-full border-2 flex h-10 items-center justify-center">
          <Add sx={{ color: "#40513B", fontSize: 40, margin: 1 }} />
          <h5 className="text-[#40513B] mr-3 my-0 " style={{ fontWeight: 700 }}>
            Phát động chiến dịch mới
          </h5>
        </div>
      </button>
    </div>
  );
};

export default ButtonNewForCamp;
