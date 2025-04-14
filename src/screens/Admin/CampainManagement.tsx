import AvatarAdmin from "../auth/components/AvatarAdmin";
import "./CampaignManagement.css";
import CampaignTable from "./component/CampaignTable";
import WaitTable from "./component/WaitTable";

const CampainManagement = () => {
  return (
    <div>
      <div className="cm-header-container">
        <h1 className="cm-header-title">QUẢN LÝ CHIẾN DỊCH</h1>
        <div className="cm-header-avatar">
          <AvatarAdmin />
        </div>
      </div>

      <div className="cm-button-container">
        <button className="cm-button">XUẤT EXCEL</button>
      </div>

      <div className="cm-section-title">DANH SÁCH CHIẾN DỊCH</div>
      <CampaignTable />

      <div className="cm-button-container">
        <button className="cm-button cm-button-white">KHÔNG DUYỆT</button>
        <button className="cm-button">DUYỆT</button>
      </div>

      <div className="cm-section-title">CÁC CHIẾN DỊCH ĐANG CHỜ DUYỆT</div>
      <WaitTable />
    </div>
  );
};


export default CampainManagement;
