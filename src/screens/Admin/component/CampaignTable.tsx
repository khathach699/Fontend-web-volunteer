import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";
import "./CampaignTable.css";
import { toast } from "react-toastify";

type Camp = {
  id: string;
  avatar: string;
  campname: string;
  orgname: string;
  status: string;
};

const CampainTable: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Camp[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCampaignStatus = (
    start: string,
    numberOfDay: number,
    isAccepted: boolean
  ) => {
    if (isAccepted) {
      return "được duyệt";
    }

    const startDate = new Date(start);
    const endDate = new Date(
      startDate.getTime() + numberOfDay * 24 * 60 * 60 * 1000
    );
    const currentDate = new Date();

    if (currentDate >= startDate && currentDate <= endDate) {
      return "Đang diễn ra";
    }
    return "Đã kết thúc";
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/campaigns/getall?isAccepted=true"
        );
        console.log("API response:", response.data);

        if (response.data.success) {
          const fetchedCampaigns: Camp[] = response.data.data.campaigns.map(
            (camp: any) => ({
              id: camp._id,
              avatar: camp.img || "../src/assets/avatar.jpg",
              campname: camp.name,
              orgname: camp.organization.info,
              status: getCampaignStatus(
                camp.Start,
                camp.NumberOfDay,
                camp.IsAccepted
              ),
            })
          );
          setCampaigns(fetchedCampaigns);
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

  const deleteCampaigns = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/campaigns/${id}`
      );
      console.log("Delete response:", response.data);

      if (response.data.success) {
        toast.success("Xóa bài viết thành công");

        // Cập nhật danh sách chiến dịch
        setCampaigns((prev) => prev.filter((camp) => camp.id !== id));

        // Cập nhật danh sách lựa chọn
        setSelectedIds((prevIds) =>
          prevIds.filter((selectedId) => selectedId !== id)
        );
      } else {
        alert(`Lỗi: ${response.data.message || "Không thể xóa bài viết"}`);
      }
    } catch (err: any) {
      toast.error("Không thể kết nối đến server. Vui lòng thử lại");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === campaigns.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(campaigns.map((u) => u.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);
  const allSelected = selectedIds.length === campaigns.length;

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="campain-table-container">
      <div className="campain-table-header">
        <div className="header-grid">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleSelectAll}
          />
          <span>Select all</span>
          <span>Organization</span>
          <span>Campaign Name</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
      </div>

      {campaigns.map((camp) => (
        <div key={camp.id} className="campain-table-row">
          <div className="row-grid">
            <input
              type="checkbox"
              checked={isSelected(camp.id)}
              onChange={() => toggleSelectOne(camp.id)}
            />
            <img className="campain-avatar" src={camp.avatar} alt="avatar" />
            <span className="campain-orgname">{camp.orgname}</span>
            <span className="campain-campname">{camp.campname}</span>
            <span className="campain-status">{camp.status}</span>
            <div className="campain-table-icons">
              <CheckCircleOutline className="text-green-400" />
              <ErrorOutline
                className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                onClick={() => deleteCampaigns(camp.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampainTable;
