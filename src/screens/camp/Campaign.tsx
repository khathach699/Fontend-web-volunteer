import { useState } from "react";
import ButtonNewForCamp from "./components/ButtonNewForCamp";
import SearchForCamp from "./components/SearchForCamp";
import NewCamp from "./components/NewCamp";
import Camp from "./components/Camp";
import HeaderComponent from "../../components/common/Header";
const Campain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="w-screen min-h-screen flex-col justify-center items-center bg-[#EDF1D6]">
      <div>
        <HeaderComponent />
      </div>
      <div className="flex flex-col justify-center ">
        <div className="my-3 flex justify-center z-10">
          <div onClick={handleOpenModal}>
            <ButtonNewForCamp />
          </div>
          <div className="w-5"></div>
          <SearchForCamp />
        </div>
        <div className=" flex flex-col items-center justify-center z-10">
          <Camp />
          <Camp />
        </div>
      </div>
      <div>
        <img
          className="w-90 opacity-20 top-90 left-50 fixed"
          src="src/assets/backgrounds/handshake.png"
          alt=""
        />
        <img
          className="w-90 opacity-20 top-40 right-0 fixed"
          src="src/assets/backgrounds/public.png"
          alt=""
        />
        <img
          className="w-90 opacity-20 top-0 left-0 fixed"
          src="src/assets/backgrounds/volunteer.png"
          alt=""
        />
      </div>

      <NewCamp isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Campain;
