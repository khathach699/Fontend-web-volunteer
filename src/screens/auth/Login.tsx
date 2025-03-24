import { Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleAPI";
import { addAuth } from "../../reduxs/reducers/authReducer";
import { LoginResponse } from "../../types/auth";
import { toast } from "react-toastify";

const bg_login = "src/assets/backgrounds/bg_login.png";
const lg_fb = "src/assets/logos/fb.png";
const lg_google = "src/assets/logos/google.png";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await handleAPI<LoginResponse>("/auth/login", values, "post");
      console.log("Full response:", res);
      if (res && res.data) {
        const { token, _id, fullname } = res.data;
        dispatch(
          addAuth({
            token,
            _id,
            name: fullname,
            rule: 1,
          })
        );
        toast.success(res.message || "Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 1500,
          onClose: () => navigate("home"),
        });
        form.resetFields();
      } else {
        throw new Error("Phản hồi không hợp lệ từ máy chủ");
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Đăng nhập thất bại!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Login Error:", error);
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
              form={form}
              layout="vertical"
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
                    background: "#609966",
                    color: "white",
                  }}
                  size="large"
                >
                  ĐĂNG NHẬP
                </Button>
              </div>
            </Form>

            <Divider>HOẶC</Divider>

            <div className="mt-4 text-center">
              <SocialLogin logoUrl={lg_google} providerName="Google" />
            </div>
            <div className="mt-4 text-center">
              <SocialLogin logoUrl={lg_fb} providerName="Facebook" />
            </div>
          </Card>
        </div>

        {/* Cột hình ảnh */}
        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center"
          style={{ background: "#FFFFFF", height: "100%" }}
        >
          <img
            src={bg_login}
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
