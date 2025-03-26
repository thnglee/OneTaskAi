import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { FocusSession, CreateFocusSessionInput, UpdateFocusSessionInput } from '../types/focus';
import { useAuth } from './useAuth';

export function useFocus() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = useCallback(async (input: CreateFocusSessionInput) => {
    if (!user) return null;
    
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('focus_sessions')
        .insert({
          ...input,
          user_id: user.id,
          start_time: new Date().toISOString(),
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data as FocusSession;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start focus session');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateSession = useCallback(async (sessionId: string, input: UpdateFocusSessionInput) => {
    if (!user) return null;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('focus_sessions')
        .update(input)
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as FocusSession;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update focus session');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const completeSession = useCallback(async (sessionId: string, notes?: string) => {
    return updateSession(sessionId, {
      completed: true,
      end_time: new Date().toISOString(),
      notes,
    });
  }, [updateSession]);

  const getSessionsByTask = useCallback(async (taskId: string) => {
    if (!user) return [];

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('focus_sessions')
        .select('*')
        .eq('task_id', taskId)
        .eq('user_id', user.id)
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data as FocusSession[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch focus sessions');
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    startSession,
    updateSession,
    completeSession,
    getSessionsByTask,
    loading,
    error,
  };
} 