import React, { useState } from "react";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/common/Header";
import ProfileSidebar from "../auth/components/ProfileSidebar";
import style from "../../types/style";
import handleAPI from "../../apis/handleAPI";
import { toast } from "react-toastify";

// Define RootState type based on store
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

const ChangePassword = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.authReducer.data.token);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const decoded = jwtDecode<{ id: string }>(token);
      const userId = decoded.id;
      console.log("UserId" + userId);

      const payload = {
        userId: userId,
        oldPassword: values.password,
        newPassword: values.confirmPassword,
      };

      await handleAPI("/auth/resetPasswordNotOtp", payload, "post");
      toast.success("Đổi mật khẩu thành công!");
      form.resetFields();
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const e = error as { message?: string };
        toast.error(e.message || "Có lỗi xảy ra khi đổi mật khẩu");
        return;
      }
      toast.error("Đã xảy ra lỗi không xác định!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "2px solid #40513B",
        overflowY: "auto",
        paddingLeft: "100px",
        paddingRight: "100px",
        width: "100vw",
        height: "100vh",
        background: "#EDF1D6",
        fontFamily: "'Jura', sans-serif",
      }}
    >
      <Header
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <div
        className="row"
        style={{ padding: "20px", display: "flex", flexDirection: "row" }}
      >
        <ProfileSidebar
          organization={{ name: "Default Organization" }}
          handleImageUpload={(e, id) => {}}
          style={style}
        />

        <div
          className="col-12 col-md-6"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Form
            layout="vertical"
            form={form}
            size="large"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="password"
              label="Mật Khẩu Cũ"
              rules={[
                { required: true, message: "Mật khẩu không được để trống!" },
                {
                  validator: (_, value) =>
                    value && value.length >= 6
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Mật khẩu phải chứa ít nhất 6 ký tự!")
                        ),
                },
              ]}
            >
              <Input.Password
                maxLength={100}
                placeholder="Vui lòng nhập mật khẩu cũ!"
                style={{
                  borderRadius: 50,
                  border: "2px solid #609966",
                  width: "100%",
                  height: 60,
                  paddingLeft: 15,
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Mật Khẩu Mới"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu mới không được để trống!",
                },
                {
                  validator: (_, value) =>
                    value && value.length >= 6
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Mật khẩu phải chứa ít nhất 6 ký tự!")
                        ),
                },
              ]}
            >
              <Input.Password
                allowClear
                maxLength={100}
                placeholder="Vui lòng nhập mật khẩu mới!"
                style={{
                  borderRadius: 50,
                  border: "2px solid #609966",
                  width: "100%",
                  height: 60,
                  paddingLeft: 15,
                }}
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  backgroundColor: "#609966",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  width: "100%",
                  height: "60px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
