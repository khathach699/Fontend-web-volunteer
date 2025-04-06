import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";
import { Settings, Logout } from "@mui/icons-material";

const AvatarAdmin: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    // Xử lý click bên ngoài để ẩn combobox
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
  
    return(
        <div className="flex items-center" ref={dropdownRef} onClick={()=> setIsOpen(!isOpen)}>
            <img className="w-[40px] h-[40px] rounded-full " style={{border: "1px solid black"}} src="../src/assets/avatar.jpg" alt="avatar" />
            <KeyboardArrowDown/>
            {
                isOpen && (
                    <div className="absolute bg-white border-2 border-black rounded-lg shadow-lg w-[200px] -m-25 p-1">
                        <ul className="m-1">
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><span className="px-2"><Settings></Settings></span>Setting</li>
                            <hr className="border-t border-black-300 mx-4" />
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"><span className="px-2"><Logout></Logout></span>Log out</li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
};

export default AvatarAdmin;