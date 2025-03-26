import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, Portal, Modal } from 'react-native-paper';
import { Task } from '../../types/task';
import FocusTimer from './FocusTimer';

interface FocusModeProps {
  task: Task;
  onComplete: (sessionDuration: number) => void;
  onClose: () => void;
}

export default function FocusMode({ task, onComplete, onClose }: FocusModeProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [duration, setDuration] = useState(25); // Default 25 minutes (Pomodoro)

  const handleComplete = () => {
    onComplete(duration);
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <Surface style={styles.container} elevation={4}>
          <Text variant="headlineMedium" style={styles.title}>
            Focus Mode
          </Text>
          <Text variant="titleMedium" style={styles.taskTitle}>
            {task.title}
          </Text>
          {task.description && (
            <Text variant="bodyMedium" style={styles.description}>
              {task.description}
            </Text>
          )}
          
          <View style={styles.timerContainer}>
            <FocusTimer
              duration={duration}
              onComplete={handleComplete}
              onCancel={onClose}
            />
          </View>

          <Text variant="bodySmall" style={styles.tip}>
            Stay focused and minimize distractions. You can do this! 💪
          </Text>
        </Surface>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  container: {
    padding: 24,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  taskTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
  },
  timerContainer: {
    marginVertical: 24,
  },
  tip: {
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.7,
  },
}); 