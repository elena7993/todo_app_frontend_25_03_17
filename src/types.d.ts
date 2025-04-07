export interface IUser {
  username: string;
  email: string;
  name: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ISignUp {
  username: string;
  email: string;
  name: string;
  password: string;
}

export interface ITodos {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  payload: string;
  date: string;
}

export interface ITodoEditVaild {
  id: number;
  title: string;
  payload: string;
  date: string;
}

export interface IEditProfile {
  name: string;
  email: string;
}

export interface IChangePassword {
  current_password: string;
  new_password: string;
}
