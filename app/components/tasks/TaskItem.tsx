import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, Chip } from 'react-native-paper';
import { Task, TaskStatus } from '../../types/task';
import FocusMode from '../focus/FocusMode';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [showFocusMode, setShowFocusMode] = useState(false);

  const toggleStatus = () => {
    onUpdate(task.id, {
      status: task.status === TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleFocusComplete = (sessionDuration: number) => {
    // Here you could update the task with focus session data
    setShowFocusMode(false);
  };

  return (
    <>
      <Card style={styles.card} mode="outlined">
        <Card.Content style={styles.content}>
          <View style={styles.taskInfo}>
            <IconButton
              icon={task.status === TaskStatus.COMPLETED ? 'checkbox-marked' : 'checkbox-blank-outline'}
              onPress={toggleStatus}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  task.status === TaskStatus.COMPLETED && styles.completedText,
                ]}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text style={styles.description} numberOfLines={2}>
                  {task.description}
                </Text>
              )}
              <View style={styles.metadata}>
                {task.due_date && (
                  <Chip icon="calendar" style={styles.chip}>
                    {formatDate(task.due_date)}
                  </Chip>
                )}
                <Chip icon="flag" style={styles.chip}>
                  Priority: {task.priority}
                </Chip>
                {task.tags?.map((tag) => (
                  <Chip key={tag} style={styles.chip}>
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.actions}>
            <IconButton 
              icon="timer" 
              onPress={() => setShowFocusMode(true)}
              disabled={task.status === TaskStatus.COMPLETED}
            />
            <IconButton icon="delete" onPress={() => onDelete(task.id)} />
          </View>
        </Card.Content>
      </Card>

      {showFocusMode && (
        <FocusMode
          task={task}
          onComplete={handleFocusComplete}
          onClose={() => setShowFocusMode(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 