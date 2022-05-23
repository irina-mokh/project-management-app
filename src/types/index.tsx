export interface NewUserType {
  name: null | string;
  login: null | string;
  password: null | string;
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
  description: string;
  userId: string;
  files?: [
    {
      filename: string;
      fileSize: number;
    }
  ];
}

export interface ITaskPut {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ICreateBoardRequestFields {
  title: string;
  description: string;
}
