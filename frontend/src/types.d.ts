export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
}
export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  email: string;
  username: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
