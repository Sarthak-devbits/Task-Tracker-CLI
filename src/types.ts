export type commandType = 'list' | 'add' | 'update' | 'delete';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
