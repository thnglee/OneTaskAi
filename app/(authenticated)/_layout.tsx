import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

function AuthenticatedLayout() {
  const { user, loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#007BFF' },
        headerTintColor: '#fff',
      }}
    />
  );
}

export default AuthenticatedLayout; 