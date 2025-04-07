import React, { useState } from "react";
import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";

type Camp = {
    id: number;
    name: string;
};

const mockUsers: Camp[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: "Chiến dịch tháng 3",
}));

const CampainTable: React.FC = () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelectAll = () => {
        if (selectedIds.length === mockUsers.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(mockUsers.map((u) => u.id));
        }
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isSelected = (id: number) => selectedIds.includes(id);
    const allSelected = selectedIds.length === mockUsers.length;

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

            {/* User Rows */}
            {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center border-b px-4 py-2 hover:bg-gray-100 bg-white justify-between">
                    <div className="flex">
                    <input
                        type="checkbox"
                        checked={isSelected(user.id)}
                        onChange={() => toggleSelectOne(user.id)}
                        className="mr-3 w-6 h-6"
                    />
                    <img className="w-6 h-6 rounded-full mr-3" style={{ border: "1px solid black" }} src="../src/assets/avatar.jpg" alt="avatar" />

                    <span className="mr-3 w-24">{user.name}</span>

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
