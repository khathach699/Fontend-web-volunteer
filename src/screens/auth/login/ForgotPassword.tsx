import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse } from "../../../apis/loginResponse";
import handleAPI from "../../../apis/handleAPI";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (values: { email: string }) => {
    const payload = {
      email: values.email,
    };
    console.log(payload);
    const api = "/auth/forgot-password";
    try {
      setIsLoading(true);
      await handleAPI<LoginResponse>(api, payload, "post");
      form.resetFields();
      toast.success("Email đã được gửi đến bạn!");
      navigate("/ForgotPasswordOTP");
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

        <div className="row mt-2 " style={{ marginBottom: "100px" }}>
          <div className="col text-center">
            <Link to={"/signUp"} style={{ color: "#000000", opacity: "0.4" }}>
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </div>
        <Form layout="vertical" form={form} size="large">
          <Form.Item
            name={"email"}
            label="Nhập Email"
            rules={[{ required: true, message: "Email không được để trống" }]}
          >
            <Input
              allowClear
              maxLength={100}
              placeholder="Vui lòng nhập email!"
              type="email"
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
            onClick={() => handleForgotPassword(form.getFieldsValue())}
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

export default ForgotPassword;
