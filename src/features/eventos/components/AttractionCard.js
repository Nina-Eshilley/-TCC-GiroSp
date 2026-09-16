import { Image, StyleSheet, Text, View } from 'react-native';

export function AttractionCard({ attraction }) {
  return (
    <View style={styles.card}>
      <Image accessibilityLabel={attraction.name} source={attraction.image} style={styles.photo} />
      <Text numberOfLines={1} style={styles.name}>{attraction.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', width: 62 },
  photo: { width: 53, height: 53, borderRadius: 27, backgroundColor: '#E7E3EC' },
  name: { color: '#17121B', fontSize: 9, fontWeight: '700', marginTop: 6 },
});
