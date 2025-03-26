import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Modal, Portal, TextInput, Button, Text, HelperText } from 'react-native-paper';
import { CreateTaskInput } from '../../types/task';

interface AddTaskModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (task: CreateTaskInput) => void;
}

export default function AddTaskModal({ visible, onDismiss, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority: parseInt(priority, 10),
      due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });

    resetForm();
    onDismiss();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('1');
    setDueDate('');
    setTags('');
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <ScrollView>
          <Text style={styles.title}>Add New Task</Text>
          
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Description (optional)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
          />

          <TextInput
            label="Priority (1-5)"
            value={priority}
            onChangeText={setPriority}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />
          <HelperText type="info">1 = Low priority, 5 = High priority</HelperText>

          <TextInput
            label="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
            mode="outlined"
            style={styles.input}
            placeholder="2024-03-20"
          />

          <TextInput
            label="Tags (comma-separated)"
            value={tags}
            onChangeText={setTags}
            mode="outlined"
            style={styles.input}
            placeholder="work, important, project"
          />

          <View style={styles.buttons}>
            <Button onPress={onDismiss} style={styles.button}>Cancel</Button>
            <Button 
              mode="contained" 
              onPress={handleSubmit}
              style={styles.button}
              disabled={!title.trim()}
            >
              Add Task
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
}); 