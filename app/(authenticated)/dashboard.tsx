import { StyleSheet, View } from 'react-native';
import { Text, Button, FAB, Portal, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { useState, useMemo } from 'react';
import TaskList from '../components/tasks/TaskList';
import AddTaskModal from '../components/tasks/AddTaskModal';
import TaskFilters, { FilterOption } from '../components/tasks/TaskFilters';
import { useTasks } from '../hooks/useTasks';
import { CreateTaskInput } from '../types/task';

export default function DashboardScreen() {
  const { signOut, user } = useAuth();
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterOption>('all');

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddTask = async (input: CreateTaskInput) => {
    try {
      await createTask(input);
      setIsAddTaskVisible(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const filteredTasks = useMemo(() => {
    if (currentFilter === 'all') return tasks;
    return tasks.filter(task => task.status === currentFilter);
  }, [tasks, currentFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Button onPress={handleSignOut}>Sign Out</Button>
      </View>

      <TaskFilters
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
      </View>

      <AddTaskModal
        visible={isAddTaskVisible}
        onDismiss={() => setIsAddTaskVisible(false)}
        onSubmit={handleAddTask}
      />

      <Portal>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setIsAddTaskVisible(true)}
          label="Add Task"
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 