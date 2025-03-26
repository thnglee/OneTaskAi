import React from 'react';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

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
  priority?: number;
  due_date?: string;
  tags?: string[];
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: number;
  tags?: string[];
  searchQuery?: string;
}

// Default export for Expo Router
export default function TaskTypes() {
  return null;
} 