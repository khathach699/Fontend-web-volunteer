import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/header";
import ProfileSidebar from "./components/ProfileSidebar";
import style from "../../styles/style";

const ChangePassword = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [oldPassword, setOldPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [otp, setOtp] = useState('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Image uploaded:", file, "ID:", id);
        }
    };

    const handleSendOtp = () => {
        console.log('Gửi OTP...');
        
      };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("/api/change-password", {
                currentPassword,
                newPassword,
            });
            setSuccess("Password changed successfully");
        } catch (err) {
            setError("Failed to change password");
        }
    };
    return (
        <div style={{
            border: "2px solid #40513B",
            overflowY: "auto",
            paddingLeft: "100px",
            paddingRight: "100px",
            width: "100vw",
            height: "100vh",
            background: "#EDF1D6",
            fontFamily: "'Jura', sans-serif",
        }}>
            <Header isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
            <div className="row" style={{ padding: "20px", display: "flex", flexDirection: "row" }}>
                <ProfileSidebar organization={{ name: "Default Organization" }} handleImageUpload={handleImageUpload} style={style} />

                <div className="col-12 col-md-6" style={{ display: "flex", flexDirection: "column" }}>
                    <form onSubmit={handleSubmit}
                        style={{
                            border: "2px solid #40513B",
                            padding: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}>                        {/* Mật khẩu cũ */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Mật khẩu cũ
                            </label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Vui lòng nhập mật khẩu cũ"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    border: '2px solid #609966',
                                    backgroundColor: '#EDF1D6',
                                }}
                            />
                        </div>

                        {/* Mật khẩu mới */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Vui lòng nhập mật khẩu mới"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    border: '2px solid #609966',
                                    backgroundColor: '#EDF1D6',
                                }}
                            />
                        </div>

                        {/* Nhập lại mật khẩu mới */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Nhập lại mật khẩu mới
                            </label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Vui lòng nhập lại mật khẩu mới"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    border: '2px solid #609966',
                                    backgroundColor: '#EDF1D6',
                                }}
                            />
                        </div>

                        {/* Nút Gửi OTP */}
                        <div style={{ marginBottom: '20px' }}>
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                style={{
                                    backgroundColor: '#EDF1D6', // Màu xám nhạt
                                    border: '2px solid #609966',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    fontSize: '14px',
                                    color: '#333',
                                    cursor: 'pointer',
                                }}
                            >
                                Gửi OTP
                            </button>
                        </div>

                        {/* Nhập OTP */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                Nhập OTP:
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Nhập OTP"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '20px',
                                    border: '2px solid #609966',
                                    backgroundColor: '#EDF1D6',
                                }}
                            />
                        </div>

                        {/* Nút Đổi - Đẩy sang bên phải */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button type="submit" style={style.viewMoreButton}>
                                Đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ChangePassword;