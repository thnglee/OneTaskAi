import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from './hooks/useAuth';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  return errors;
};

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateForm = () => {
    let isValid = true;
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    const pwdErrors = validatePassword(password);
    setPasswordErrors(pwdErrors);
    if (pwdErrors.length > 0) {
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await signUp(email, password);
      router.replace('/(authenticated)/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (touched.email) {
              setEmailError(validateEmail(text) ? '' : 'Please enter a valid email address');
            }
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, email: true }));
            setEmailError(validateEmail(email) ? '' : 'Please enter a valid email address');
          }}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!emailError}
        />
        {emailError ? <HelperText type="error">{emailError}</HelperText> : null}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (touched.password) {
              setPasswordErrors(validatePassword(text));
            }
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, password: true }));
            setPasswordErrors(validatePassword(password));
          }}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          error={passwordErrors.length > 0}
        />
        {passwordErrors.map((error, index) => (
          <HelperText key={index} type="error">{error}</HelperText>
        ))}
      </View>
      
      <Button 
        mode="contained" 
        onPress={handleSignUp} 
        loading={loading}
        style={styles.button}
        disabled={loading || !!emailError || passwordErrors.length > 0}
      >
        Sign Up
      </Button>
      
      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Link href="/sign-in">Log In</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 