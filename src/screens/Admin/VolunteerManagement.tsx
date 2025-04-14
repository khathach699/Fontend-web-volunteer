import AvatarAdmin from "../auth/components/AvatarAdmin";
import TableAdmin from "../auth/components/TableAdmin";
import "./VolunteerManagement.css";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import handleAPI from "../../apis/handleAPI";
import { Volunteer, ListVolunteerResponse } from "../../types/profile";
import { useSelector } from "react-redux";

type RootState = {
    authReducer: {
      data: {
        token: string;
        _id: string;
        name: string;
        rule: number;
      };
    };
  };

const VolunteerManagement = () => {

    const [volunteerList, setVolunteerList] = useState<Volunteer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.authReducer.data.token);
    const apiCalledRef = useRef(false);

    // const handleGetListVolunteer = async () => {
    //     try {
    //         setLoading(true);
    //         const api = "/users";
    //         const decoded = jwtDecode<{ id: string }>(token);
    //         const id = decoded.id;

    //         const res = await handleAPI<ListVolunteerResponse>(api, { id: id }, "get");
    //         if (res.success && res.data.users) {
    //             setVolunteerList(res.data.users);
    //         }
    //         else {
    //             console.log("Response from handleAPI:", res);
    //             setError("Failed to load profile data 1");
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //         setError("Failed to load profile data 2");
    //     }
    // };

    const handleGetListVolunteer = async (page = 1) => {
        try {
          setLoading(true);
          const api = "/users";
          const decoded = jwtDecode<{ id: string }>(token);
          const id = decoded.id;
      
          const res = await handleAPI<ListVolunteerResponse>(api, { id: id, page }, "get");
          console.log("API response:", res);
      
          if (res.success && res.data.result.users) {
            setVolunteerList(res.data.result.users);
          } else {
            console.warn("API response missing users:", res);
            setError("Failed to load profile data 1");
          }
        } catch (error) {
          console.error("handleAPI error:", error);
          setError("Failed to load profile data 2");
        } finally {
          setLoading(false);
        }
      };
      

      useEffect(() => {
        if (token && !apiCalledRef.current) {
          apiCalledRef.current = true;
          handleGetListVolunteer();
        }
      }, [token]);

    return (
        <div>
            <div className="vm-header-container">
                <h2 className="vm-header-title">QUẢN LÝ TÌNH NGUYỆN VIÊN</h2>
                <div className="vm-header-avatar">
                    <AvatarAdmin />
                </div>
            </div>

            <div className="vm-action-buttons">
                <div className="vm-button-group">
                    <button className="vm-button">VÔ HIỆU</button>
                    <button className="vm-button">XÓA</button>
                    <button className="vm-button">XUẤT EXCEL</button>
                </div>
            </div>

            <div className="vm-list-title">DANH SÁCH TÌNH NGUYỆN VIÊN</div>

            <TableAdmin volunteers={volunteerList} loading={loading} error={error} />
        </div>
    );
};

export default VolunteerManagement;

