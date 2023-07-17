import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from './src/screens/TaskList';
import Auth from './src/screens/Auth'
import Navigator from './src/Navigator';

export default function App() {
  return (
    <Navigator/>
  );
}
