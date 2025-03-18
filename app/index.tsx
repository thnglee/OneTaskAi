import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Replace with your actual logo */}
        <Text style={styles.logo}>OneTask AI</Text>
      </View>
      
      <Text style={styles.tagline}>Stay focused, one task at a time!</Text>
      
      <View style={styles.buttonContainer}>
        <Link href="/sign-up" asChild>
          <Button 
            mode="contained" 
            style={styles.button}
          >
            Sign Up
          </Button>
        </Link>
        
        <Link href="/sign-in" asChild>
          <Button 
            mode="outlined" 
            style={[styles.button, { marginTop: 16 }]}
          >
            Log In
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
}); 