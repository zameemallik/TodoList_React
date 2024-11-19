export enum Status {
  未着手 = 0,
  進行中 = 1,
  完了 = 2,
}

export enum Importance {
  高 = 0,
  中 = 1,
  低 = 2,
}

export interface Todo {
  id: string;
  title: string;
  status: Status;
  detail: string;
  deadline: Date;
  importance: Importance;
}
