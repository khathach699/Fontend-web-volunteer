import { CSSProperties } from 'react';

interface Style {
  Btn: CSSProperties;
  followButton: CSSProperties;
  followButtonActive: CSSProperties;
  volunteerCountButton: CSSProperties;
  viewMoreButton: CSSProperties;
  Upfilebtn: CSSProperties;
  NotificationItem: CSSProperties;
}
const style: Style = {
    Btn: {
      width: "240px",
      height: "40px",
      cursor: "pointer",
      margin: "10px 0",
      borderRadius: "50px",
      border: "2px solid #609966",
      boxShadow: "0px 2px 5px rgba(152, 177, 141, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    followButton: {
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "12px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      transition: "transform 0.2s ease-in-out",
      cursor: "pointer",
    },
    followButtonActive: {
      backgroundColor: "#388E3C",
      transform: "scale(1.05)",
    },
    volunteerCountButton: {
      backgroundColor: "#fff",
      border: "1px solid #609966",
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "12px",
      color: "#4CAF50",
    },
    viewMoreButton: {
      backgroundColor: "#609966",
      border: "none",
      borderRadius: "20px",
      padding: "5px 15px",
      fontSize: "14px",
      color: "#fff",
      cursor: "pointer",
      marginTop: "10px",
      display: "block",
    },
    Upfilebtn: {
        backgroundColor: "#EDF1D6",
        border: "1px solid #609966",
        borderRadius: "10px",
        padding: "5px 15px",
        fontSize: "14px",
        color: "#000000",
        cursor: "pointer",
        marginTop: "10px",
        display: "block",
      },
    NotificationItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }
  };
export default style;