export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserEncode {
  id: string;
  username: string;
  email: string;
  role: string;
  iat: string;
  exp: string;
}
