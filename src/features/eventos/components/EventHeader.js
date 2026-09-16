import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

export function EventHeader({ onBack, onMore }) {
  return (
    <View style={styles.header}>
      <Pressable accessibilityLabel="Voltar" hitSlop={12} onPress={onBack} style={styles.iconButton}>
        <Ionicons color="#17121B" name="arrow-back" size={21} />
      </Pressable>
      <View style={styles.actions}>
        <Pressable accessibilityLabel="Mais opções" hitSlop={12} onPress={onMore} style={styles.iconButton}>
          <Ionicons color="#17121B" name="ellipsis-horizontal" size={21} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', height: 58, justifyContent: 'space-between', paddingHorizontal: 20 },
  actions: { flexDirection: 'row' },
  iconButton: { alignItems: 'center', height: 30, justifyContent: 'center', width: 25 },
});
