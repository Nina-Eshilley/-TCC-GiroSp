import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { EventDetailsScreen } from './src/screens/EventDetailsScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <EventDetailsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
});
