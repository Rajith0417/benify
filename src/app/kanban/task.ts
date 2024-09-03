export interface Task {
  id: number;
  description: string;
  status: 'To Do' | 'Implementing' | 'Done';
}
