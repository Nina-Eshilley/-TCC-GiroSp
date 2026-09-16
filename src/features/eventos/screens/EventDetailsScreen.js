import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useState } from 'react';

import { AttractionCard } from '../components/AttractionCard';
import { AttendanceButton } from '../components/AttendanceButton';
import { CommentsModal } from '../components/CommentsModal';
import { EventHeader } from '../components/EventHeader';
import { EventImageCarousel } from '../components/EventImageCarousel';
import { event } from '../../../data/event';

const initialComments = [];
const commentsEndpoint = process.env.EXPO_PUBLIC_API_URL
  ? `${process.env.EXPO_PUBLIC_API_URL}/comments`
  : null;

export function EventDetailsScreen() {
  const { width } = useWindowDimensions();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isGoing, setIsGoing] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const eventImageWidth = Math.min(width - 40, 520);

  const shareEvent = async () => {
    try {
      await Share.share({ message: `Confira o evento ${event.title} no GiroSP!` });
    } catch {
      Alert.alert('Aten\u00E7\u00E3o', 'N\u00E3o foi poss\u00EDvel compartilhar o evento.');
    }
  };

  const toggleAttendance = () => {
    setIsGoing((current) => !current);
    /* The state update above provides the immediate toggle requested for this button.
    const confirming = !isGoing;
    Alert.alert(
      confirming ? 'Confirmar presen\u00E7a?' : 'Cancelar presen\u00E7a?',
      confirming ? `Voc\u00EA deseja confirmar presen\u00E7a em ${event.title}?` : `Voc\u00EA deseja cancelar sua presen\u00E7a em ${event.title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', style: confirming ? 'default' : 'destructive', onPress: () => setIsGoing(confirming) },
      ],
    ); */
  };

  const addComment = async (text) => {
    if (!commentsEndpoint) {
      Alert.alert('Configuração necessária', 'Defina EXPO_PUBLIC_API_URL para enviar comentários.');
      return;
    }

    try {
      const response = await fetch(commentsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, text }),
      });

      if (!response.ok) throw new Error('Não foi possível salvar o comentário.');
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o comentário.');
    }
    return;
    // O comentário não é exibido localmente; ele deverá ser enviado à API.
    console.log('Comentário pronto para envio:', text);
  };

  return (
    <View style={styles.screen}>
      <EventHeader
        onBack={() => Alert.alert('Voltar', 'N\u00E3o h\u00E1 uma tela anterior nesta demonstra\u00E7\u00E3o.')}
        onMore={() => Alert.alert('Op\u00E7\u00F5es', 'Mais op\u00E7\u00F5es em breve.')}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <EventImageCarousel images={event.images} title={event.title} width={eventImageWidth} />
        <View style={styles.body}>
          <View style={styles.badge}><Text style={styles.badgeText}>{event.date} {'\u00B7'} {event.time}</Text></View>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.location}>{event.location}</Text>
          <Text style={styles.address}>{event.address}</Text>
          <Text style={styles.distance}>{event.distance}</Text>

          <View style={styles.interactions}>
            <Pressable accessibilityLabel="Curtir" onPress={() => setIsLiked((value) => !value)} style={styles.metric}>
              <Ionicons color={isLiked ? '#6717F5' : '#17121B'} name={isLiked ? 'heart' : 'heart-outline'} size={20} />
            </Pressable>
            <Pressable accessibilityLabel={'Abrir coment\u00E1rios'} onPress={() => setIsCommentsVisible(true)} style={styles.metric}>
              <Ionicons color="#17121B" name="chatbubble-outline" size={18} />
            </Pressable>
            <Pressable accessibilityLabel="Compartilhar" onPress={shareEvent} style={styles.shareAction}>
              <Ionicons color="#17121B" name="paper-plane-outline" size={19} />
            </Pressable>
            <Pressable accessibilityLabel={isSaved ? 'Remover dos salvos' : 'Salvar'} onPress={() => setIsSaved((value) => !value)} style={styles.save}>
              <Ionicons color={isSaved ? '#6717F5' : '#17121B'} name={isSaved ? 'bookmark' : 'bookmark-outline'} size={20} />
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o evento</Text>
            <View style={styles.descriptionRow}>
              <Text style={styles.description}>{event.description}</Text>
              <Ionicons color="#7B20FF" name="sparkles-outline" size={37} style={styles.decoration} />
            </View>
          </View>

          <View style={styles.attractions}>
            <Text style={styles.sectionTitle}>{'Atra\u00E7\u00F5es'}</Text>
            <View style={styles.attractionList}>
              {event.attractions.map((attraction) => <AttractionCard attraction={attraction} key={attraction.id} />)}
            </View>
          </View>
          <AttendanceButton confirmed={isGoing} onPress={toggleAttendance} />
        </View>
      </ScrollView>
      <CommentsModal comments={comments} onClose={() => setIsCommentsVisible(false)} onSubmit={addComment} visible={isCommentsVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { paddingBottom: 28 },
  body: { paddingHorizontal: 26, paddingTop: 15 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#6B16FA', borderRadius: 4, paddingHorizontal: 9, paddingVertical: 4 },
  badgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
  title: { color: '#151017', fontSize: 22, fontWeight: '800', letterSpacing: -0.45, marginTop: 9 },
  location: { color: '#302936', fontSize: 11, fontWeight: '700', marginTop: 4 },
  address: { color: '#625A67', fontSize: 10, marginTop: 4 },
  distance: { color: '#6B16FA', fontSize: 11, fontWeight: '700', marginTop: 5 },
  interactions: { alignItems: 'center', flexDirection: 'row', marginTop: 16, minHeight: 26 },
  metric: { alignItems: 'center', flexDirection: 'row', marginRight: 18 },
  metricText: { color: '#17121B', fontSize: 10, fontWeight: '600' },
  selectedText: { color: '#6717F5' },
  shareAction: { alignItems: 'center', flexDirection: 'row' },
  save: { marginLeft: 'auto' },
  section: { marginTop: 22 },
  sectionTitle: { color: '#1C1620', fontSize: 13, fontWeight: '800' },
  descriptionRow: { flexDirection: 'row', justifyContent: 'space-between', minHeight: 58, paddingTop: 8 },
  description: { color: '#2D2630', fontSize: 10.5, lineHeight: 16 },
  decoration: { marginRight: 12, transform: [{ rotate: '-12deg' }] },
  attractions: { marginTop: 14 },
  attractionList: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, marginTop: 11 },
});
