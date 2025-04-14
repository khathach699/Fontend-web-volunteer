import { KeyboardArrowDown, Settings, Logout } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";
import "./AvatarAdmin.css"; // Import CSS file

const AvatarAdmin: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="avatar-admin-container"
            ref={dropdownRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            <img
                className="avatar-image"
                src="../src/assets/avatar.jpg"
                alt="avatar"
            />
            <KeyboardArrowDown />
            {isOpen && (
                <div className="avatar-dropdown">
                    <ul>
                        <li>
                            <span><Settings /></span>
                            Setting
                        </li>
                        <hr />
                        <li>
                            <span><Logout /></span>
                            Log out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AvatarAdmin;
