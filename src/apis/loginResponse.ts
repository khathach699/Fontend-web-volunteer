export interface User {
  _id: string;
  name: string;
  rule: number;
}

export interface LoginResponse {
  message: string;
  data?: {
    _id: string;
    email: string;
    fullname: string;
    token: string;
  };
}
