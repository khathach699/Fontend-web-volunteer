import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handAPI from "../../apis/handleAPI";

const Login = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const handleLogin = async (values: { email: string; password: string }) => {
    console.log(values);
    try {
      const res = await handAPI("/auth/register", values, "post");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-fluid p-0 m-0"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <div className="row g-0" style={{ height: "100%" }}>
        {/* Cột đăng nhập */}
        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center"
          style={{ background: "#EDF1D6", height: "100%" }}
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
              <Title level={2}>ĐĂNG NHẬP VỚI</Title>
            </div>
            <Form
              layout="vertical"
              form={form} // Gắn form instance
              size="large"
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  allowClear
                  placeholder="Vui lòng nhập email!"
                  maxLength={100}
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

              <Form.Item
                name="password"
                label="Mật Khẩu"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
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

              <div className="row">
                <div className="col text-right">
                  <Space size="middle">
                    <Link to="/signUp" style={{ color: "#609966" }}>
                      Đăng Ký?
                    </Link>
                    <Link to="/ForgotPassword" style={{ color: "#609966" }}>
                      Quên mật khẩu?
                    </Link>
                  </Space>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button
                  htmlType="submit"
                  style={{
                    width: "80%",
                    height: 60,
                    borderRadius: 50,
                    background: "#609966", // Sửa typo "##609966" thành "#609966"
                    color: "white", // Đổi màu chữ cho dễ đọc
                  }}
                  size="large"
                >
                  ĐĂNG NHẬP
                </Button>
              </div>
            </Form>

            <div className="mt-4">
              <Divider>HOẶC</Divider>
            </div>
            <div className="mt-4 text-center">
              <SocialLogin
                logoUrl="src/assets/logos/google.png"
                providerName="Google"
              />
            </div>
            <div className="mt-4 text-center">
              <SocialLogin
                logoUrl="src/assets/logos/fb.png"
                providerName="FaceBook"
              />
            </div>
          </Card>
        </div>

        {/* Cột hình ảnh */}
        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center"
          style={{ background: "#FFFFFF", height: "100%" }}
        >
          <img
            src="src/assets/backgrounds/bg_login.png"
            alt="Login Background"
            className="img-fluid"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
