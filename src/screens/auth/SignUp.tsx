import { Button, Card, Form, Input, message, Typography } from "antd";
import { Link } from "react-router-dom";
import handAPI from "../../apis/handleAPI";
import { useState } from "react";

const SignUp = () => {
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleSignUp = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    fullname: string;
  }) => {
    console.log("Dữ liệu form:", values);
    const payload = {
      email: values.email,
      password: values.password,
      fullname: values.fullname,
    };
    console.log("Dữ liệu gửi đi:", payload);

    const api = "/auth/register";
    try {
      setIsLoading(true);
      const res = await handAPI(api, payload, "post");
      console.log("Phản hồi API:", res.data);
      message.success("Đăng ký thành công!");
      form.resetFields();
    } catch (error: unknown) {
      console.log("Lỗi:", error);
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Đã xảy ra lỗi không xác định!");
      }
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
        <Form
          layout="vertical"
          form={form}
          size="large"
          onFinish={handleSignUp}
        >
          <Form.Item
            name="email"
            label="Tài khoản"
            rules={[
              { required: true, message: "Email không được để trống!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
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

          <Form.Item
            name="fullname"
            label="Họ và tên"
            rules={[
              { required: true, message: "Họ và tên không được để trống!" },
            ]}
          >
            <Input
              maxLength={100}
              type="text"
              placeholder="Vui lòng nhập họ và tên!"
              style={{
                borderRadius: 50,
                border: "2px solid #609966",
                width: "100%",
                height: 60,
                paddingLeft: 15,
              }}
            />
          </Form.Item>

          <div className="mt-4 text-center">
            <Button
              loading={isLoading}
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
              ĐĂNG KÝ
            </Button>
          </div>
        </Form>

        <div className="row mt-2">
          <div className="col text-center">
            <Link to="/" style={{ color: "#000000", opacity: "0.4" }}>
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
