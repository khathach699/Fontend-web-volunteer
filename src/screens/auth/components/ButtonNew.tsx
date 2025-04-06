
import { Add } from "@mui/icons-material";
const ButtonNew = () => {
    return (
        <div>
            <button className="m-0 p-0 " style={{borderRadius: 50, backgroundColor: "#EDF1D6"}}>
                <div className="bg-[#9DC08B] text-[#40513B] w-3xs rounded-full border-2 flex">
                <Add sx={{ color: "#40513B", fontSize: 40,marginTop:1, marginLeft:1 }}  />
                <h5 className="text-[#40513B] m-3 " style={{fontWeight:700}}>Bài đăng mới</h5>
                </div>
            </button>
        </div>
    )
}

export default ButtonNew;