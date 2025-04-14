// components/Modal.tsx
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";

// Định nghĩa RootState dựa trên store của bạn
interface RootState {
  authReducer: {
    data: {
      token: string;
      _id: string;
      name: string;
      rule: number;
    };
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCamp: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lấy token từ Redux store
  const token = useSelector((state: RootState) => state.authReducer.data.token);
  console.log("Token from Redux:", token); // Debug để kiểm tra token

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    // Kiểm tra token từ Redux store
    if (!token) {
      alert("Bạn cần đăng nhập để tạo chiến dịch mới!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", content || "day la mot chien dich moi");
    files.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("NumberOfDay", "30");
    formData.append("Start", "2025-04-14");
    formData.append("state", "67f3bb0a52576fbb4918c7b9");
    formData.append("organization", "67e91b83d8a27859960ea047");

    try {
      const response = await fetch("http://localhost:3001/campaigns/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Chiến dịch được tạo thành công:", result);
        toast.success("Tạo chiến dịch thành công!");
        onClose(); // Đóng modal sau khi thành công
      } else if (response.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("authData");
        // Redirect người dùng đến trang đăng nhập ở đây (nếu cần)
      } else {
        console.error("Lỗi khi tạo chiến dịch:", response.statusText);
        toast.error("Có lỗi xảy ra khi tạo chiến dịch. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      toast.error("Lỗi kết nối. Vui lòng kiểm tra lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/5 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex items-center m-0">
          <img
            src="https://www.w3schools.com/w3images/avatar6.png"
            alt="Avatar"
            className="rounded-full w-12"
          />
          <h2 className="text-sm font-bold m-2">Tổ chức Alpha</h2>
        </div>
        <textarea
          className="w-full h-32 p-2 focus:outline-none"
          placeholder="Nhập nội dung ở đây..."
          value={content}
          onChange={handleContentChange}
        />
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {previews.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover shadow"
              style={{ border: "1px solid black", borderRadius: 20 }}
            />
          ))}
          <label
            htmlFor="file-upload"
            className="flex justify-center items-center cursor-pointer w-32 h-32 bg-[#EDF1D6]"
            style={{ border: "1px solid black", borderRadius: 20 }}
          >
            <Add className="text-black ml-5 mt-5" />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-black px-4 py-2 mr-3 bg-white"
            style={{ border: "1px solid black", borderRadius: 30 }}
            disabled={isLoading}
          >
            ĐÓNG
          </button>
          <button
            onClick={handleSubmit}
            className="text-black px-4 py-2 mr-3"
            style={{
              border: "1px solid black",
              backgroundColor: "#9DC08B",
              borderRadius: 30,
              opacity: isLoading ? 0.6 : 1,
            }}
            disabled={isLoading}
          >
            {isLoading ? "ĐANG GỬI..." : "ĐĂNG BÀI"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCamp;
