import { Search } from "@mui/icons-material";

const SearchBar = () => {
    return (
        <div>
            <div className="flex w-3xl border-2 border-[#40513B] rounded-full p-2 bg-[#EDF1D6]">
                <Search sx={{ color: "#40513B", fontSize: 40,marginTop:1, marginLeft:1 }} />
                <input type="text" placeholder="Bạn muốn tìm gì ?" />
            </div>
        </div>
    );
}

export default SearchBar;