import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WaitTable.css";
import { toast } from "react-toastify";

type Org = {
  id: string;
  name: string;
  avatar: string;
  campaignName: string;
};

const WaitTable: React.FC = () => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/campaigns/getall?isAccepted=false"
        );
        console.log("API response:", response.data);

        if (response.data.success) {
          const fetchedOrgs: Org[] = response.data.data.campaigns.map(
            (camp: any) => ({
              id: camp._id,
              name: camp.organization.info,
              avatar: camp.img || "../src/assets/avatar.jpg",
              campaignName: camp.name,
            })
          );
          setOrgs(fetchedOrgs);
        } else {
          setError("Không thể tải dữ liệu chiến dịch");
        }
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError("Không thể kết nối đến server. Vui lòng thử lại");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Hàm duyệt chiến dịch
  const approveCampaign = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/campaigns/approve/${id}`
      );
      console.log("Approve response:", response.data);

      if (response.data.success) {
        toast.success("Duyệt thành công");

        setOrgs((prevOrgs) => prevOrgs.filter((org) => org.id !== id));

        setSelectedIds((prevIds) =>
          prevIds.filter((selectedId) => selectedId !== id)
        );
      } else {
        alert(`Lỗi: ${response.data.message || "Không thể duyệt chiến dịch"}`);
      }
    } catch (err: any) {
      toast.error("error");
      alert("Không thể kết nối đến server. Vui lòng thử lại");
    }
  };

  const rejectCampaign = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/campaigns/reject/${id}`
      );
      console.log("reject response:", response.data);

      if (response.data.success) {
        toast.success("Cập nhật thành công ");
        // Cập nhật UI ngay lập tức: Loại bỏ chiến dịch đã duyệt khỏi danh sách
        setOrgs((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
        // Cập nhật selectedIds: Loại bỏ ID đã duyệt
        setSelectedIds((prevIds) =>
          prevIds.filter((selectedId) => selectedId !== id)
        );
      } else {
        alert(`Lỗi: ${response.data.message || "Không thể duyệt chiến dịch"}`);
      }
    } catch (err: any) {
      alert("Không thể kết nối đến server. Vui lòng thử lại");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === orgs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orgs.map((org) => org.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="wait-table-container">
      <div className="wait-table-header">
        <div className="header-grid">
          <input
            type="checkbox"
            checked={selectedIds.length === orgs.length}
            onChange={toggleSelectAll}
          />
          <span>Select all</span>
          <span>Organization</span>
          <span>Campaign Name</span>
          <span>Actions</span>
        </div>
      </div>

      {orgs.map((org) => (
        <div key={org.id} className="wait-table-row">
          <div className="row-grid">
            <input
              type="checkbox"
              checked={isSelected(org.id)}
              onChange={() => toggleSelect(org.id)}
            />
            <img src={org.avatar} alt="avatar" className="wait-table-avatar" />
            <span className="wait-table-name">{org.name}</span>
            <span className="wait-table-campaign">{org.campaignName}</span>
            <div className="wait-table-actions">
              <button
                className="btn-white"
                onClick={() => rejectCampaign(org.id)}
              >
                KHÔNG DUYỆT
              </button>
              {/* <button className="btn-light-green">XEM</button> */}
              <button
                className="btn-green"
                onClick={() => approveCampaign(org.id)}
              >
                DUYỆT
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaitTable;
