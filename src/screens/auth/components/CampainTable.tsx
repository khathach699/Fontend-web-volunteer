import React, { useState } from "react";
import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";

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
        <div className=" rounded-2xl w-100 overflow-hidden" style={{ border: "1px solid black" }}>
            {/* Header */}
            <div className="flex items-center border-b px-4 py-2 bg-white">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="mr-3 w-6 h-6"
                />
                <span className="text-green-700 font-medium">Select all</span>
            </div>

            {/* Rows */}
            {mockCamps.map((camp) => (
                <div key={camp.id} className="flex items-center border-b px-4 py-2 hover:bg-gray-100 bg-white justify-between">
                    <div className="flex">
                        <input
                            type="checkbox"
                            checked={isSelected(camp.id)}
                            onChange={() => toggleSelectOne(camp.id)}
                            className="mr-3 w-6 h-6"
                        />
                        <img className="w-6 h-6 rounded-full mr-3" style={{ border: "1px solid black" }} src={camp.avatar} alt="avatar" />

                        <span className="mr-3 min-w-64">{camp.orgname}</span>
                        <span className="mr-3 min-w-64">{camp.campname}</span>
                        <span className="mr-3 min-w-32">{camp.status}</span>
                    </div>

                    {/* Icons */}
                    <div className="flex">
                        <CheckCircleOutline className="text-green-400 hover:text-green-300 cursor-pointer mx-1" />
                        <ErrorOutline className="text-yellow-400 hover:text-yellow-300 cursor-pointer mx-1" />

                    </div>

                    {/* Tooltip */}
                </div>
            ))}
        </div>
    );
};

export default CampainTable;
