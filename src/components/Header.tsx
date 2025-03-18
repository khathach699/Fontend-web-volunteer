import { Button, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import logo from "/src/assets/logos/logo.png";
import avatar from "/src/assets/logos/avatar.png";
const HeaderComponent = () => {
  return (
    <Header
      style={{
        background: "#EDF1D6",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",

        zIndex: 1000,
      }}
    >
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <div className="logo">
          <img src={logo} alt="logo" style={{ height: "60px" }} />
        </div>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ background: "transparent", borderBottom: "none" }}
        >
          <Menu.Item key="1">Trang chủ</Menu.Item>
          <Menu.Item key="2">Hoạt động</Menu.Item>
          <Menu.Item key="3">Tình nguyện</Menu.Item>
          <Menu.Item key="4">Thông báo</Menu.Item>
        </Menu>
        <Button
          shape="circle"
          icon={<img src={avatar}></img>}
          style={{ position: "fixed", right: 50 }}
        ></Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
