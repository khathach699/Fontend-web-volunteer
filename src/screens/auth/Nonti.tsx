import React, { useEffect, useState } from "react";
import { FaHeart, FaUpload, FaBell, FaTrash, FaEllipsisV } from 'react-icons/fa';
import axios from "axios";
import Header from "./components/header";

interface NotificationItem {
    id: number;
    icon: string;
    title: string;
}

const Nonti: React.FC = () => {

    const notifications: NotificationItem[] = [
        { id: 1, icon: 'heart', title: 'Bận vừa có một lượt thích mới' },
        { id: 2, icon: 'upload', title: 'Nguồn dữ liệu chia sẻ đã bị việt cược bạn' },
        { id: 3, icon: 'heart', title: 'Nguồn dữ liệu vừa theo dõi bạn' },
        { id: 4, icon: 'bell', title: 'Bài đăng của bạn không được duyệt' },
        { id: 5, icon: 'bell', title: 'Một tình nguyện viên đã tham gia' },
    ];
    const renderIcon = (icon: string) => {
        switch (icon) {
            case 'heart':
                return <FaHeart style={{ color: '#ff4d4f' }} />;
            case 'upload':
                return <FaUpload style={{ color: '#666' }} />;
            case 'bell':
                return <FaBell style={{ color: '#666' }} />;
            default:
                return <FaBell style={{ color: '#666' }} />;
        }
    };


    // Xử lý khi nhấn nút Xóa
    const handleDelete = (id: number) => {
        console.log(`Xóa mục với ID: ${id}`);
        // Thêm logic xóa (ví dụ: gọi API hoặc cập nhật state)
    };

    // Xử lý khi nhấn nút Menu
    const handleMenu = (id: number) => {
        console.log(`Mở menu cho mục với ID: ${id}`);
        // Thêm logic mở menu (ví dụ: hiển thị dropdown)
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [filterType, setFilterType] = useState<string>('all');

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
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px', fontSize: '20px', color: '#40513B', fontWeight: 'bold' }}>Lọc thông báo:</label>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{
                            padding: '5px 10px',
                            borderRadius: '20px',
                            border: '1px solid #40513B',
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="all">Tất cả</option>
                        <option value="heart">Lượt thích</option>
                        <option value="upload">Tải lên</option>
                        <option value="bell">Thông báo khác</option>
                    </select>
                </div>
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            padding: '10px',
                            marginBottom: '10px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div style={{ marginRight: '10px', fontSize: '20px' }}>
                            {renderIcon(notification.icon)}
                        </div>
                        <div style={{ flex: 1 }}>{notification.title}</div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => handleDelete(notification.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#ff4d4f',
                                    fontSize: '16px',
                                }}
                            >
                                <FaTrash />
                            </button>
                            <button
                                onClick={() => handleMenu(notification.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#666',
                                    fontSize: '16px',
                                }}
                            >
                                <FaEllipsisV />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nonti;