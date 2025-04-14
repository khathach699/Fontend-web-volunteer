import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import "./NewPost.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewPost: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [previews, setPreviews] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedFiles = Array.from(files);
            const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
            setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <img
                        src="https://www.w3schools.com/w3images/avatar6.png"
                        alt="Avatar"
                        className="modal-avatar"
                    />
                    <h2 className="modal-title">Tổ chức Alpha</h2>
                </div>
                <textarea
                    className="modal-textarea"
                    placeholder="Nhập nội dung ở đây..."
                />
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                />
                <div className="file-preview-container">
                    {previews.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Preview ${index}`}
                            className="image-preview"
                        />
                    ))}
                    <label htmlFor="file-upload" className="upload-label">
                        <Add className="text-black ml-5 mt-5" />
                    </label>
                </div>
                <div className="button-group">
                    <button onClick={onClose} className="button-close">ĐÓNG</button>
                    <button onClick={onClose} className="button-post">ĐĂNG BÀI</button>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
