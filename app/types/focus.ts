export interface FocusSession {
  id: string;
  task_id: string;
  user_id: string;
  duration: number; // Duration in minutes
  start_time: string;
  end_time?: string;
  completed: boolean;
  notes?: string;
}

export interface CreateFocusSessionInput {
  task_id: string;
  duration: number;
  notes?: string;
}

export interface UpdateFocusSessionInput {
  end_time?: string;
  completed?: boolean;
  notes?: string;
} 