import { Search } from "@mui/icons-material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const SearchForCamp = () => {
    return (
        <div className="flex w-xl h-10 border-2 border-[#40513B] rounded-full bg-[#EDF1D6] items-center justify-between">
            <div className="flex w-full">
                <Search sx={{ color: "#40513B", fontSize: 35, margin: 1 }} />
                <input type="text" placeholder="Bạn muốn tìm gì ?" className="focus:outline-none w-full mr-3" />
            </div>
            <FormatListBulletedIcon sx={{ color: "#40513B", fontSize: 35, margin: 1 }} />
        </div>
    );
}

export default SearchForCamp;