export interface IUser {
  id: string;
  name: string;
  login: string;
}

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
  columns: Array<IColumn>;
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

export interface ITaskDetail extends ITask {
  boardId: string;
  columnId: string;
  columnOrder: number;
}

export interface ITaskPut {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ITaskPutResponse extends ITaskPut {
  id: string;
  done: boolean;
}

export interface ICreateTask {
  title: string;
  description: string;
  userId: string;
}

export interface ICreateTaskResponse extends ICreateTask {
  taskId: string;
}

export interface ICreateBoardFields {
  title: string;
  description: string;
}

export interface ICreateColumnRequest {
  boardId: string;
  title: string;
}
