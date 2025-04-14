import { Search } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useState } from "react";
import SortForm from "./SortForm";

const SearchForCamp = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex w-full max-w-xl h-10 border-2 border-[#40513B] rounded-full bg-[#9DC08B] items-center px-3">
        <div className="flex items-center w-full">
          <Search
            className="text-[#40513B]"
            style={{ fontSize: 28, marginRight: 8 }}
          />
          <input
            type="text"
            placeholder="Bạn muốn tìm gì?"
            className="bg-transparent focus:outline-none w-full text-[#40513B] placeholder-[#40513B]"
          />
        </div>

        <button
          className="ml-2 text-[#000000] hover:text-[#EDF1D6] transition-all duration-200"
          onClick={() => setShowForm(true)}
        >
          <FormatListBulletedIcon style={{ fontSize: 28 }} />
        </button>
      </div>

      {/* MODAL */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowForm(false)}
        >
          <div
            style={{
              borderRadius: "10px",
              padding: "20px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SortForm
              onClose={() => setShowForm(false)}
              onSubmit={(channel, url) => {
                console.log("Submitted:", channel, url);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchForCamp;
