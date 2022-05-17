export interface NewUserType {
  name: string;
  login: string;
  password: string;
}
export interface CurUserType {
  login: string;
  password: string;
}
export interface TokenUserType {
  login: string;
  password: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
}
export interface IBoardDetails extends IBoard {
  columns: IColumn[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files?: [
    {
      filename: string;
      fileSize: number;
    }
  ];
}

export interface ICreateBoardRequestFields {
  title: string;
  description: string;
}
