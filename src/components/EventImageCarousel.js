import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

export function EventImageCarousel({ images, width, title }) {
  const [currentImage, setCurrentImage] = useState(0);
  const onScrollEnd = (event) => {
    setCurrentImage(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={[styles.frame, { width }]}> 
      <ScrollView horizontal onMomentumScrollEnd={onScrollEnd} pagingEnabled showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => <Image accessibilityLabel={`Imagem ${index + 1} do evento ${title}`} key={`event-image-${index}`} resizeMode="cover" source={image} style={[styles.image, { width }]} />)}
      </ScrollView>
      {images.length > 1 && <View pointerEvents="none" style={styles.indicators}>{images.map((_, index) => <View key={index} style={[styles.dot, index === currentImage && styles.activeDot]} />)}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { alignSelf: 'center', borderRadius: 12, height: 210, overflow: 'hidden' },
  image: { height: 210 },
  indicators: { alignSelf: 'center', bottom: 10, flexDirection: 'row', gap: 5, position: 'absolute' },
  dot: { backgroundColor: 'rgba(255,255,255,0.58)', borderRadius: 4, height: 6, width: 6 },
  activeDot: { backgroundColor: '#FFFFFF', width: 17 },
});
