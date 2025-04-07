import { Search } from "@mui/icons-material";

const SearchBar = () => {
    return (
        <div>
            <div className="flex w-3xl h-10 border-2 border-[#40513B] rounded-full bg-[#EDF1D6] items-center">
                <Search sx={{ color: "#40513B", fontSize: 35,margin:1 }} />
                <input type="text" placeholder="Bạn muốn tìm gì ?" className="focus:outline-none w-full mr-3"/>
            </div>
        </div>
    );
}

export default SearchBar;