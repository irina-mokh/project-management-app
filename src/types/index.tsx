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

export interface Board {
  id: string;
  title: string;
  description: string;
}
export interface BoardDetails extends Board {
  columns: Column[];
}

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Task {
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

export interface ICreateBoardFields {
  title: string;
  description: string;
}

export interface ICreateColumnRequest {
  boardId: string;
  requestBody: {
    title: string;
    order: number;
  };
}
