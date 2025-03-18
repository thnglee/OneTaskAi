import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardScreen() {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, {user?.email}</Text>
      <Text style={styles.placeholder}>Task list will appear here in Phase 2</Text>
      
      <Button 
        mode="outlined" 
        onPress={handleSignOut} 
        style={styles.button}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
  },
  placeholder: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 24,
  },
}); 