import AvatarAdmin from "../auth/components/AvatarAdmin";
import TableAdmin from "../auth/components/TableAdmin";
import "./VolunteerManagement.css";
import { useState, useEffect, useRef } from "react";
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

  const handleGetListVolunteer = async () => {
    try {
      setLoading(true);
      const api = "/users?limit=50";
      const res = await handleAPI<ListVolunteerResponse>(api, { page: 1, limit: 50 }, "get");
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

  // const handleDeleteVolunteer = async (id: string) => {
  //   try {
  //     setLoading(true);
  //     const api = `/users/${id}`;
  //     const res = await handleAPI(api, {}, "delete");
  //     console.log("Delete API response:", res);

  //     if (res.success) {
  //       setVolunteerList((prevList) => prevList.filter((volunteer) => volunteer._id !== id));
  //     } else {
  //       console.warn("Delete API response error:", res);
  //       setError("Failed to delete volunteer");
  //     }

  //   }catch (error) {
  //     console.error("handleDeleteVolunteer error:", error);
  //   }
  // };

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

