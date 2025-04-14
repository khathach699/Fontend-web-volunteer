
import { Add } from "@mui/icons-material";
const ButtonNew = () => {
    return (
        <div>
            <button className="m-0 p-0" style={{borderRadius: 50, backgroundColor: "#EDF1D6"}}>
                <div className="bg-[#9DC08B] text-[#40513B] w-fit rounded-full border-2 flex h-10 items-center justify-center p-3">
                <Add sx={{ color: "#40513B", fontSize: 40}}  />
                <h5 className="text-[#40513B] " style={{fontWeight:700}}>Bài đăng mới</h5>
                </div>
            </button>
        </div>
    )
}

export default ButtonNew;