export interface NewUserType {
  name: string;
  login: string;
  password: string;
}
export interface TokenUserType {
  login: string;
  password: string;
}

export interface Board {
  id: string;
  title: string;
}

export interface ICreateBoardRequestFields {
  title: string;
  description: string;
}
