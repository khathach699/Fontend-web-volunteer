import { Search } from "@mui/icons-material";

const SearchBar= () => {
return (
<div className="flex w-full max-w-xl h-10 border-2 border-[#40513B] rounded-full bg-[#9DC08B] items-center px-3">
    <div className="flex items-center w-full">
        <Search />
        <input
            type="text"
            placeholder="Bạn muốn tìm gì?"
            className="bg-transparent focus:outline-none w-full text-[#40513B] placeholder-[#40513B]"
        />
    </div>
</div>
);}

export default SearchBar;