// components/Modal.tsx
import { useState } from "react";

import React from "react";
import { Add } from "@mui/icons-material";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewPost: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    // const [file, setFile] = useState<File | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    if (!isOpen) return null;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedFiles = Array.from(files);
            const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

            // Cộng dồn ảnh mới với ảnh cũ
            setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
        }
    };
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/5 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex items-center m-0">
                    <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" className="rounded-full  w-12" />
                    <h2 className="text-sm font-bold m-2">Tổ chức Alpha</h2>
                </div>
                <textarea
                    className="w-full h-32 p-2 focus:outline-none"
                    placeholder="Nhập nội dung ở đây..."
                />
                <input id="file-upload" type="file" accept="image/*" className="hidden" multiple onChange={handleFileChange} />
                <div className="flex flex-wrap gap-4 mt-4">
                    {previews.map((url, index) => (
                        <img key={index} src={url} alt={`Preview ${index}`} className="w-32 h-32 object-cover shadow" style={{ border: "1px solid black", borderRadius: 20 }} />
                    ))}
                    <label htmlFor="file-upload" className=" flex justify-center items-center cursor-pointer w-32 h-32 bg-[#EDF1D6]" style={{ border: "1px solid black", borderRadius: 20 }}>
                        <Add className="text-black ml-5 mt-5" />
                    </label>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className=" text-black px-4 py-2  mr-3 bg-white" style={{ border: "1px solid black", borderRadius: 30 }}>ĐÓNG</button>
                    <button onClick={onClose} className=" text-black px-4 py-2  mr-3" style={{ border: "1px solid black", backgroundColor: "#9DC08B", borderRadius: 30 }}>ĐĂNG BÀI</button>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
