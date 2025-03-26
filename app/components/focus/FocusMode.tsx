import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AppState, Platform } from 'react-native';
import { Surface, Text, Button, Portal, Modal } from 'react-native-paper';
import { Task } from '../../types/task';
import FocusTimer from './FocusTimer';
import * as Notifications from 'expo-notifications';

interface FocusModeProps {
  task: Task;
  onComplete: (sessionDuration: number) => void;
  onClose: () => void;
}

export default function FocusMode({ task, onComplete, onClose }: FocusModeProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [duration, setDuration] = useState(25); // Default 25 minutes (Pomodoro)
  const [appState, setAppState] = useState(AppState.currentState);

  // Function to disable notifications
  const disableNotifications = async () => {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };

  // Function to enable notifications
  const enableNotifications = async () => {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  useEffect(() => {
    // Request notification permissions and disable notifications immediately
    const setupNotifications = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get notification permissions');
        return;
      }

      // Disable notifications immediately when focus mode starts
      await disableNotifications();
    };

    setupNotifications();

    // Handle app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App came to foreground, keep notifications disabled
        disableNotifications();
      } else if (nextAppState.match(/inactive|background/)) {
        // App went to background, keep notifications disabled
        disableNotifications();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
      // Re-enable notifications when component unmounts
      enableNotifications();
    };
  }, [appState]);

  const handleComplete = () => {
    // Re-enable notifications before completing
    enableNotifications();
    onComplete(duration);
  };

  const handleClose = () => {
    // Re-enable notifications before closing
    enableNotifications();
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={handleClose}
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
              onCancel={handleClose}
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