//import queryString from 'query-string';
import React, { useState } from 'react';
interface Donate {
    onClose: () => void;
    onSubmit: (channel: string, url: string) => void;
}

const Donate: React.FC<Donate> = ({ onClose, onSubmit }) => {
    const [channel] = useState('Facebook');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(channel, url);
        onClose();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                {/* Nhập tiền và nội dung quyên góp */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        Nhập số tiền muốn quyên góp
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        </div>
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                        Nhập Nội dung
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        </div>
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                        }}
                    />
                </div>

                {/* Nút Gửi và Hủy */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                        type="submit"
                        onClick={onClose}
                        style={{
                            backgroundColor: "white",
                            border: "1px solid #609966",
                            borderRadius: "10px",
                            padding: "5px 15px",
                            fontSize: "14px",
                            color: "#000000",
                            cursor: "pointer",
                            marginTop: "10px",
                            display: "block",
                        }}
                    >
                        Quyên góp
                    </button>
                    <button type="submit" style={{
                        backgroundColor: "white",
                        border: "1px solid #609966",
                        borderRadius: "10px",
                        padding: "5px 15px",
                        fontSize: "14px",
                        color: "#000000",
                        cursor: "pointer",
                        marginTop: "10px",
                        display: "block",
                    }}>
                        Gửi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Donate;