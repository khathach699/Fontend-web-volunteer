import AvatarAdmin from "../auth/components/AvatarAdmin";
import "./Statistics.css";

const Statistics = () =>{
    return (
        <div>
            <div className="statistics-header-container">
                <h2 className="statistics-header-title">THỐNG KÊ</h2>
                <div className="statistics-header-avatar">
                    <AvatarAdmin />
                </div>
            </div>
        </div>
    );
}

export default Statistics;
