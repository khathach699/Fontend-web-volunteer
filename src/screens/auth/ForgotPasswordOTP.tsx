import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const ForgotPasswordOTP = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

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
            label="OTP"
            rules={[{ required: true, message: "OTP không được để trống!" }]}
          >
            <Input
              allowClear
              maxLength={100}
              placeholder="Vui lòng nhập OTP!"
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
