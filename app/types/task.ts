export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  priority: number;
  status: TaskStatus;
  due_date?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  ai_priority_score?: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: number;
  due_date?: string;
  tags?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: number;
  status?: TaskStatus;
  due_date?: string;
  tags?: string[];
}

export default {
  TaskStatus: 'TaskStatus',
  Task: 'Task',
  CreateTaskInput: 'CreateTaskInput',
  UpdateTaskInput: 'UpdateTaskInput',
}; 