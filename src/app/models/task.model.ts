export interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
  createdAt: string;
}
