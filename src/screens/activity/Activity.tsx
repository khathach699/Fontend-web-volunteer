import ButtonNew from "./component/ButtonNew";
import Post from "./component/post";
import { useState } from "react";
import HeaderComponent from "../../components/common/Header";
import NewPost from "./component/NewPost";
import "./Activity.css";
import Search from "./component/Search";

const Activity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="activity-container">
      <div className="header-wrapper">
        <HeaderComponent />
      </div>
      <div className="content-wrapper">
        <div className="controls">
          <div onClick={handleOpenModal}>
            <ButtonNew />
          </div>
          <div className="spacer"></div>
          <Search />
        </div>
        <div className="posts-wrapper">
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div>
        <img className="background-image bg-handshake" src="src/assets/backgrounds/handshake.png" alt="" />
        <img className="background-image bg-public" src="src/assets/backgrounds/public.png" alt="" />
        <img className="background-image bg-volunteer" src="src/assets/backgrounds/volunteer.png" alt="" />
      </div>

      <NewPost isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Activity;
