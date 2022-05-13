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
export interface BoardDetails extends Board {
  data: Column[];
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
