// src/types/auth.ts
export interface User {
  _id: string;
  name: string;
  rule: number;
}

// Định nghĩa kiểu cho toàn bộ phản hồi từ API login
export interface LoginResponse {
  message: string;
  data: {
    _id: string;
    email: string;
    fullname: string;
    token: string;
  };
}
