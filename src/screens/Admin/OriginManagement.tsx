import AvatarAdmin from "../auth/components/AvatarAdmin";
//import TableAdmin from "../auth/components/TableAdmin";
import WaitTable from "../auth/components/WaitTable";
import "./OriginManagement.css";
//import { jwtDecode } from "jwt-decode";


const OriginManagement = () => {
    // const [volunteerList, setVolunteerList] = useState<Volunteer[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // const token = useSelector((state: RootState) => state.authReducer.data.token);
    // const apiCalledRef = useRef(false);

    // const handleGetListOriganization = async () => {
    //     try {
    //         setLoading(true);
    //         const api = "/organizations";
    //         const decoded = jwtDecode<{ id: string }>(token);
    //         const id = decoded.id;

    //         const res = await handleAPI<



  return (
    <div>
        <div className="om-header-container">
            <h2 className="om-header-title">QUẢN LÝ TỔ CHỨC</h2>
            <div className="om-header-avatar">
                <AvatarAdmin />
            </div>
        </div>

        <div className="om-action-buttons">
            <div className="om-button-group">
                <button className="om-button">VÔ HIỆU</button>
                <button className="om-button">XÓA</button>
                <button className="om-button">XUẤT EXCEL</button>
            </div>
        </div>

        <div className="om-section-title">DANH SÁCH TỔ CHỨC</div>
        {/* <TableAdmin /> */}

        <br />

        <div className="om-approve-buttons">
            <div className="om-button-group">
                <button className="om-button om-button-white">KHÔNG CHẤP NHẬN</button>
                <button className="om-button">DUYỆT</button>
            </div>
        </div>

        <div className="om-section-title">CÁC TỔ CHỨC ĐANG CHỜ DUYỆT</div>
        <WaitTable />
    </div>
);
};

export default OriginManagement;
