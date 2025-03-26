import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { TaskStatus } from '../../types/task';

export type FilterOption = TaskStatus | 'all';

interface TaskFiltersProps {
  currentFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <View style={styles.container}>
      <Chip
        selected={currentFilter === 'all'}
        onPress={() => onFilterChange('all')}
        style={styles.chip}
      >
        All
      </Chip>
      <Chip
        selected={currentFilter === 'pending'}
        onPress={() => onFilterChange('pending')}
        style={styles.chip}
      >
        Pending
      </Chip>
      <Chip
        selected={currentFilter === 'completed'}
        onPress={() => onFilterChange('completed')}
        style={styles.chip}
      >
        Completed
      </Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  chip: {
    marginRight: 8,
  },
}); 