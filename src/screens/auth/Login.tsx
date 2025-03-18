import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const Login = () => {
  const { Title } = Typography;
  const [from] = Form.useForm();

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
            <Form layout="vertical" form={from} size="large">
              <Form.Item
                name={"email"}
                label="Email"
                rules={[
                  { required: true, message: "Email không được để trông!" },
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
                name={"password"}
                label={"Mật Khẩu"}
                rules={[
                  { required: true, message: "Password không được để trông!" },
                ]}
              >
                <Input.Password
                  maxLength={100}
                  // type="password"
                  placeholder="Vui lòng nhập Password!"
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

            <div className="row">
              <div className="col text-right">
                <Space size={"middle"}>
                  <Link to={"/signUp"} style={{ color: "#609966" }}>
                    Đăng Ký?
                  </Link>
                  <Link to={"/ForgotPassword"} style={{ color: "#609966" }}>
                    Quên mật khẩu?
                  </Link>
                </Space>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button
                style={{
                  width: "80%",
                  height: 60,
                  borderRadius: 50,
                  background: "##609966",
                  color: "black",
                }}
                size="large"
              >
                ĐĂNG NHẬP
              </Button>
            </div>
            <div className="mt-4 ">
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
