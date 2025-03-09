import { Button, Card, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#EDF1D6",
        display: "flex",
        alignItems: "center",
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
          <Title level={2}>TẠO TÀI KHOẢN MỚI</Title>
        </div>
        <Form layout="vertical" form={form} size="large">
          <Form.Item
            name={"email"}
            label="Tài khoản"
            rules={[{ required: true, message: "Email không được để trông!" }]}
          >
            <Input
              allowClear
              maxLength={100}
              type="email"
              placeholder="Vui lòng nhập email!"
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
              { required: true, message: "Password không được để trông" },
            ]}
          >
            <Input
              maxLength={100}
              type="password"
              placeholder="Vui lòng nhập password!"
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
        <Form layout="vertical" form={form} size="large">
          <Form.Item
            name={"confirmPassword"}
            label="Nhập lại mật khẩu"
            rules={[
              { required: true, message: "Mật khẩu không được để trông!" },
            ]}
          >
            <Input
              allowClear
              maxLength={100}
              placeholder="Vui lòng Nhập lại mật khẩu!"
              type="password"
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
            name={"fullName"}
            label={"Họ và tên"}
            rules={[
              { required: true, message: "Họ và tên không được để trông!" },
            ]}
          >
            <Input
              maxLength={100}
              type="text"
              placeholder="Vui lòng Nhập Họ và tên!"
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
            ĐĂNG KÝ
          </Button>
        </div>

        <div className="row mt-2">
          <div className="col text-center">
            <Link to={"/"} style={{ color: "#000000", opacity: "0.4" }}>
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
