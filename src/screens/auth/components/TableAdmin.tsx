import React, { useState } from "react";
import { Volunteer } from "../../../types/profile";
import { BackspaceOutlined, ErrorOutline, AssignmentTurnedInOutlined } from "@mui/icons-material";

interface Props {
    volunteers: Volunteer[];
    loading: boolean;
    error: string | null;
}

const TableAdmin: React.FC<Props> = ({ volunteers, loading, error }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!volunteers.length) return <div className="p-4">Không có tình nguyện viên nào.</div>;

    const toggleSelectAll = () => {
        if (selectedIds.length === volunteers.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(volunteers.map((u) => u._id));
        }
    };

    const toggleSelectOne = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isSelected = (id: string) => selectedIds.includes(id);
    const allSelected = selectedIds.length === volunteers.length;

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
            {volunteers.map((user) => (
                <div
                    key={user._id}
                    className="flex items-center border-b px-4 py-2 hover:bg-gray-100 bg-white"
                >
                    <input
                        type="checkbox"
                        checked={isSelected(user._id)}
                        onChange={() => toggleSelectOne(user._id)}
                        className="mr-3 w-6 h-6"
                    />
                    <img className="w-6 h-6 rounded-full mr-3" style={{ border: "1px solid black" }} src="../src/assets/avatar.jpg" alt="avatar" />

                    <span className="mr-3 w-48">{user.fullname}</span>
                    <span className="flex-1 text-gray-600">{user.email}</span>

                    {/* Icons */}
                    <AssignmentTurnedInOutlined className="text-green-400 hover:text-green-300 cursor-pointer mx-1" />
                    <ErrorOutline className="text-yellow-400 hover:text-yellow-300 cursor-pointer mx-1" />
                    <BackspaceOutlined className="text-red-400 hover:text-red-300 cursor-pointer mx-1" />

                    {/* Tooltip */}
                </div>
            ))}
        </div>
    );
};

export default TableAdmin;
