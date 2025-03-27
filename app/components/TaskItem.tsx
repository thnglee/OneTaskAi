import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onPress: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onPress,
}) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 1:
        return '#ff4d4f';
      case 2:
        return '#ffa940';
      case 3:
        return '#1890ff';
      default:
        return '#8c8c8c';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(task.id)}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
        onPress={() => onToggleComplete(task.id)}
      >
        {task.completed && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              task.completed && styles.completedText,
            ]}
          >
            {task.title}
          </Text>
          {task.priority > 0 && (
            <View
              style={[
                styles.priorityIndicator,
                { backgroundColor: getPriorityColor() },
              ]}
            />
          )}
        </View>
        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}
        <View style={styles.metaContainer}>
          {task.due_date && (
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#8c8c8c" />
              <Text style={styles.metaText}>{task.due_date}</Text>
            </View>
          )}
          {task.location && (
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color="#8c8c8c" />
              <Text style={styles.metaText}>{task.location}</Text>
            </View>
          )}
          {task.tags && task.tags.length > 0 && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{task.tags[0]}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#52c41a',
    borderColor: '#52c41a',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#262626',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8c8c8c',
  },
  description: {
    fontSize: 14,
    color: '#595959',
    marginBottom: 8,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#8c8c8c',
    marginLeft: 4,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#595959',
  },
}); 