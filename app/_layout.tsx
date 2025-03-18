import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../styles/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={lightTheme}>
      <StatusBar style="auto" />
      <Slot />
    </PaperProvider>
  );
} 