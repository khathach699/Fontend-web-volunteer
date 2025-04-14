import React, { useState } from "react";
import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";
import "./CampaignTable.css";
type Camp = {
    id: number;
    avatar: string;
    campname: string;
    orgname: string;
    status: string;
};

const mockCamps: Camp[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    campname: "Chiến dịch tháng 3",
    avatar: "../src/assets/avatar.jpg",
    orgname: "Tổ chức A",
    status: "Đang diễn ra",
}));

const CampainTable: React.FC = () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelectAll = () => {
        if (selectedIds.length === mockCamps.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(mockCamps.map((u) => u.id));
        }
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isSelected = (id: number) => selectedIds.includes(id);
    const allSelected = selectedIds.length === mockCamps.length;

    return (
        <div className="campain-table-container">
            <div className="campain-table-header">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                />
                <span>Select all</span>
            </div>

            {mockCamps.map((camp) => (
                <div key={camp.id} className="campain-table-row">
                    <div className="campain-table-left">
                        <input
                            type="checkbox"
                            checked={isSelected(camp.id)}
                            onChange={() => toggleSelectOne(camp.id)}
                        />
                        <img
                            className="campain-avatar"
                            src={camp.avatar}
                            alt="avatar"
                        />
                        <span className="campain-orgname">{camp.orgname}</span>
                        <span className="campain-campname">{camp.campname}</span>
                        <span className="campain-status">{camp.status}</span>
                    </div>

                    <div className="campain-table-icons">
                        <CheckCircleOutline className="text-green-400" />
                        <ErrorOutline className="text-yellow-400" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampainTable;
