import React, { useState } from "react";
import "./WaitTable.css"; // <-- import CSS file

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
        <div className="wait-table-container">
            <div className="wait-table-header">
                <input
                    type="checkbox"
                    checked={selectedIds.length === orgsMock.length}
                    onChange={toggleSelectAll}
                />
                <span>Select all</span>
            </div>

            {orgsMock.map((org) => (
                <div key={org.id} className="wait-table-row">
                    <div className="wait-table-left">
                        <input
                            type="checkbox"
                            checked={isSelected(org.id)}
                            onChange={() => toggleSelect(org.id)}
                        />
                        <img
                            src={org.avatar}
                            alt="avatar"
                            className="wait-table-avatar"
                        />
                        <span className="wait-table-name">{org.name}</span>
                    </div>
                    <div className="wait-table-actions">
                        <button className="btn-white">KHÔNG DUYỆT</button>
                        <button className="btn-light-green">XEM</button>
                        <button className="btn-green">DUYỆT</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WaitTable;
