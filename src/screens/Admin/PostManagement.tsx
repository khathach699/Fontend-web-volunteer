// import AvatarAdmin from "../auth/components/AvatarAdmin";
// import NoDeleteTable from "../auth/components/NoDeleteTable";
// import WaitTable from "../auth/components/WaitTable";

// const PostManagement = () => {
//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h2>QUẢN LÝ BÀI ĐĂNG</h2>
//         <div className="avatar-section">
//           <AvatarAdmin />
//         </div>
//       </div>

//       <div className="btn-group">
//         <button className="btn btn-export">XUẤT EXCEL</button>
//       </div>

//       <div className="section-title">DANH SÁCH BÀI ĐĂNG</div>
//       <NoDeleteTable />

//       <div className="btn-group">
//         <button className="btn btn-white">KHÔNG DUYỆT</button>
//         <button className="btn btn-approve">DUYỆT</button>
//       </div>

//       <div className="section-title">CÁC BÀI ĐĂNG ĐANG CHỜ DUYỆT</div>
//       <WaitTable />
//     </div>
//   );
// };

// export default PostManagement;

import React from "react";
import "./PostManagement.css";
import AvatarAdmin from "../auth/components/AvatarAdmin";
import NoDeleteTable from "../auth/components/NoDeleteTable";
import WaitTable from "../auth/components/WaitTable";

const PostManager: React.FC = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>QUẢN LÝ BÀI ĐĂNG</h2>
                <div className="avatar-section">
                    <AvatarAdmin />
                </div>
            </div>

            <div className="btn-group">
                <button className="btn btn-export">XUẤT EXCEL</button>
            </div>

            <div className="section-title">DANH SÁCH BÀI ĐĂNG</div>
            <NoDeleteTable />
            <br />

            <div className="om-approve-buttons">
                <div className="om-button-group">
                    <button className="om-button om-button-white">KHÔNG DUYỆT</button>
                    <button className="om-button">DUYỆT</button>
                </div>
            </div>

            <div className="section-title">CÁC BÀI ĐĂNG ĐANG CHỜ DUYỆT</div>
            <WaitTable />
        </div>
    );
};

export default PostManager;
