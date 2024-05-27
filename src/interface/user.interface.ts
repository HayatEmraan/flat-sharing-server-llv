export interface IUserLogin {
  emailOrUsername: string;
  password: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserProfileInfo {
  bio?: string;
  name: string;
  profession?: string;
  address: string;
  email?: string;
  photo?: string;
}

export interface IUserEncode {
  id: string;
  username: string;
  email: string;
  role: string;
  iat: string;
  exp: string;
}

export interface IUserChangePayload {
  role: string;
  isActive: string;
  id: string;
}
