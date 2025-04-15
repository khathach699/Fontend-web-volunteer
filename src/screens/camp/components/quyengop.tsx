import React, { useState } from "react";

interface QuyengopProps {
  onClose: () => void;
  campaignId: string;
  onSubmit: (money: number, content: string, campaignId: string) => void;
}

const Quyengop: React.FC<QuyengopProps> = ({
  onClose,
  campaignId,
  onSubmit,
}) => {
  const [money, setMoney] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (money <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    try {
      await onSubmit(money, content, campaignId);
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi quyên góp:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Nhập số tiền */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            Nhập số tiền muốn quyên góp
          </label>
          <input
            type="number"
            value={money}
            onChange={(e) => setMoney(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
            placeholder="Nhập số tiền (VND)"
          />
        </div>

        {/* Nhập nội dung */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            Nhập nội dung
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
            placeholder="Nhập nội dung quyên góp"
          />
        </div>

        {/* Nút Hủy và Gửi */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "white",
              border: "1px solid #609966",
              borderRadius: "10px",
              padding: "5px 15px",
              fontSize: "14px",
              color: "#000000",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#609966",
              border: "none",
              borderRadius: "10px",
              padding: "5px 15px",
              fontSize: "14px",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quyengop;
