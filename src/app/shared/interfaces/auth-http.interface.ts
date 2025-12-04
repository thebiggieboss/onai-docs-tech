export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string,
  user: IUserInfo
}

export interface IUserInfo {
  id: 1, name: 'Admin User',
  username: 'admin'
}
