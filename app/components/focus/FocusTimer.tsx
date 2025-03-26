import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton, ProgressBar } from 'react-native-paper';

interface FocusTimerProps {
  duration: number; // Duration in minutes
  onComplete: () => void;
  onCancel: () => void;
}

export default function FocusTimer({ duration, onComplete, onCancel }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft / (duration * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, timeLeft, onComplete]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    onCancel();
  };

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.timer}>
        {formatTime(timeLeft)}
      </Text>
      <ProgressBar progress={progress} style={styles.progress} />
      <View style={styles.controls}>
        <IconButton
          icon={isPaused ? 'play' : 'pause'}
          size={32}
          onPress={handlePauseResume}
        />
        <IconButton
          icon="stop"
          size={32}
          onPress={handleStop}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progress: {
    width: '100%',
    height: 8,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
}); 