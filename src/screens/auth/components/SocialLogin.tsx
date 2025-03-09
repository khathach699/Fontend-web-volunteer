import { Button } from "antd";
import React from "react";

const SocialLogin = ({
  providerName,
  logoUrl,
}: {
  providerName: string;
  logoUrl: string;
}) => {
  return (
    <Button
      style={{
        width: 360,
        height: 57,
        borderRadius: 50,
        border: "2px solid #ccc",
      }}
      size="large"
      icon={
        <img
          width={40}
          height={40}
          src={logoUrl}
          alt={`${providerName}-logo`}
        />
      }
    >
      Đăng nhập với {providerName}
    </Button>
  );
};

export default SocialLogin;
