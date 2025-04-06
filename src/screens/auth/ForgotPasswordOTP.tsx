import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleAPI from "../../apis/handleAPI";
import { LoginResponse } from "../../types/auth";
import { toast } from "react-toastify";

const ForgotPasswordOTP = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordOTP = async (values: {
    otp: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const payload = {
        otp: values.otp,
        newPassword: values.password,
      };

      setIsLoading(true);
      const res = await handleAPI<LoginResponse>(
        "/auth/reset-password",
        payload,
        "post"
      );
      console.log("Full response:", res);
      toast.success(res.message || "Đổi mật khẩu thành công!", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => navigate("/"),
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const e = error as { message?: string };
        toast.error(e.message || "Có lỗi xảy ra");
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
        width: "100vw",
        height: "100vh",
        background: "#EDF1D6",
        display: "flex",

        justifyContent: "center",
      }}
    >
      <Card
        style={{
          background: "transparent",
          border: "none",
          boxShadow: "none",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <div className="text-center">
          <Divider>
            <Title level={2}>QUÊN MẬT KHẨU ?</Title>
          </Divider>
        </div>

        <div className="row mt-2 " style={{ marginBottom: "50px" }}>
          <div className="col text-center">
            <Link to={"/signUp"} style={{ color: "#000000", opacity: "0.4" }}>
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </div>
        <Form layout="vertical" form={form} size="large">
          <Form.Item
            name={"otp"}
            label="OTP"
            rules={[{ required: true, message: "OTP không được để trống!" }]}
          >
            <Input
              allowClear
              maxLength={6}
              placeholder="Vui lòng nhập OTP!"
              type="number"
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
            name="password"
            label="Mật Khẩu"
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
              placeholder="Vui lòng nhập mật khẩu!"
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
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              allowClear
              maxLength={100}
              placeholder="Vui lòng nhập lại mật khẩu!"
              style={{
                borderRadius: 50,
                border: "2px solid #609966",
                width: "100%",
                height: 60,
                paddingLeft: 15,
              }}
            />
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <Button
            loading={isLoading}
            onClick={() => handleForgotPasswordOTP(form.getFieldsValue())}
            style={{
              width: "80%",
              height: 60,
              borderRadius: 50,
              background: "#609966",
              color: "white",
            }}
            size="large"
          >
            Lấy lại mật khẩu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordOTP;
