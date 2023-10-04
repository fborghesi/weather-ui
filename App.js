import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WeatherPanel from './components/WeatherPanel';
import WeatherAPI from './services/WeatherAPI';
import { useEffect, useState } from 'react';
import MainScreen from './components/MainScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <MainScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});