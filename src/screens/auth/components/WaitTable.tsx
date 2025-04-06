
import React, { useState } from "react";

type Org = {
    id: number;
    name: string;
    avatar: string;
};

const orgsMock: Org[] = [
    {
        id: 1,
        name: "Tổ chức Beta",
        avatar: "../src/assets/avatar.jpg",
    },
    {
        id: 2,
        name: "Tổ chức Alpha",
        avatar: "../src/assets/avatar.jpg",
    },
];

const WaitTable: React.FC = () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelectAll = () => {
        if (selectedIds.length === orgsMock.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(orgsMock.map((org) => org.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isSelected = (id: number) => selectedIds.includes(id);

    return (
        <div className="w-100 mx-auto rounded-2xl overflow-hidden" style={{ border: "1px solid black" }}>
            <div className="flex items-center px-4 py-2 bg-white border-b">
                <input
                    type="checkbox"
                    checked={selectedIds.length === orgsMock.length}
                    onChange={toggleSelectAll}
                    className="mr-3 w-6 h-6"
                />
                <span className="text-green-700 font-medium">Select all</span>
            </div>

            {/* Rows */}
            {orgsMock.map((org) => (
                <div
                    key={org.id}
                    className="flex items-center justify-between px-4 py-2 border-b hover:bg-gray-50 bg-white"
                >
                    <div className="flex">
                        <input
                            type="checkbox"
                            checked={isSelected(org.id)}
                            onChange={() => toggleSelect(org.id)}
                            className="mr-3 w-6 h-6"
                        />
                        <img
                            src={org.avatar}
                            alt="avatar"
                            className="w-6 h-6 rounded-full mr-3"
                            style={{ border: "1px solid black" }}
                        />
                        <span className="w-48 font-medium text-gray-800">{org.name}</span>
                    </div>
                    <div>
                        <button className="px-3 py-1 rounded-full text-black hover:bg-[#7DA671] mr-2 bg-white" style={{ border: "1px solid black"}}>KHÔNG DUYỆT</button>
                        <button className="px-4 py-1 rounded-full text-black hover:bg-[#7DA671] mr-2" style={{ border: "1px solid black", backgroundColor: "#EDF1D6" }}>XEM</button>
                        <button className="px-4 py-1 rounded-full text-black hover:bg-[#7DA671] mr-2" style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}>DUYỆT</button>

                    </div>

                </div>
            ))}
        </div>
    );
};

export default WaitTable;
