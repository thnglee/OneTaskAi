import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Task, CreateTaskInput, TaskStatus } from '../types/task';
import { useAuth } from './useAuth';

interface TaskError extends Error {
  code?: string;
  details?: string;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const taskCache = new Map<string, CacheItem<Task[]>>();

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TaskError | null>(null);
  const { user } = useAuth();

  const getCachedTasks = useCallback((userId: string): Task[] | null => {
    const cached = taskCache.get(userId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []);

  const setCachedTasks = useCallback((userId: string, tasks: Task[]) => {
    taskCache.set(userId, {
      data: tasks,
      timestamp: Date.now(),
    });
  }, []);

  const fetchTasks = useCallback(async (force = false) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Check cache first if not forcing refresh
      if (!force) {
        const cachedData = getCachedTasks(user.id);
        if (cachedData) {
          setTasks(cachedData);
          setLoading(false);
          return;
        }
      }

      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const fetchedTasks = data || [];
      setTasks(fetchedTasks);
      setCachedTasks(user.id, fetchedTasks);
    } catch (err: unknown) {
      const taskError: TaskError = err instanceof Error ? err : new Error('An unknown error occurred');
      if (err instanceof Error) {
        taskError.code = 'FETCH_ERROR';
        taskError.details = err.message;
      }
      setError(taskError);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, getCachedTasks, setCachedTasks]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const createTask = async (input: CreateTaskInput): Promise<Task> => {
    try {
      setError(null);

      const newTask = {
        ...input,
        user_id: user?.id,
        status: TaskStatus.PENDING,
        priority: input.priority || 1,
        tags: input.tags || [],
        ai_priority_score: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error: createError } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (createError) {
        throw new Error(createError.message);
      }

      if (!data) {
        throw new Error('Failed to create task: No data returned');
      }

      setTasks((current) => [data, ...current]);
      setCachedTasks(user?.id || '', [data, ...tasks]);
      
      return data;
    } catch (err: unknown) {
      const taskError: TaskError = err instanceof Error ? err : new Error('Failed to create task');
      taskError.code = 'CREATE_ERROR';
      if (err instanceof Error) {
        taskError.details = err.message;
      }
      setError(taskError);
      console.error('Error creating task:', err);
      throw taskError;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', taskId)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      if (!data) {
        throw new Error('Failed to update task: No data returned');
      }

      const updatedTasks = tasks.map((task) => (task.id === taskId ? data : task));
      setTasks(updatedTasks);
      setCachedTasks(user?.id || '', updatedTasks);

      return data;
    } catch (err: unknown) {
      const taskError: TaskError = err instanceof Error ? err : new Error('Failed to update task');
      taskError.code = 'UPDATE_ERROR';
      if (err instanceof Error) {
        taskError.details = err.message;
      }
      setError(taskError);
      console.error('Error updating task:', err);
      throw taskError;
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user?.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      setCachedTasks(user?.id || '', updatedTasks);
    } catch (err: unknown) {
      const taskError: TaskError = err instanceof Error ? err : new Error('Failed to delete task');
      taskError.code = 'DELETE_ERROR';
      if (err instanceof Error) {
        taskError.details = err.message;
      }
      setError(taskError);
      console.error('Error deleting task:', err);
      throw taskError;
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: () => fetchTasks(true),
  };
}

export default useTasks; 