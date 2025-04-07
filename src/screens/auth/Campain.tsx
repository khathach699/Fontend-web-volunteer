import { useState } from "react";
import NewPost from "./components/NewPost";

const Campain = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <div className="w-screen min-h-screen flex-col justify-center items-center bg-[#EDF1D6]">
            <div>
                <div className="w-screen h-20 bg-amber-50 justify-center z-10">header</div> {/*header tạm - xóa này đi*/}
                {/* <HeaderComponent /> */}
            </div>
            <div className="flex flex-col justify-center ">
                <div className="my-3 flex justify-center z-10">
                    <div onClick={handleOpenModal}>
                        chiến dịch mới
                    </div>
                    <div className="w-5"></div>
                </div>
                <div className=" flex flex-col items-center justify-center z-10" >
                    Camp
                </div>
            </div>
            <div>
                <img className="w-90 opacity-20 top-90 left-50 fixed" src="src/assets/backgrounds/handshake.png" alt="" />
                <img className="w-90 opacity-20 top-10 right-0 fixed" src="src/assets/backgrounds/public.png" alt="" />
                <img className="w-90 opacity-20 top-0 left-0 fixed" src="src/assets/backgrounds/volunteer.png" alt="" />
            </div>

            <NewPost isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Campain;