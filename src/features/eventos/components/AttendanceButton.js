import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

export function AttendanceButton({ confirmed, onPress }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.button, confirmed && styles.confirmed]}>
      <Ionicons color="#FFFFFF" name={confirmed ? 'checkmark-circle' : 'ticket-outline'} size={18} />
      <Text style={styles.text}>{confirmed ? 'Presen\u00E7a confirmada' : 'Quero ir'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#6717F5', borderRadius: 9, flexDirection: 'row', gap: 8, height: 50, justifyContent: 'center', shadowColor: '#6717F5', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 9 },
  confirmed: { backgroundColor: '#4E14BE' },
  text: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
