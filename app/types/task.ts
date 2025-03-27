import React from 'react';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number; // 0-3, where 0 is no priority
  due_date?: string;
  location?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
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