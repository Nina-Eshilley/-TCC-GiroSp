import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export function CommentsModal({ comments, onClose, onSubmit, visible }) {
  const [commentText, setCommentText] = useState('');
  const submit = () => {
    const text = commentText.trim();
    if (!text) return;
    onSubmit(text);
    setCommentText('');
  };

  return (
    <Modal animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet" transparent visible={visible}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{'Coment\u00E1rios'}</Text>
            <Pressable accessibilityLabel={'Fechar coment\u00E1rios'} hitSlop={10} onPress={onClose}><Ionicons color="#241B29" name="close" size={25} /></Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
            {comments.map((comment) => <View key={comment.id} style={styles.comment}><View style={styles.avatar}><Ionicons color="#6B16FA" name="person" size={15} /></View><Text style={styles.commentText}>{comment.text}</Text></View>)}
          </ScrollView>
          <View style={styles.composer}>
            <TextInput accessibilityLabel={'Escreva um coment\u00E1rio'} maxLength={300} onChangeText={setCommentText} placeholder={'Adicione um coment\u00E1rio...'} placeholderTextColor="#8B8490" returnKeyType="send" style={styles.input} value={commentText} onSubmitEditing={submit} />
            <Pressable accessibilityLabel={'Enviar coment\u00E1rio'} disabled={!commentText.trim()} onPress={submit} style={[styles.send, !commentText.trim() && styles.sendDisabled]}><Ionicons color="#FFFFFF" name="arrow-up" size={18} /></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: 'rgba(20, 13, 24, 0.3)', flex: 1, justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '78%', minHeight: 360, paddingBottom: 18 },
  handle: { alignSelf: 'center', backgroundColor: '#DDD8E0', borderRadius: 3, height: 5, marginTop: 9, width: 42 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 22, paddingVertical: 18 },
  title: { color: '#1B1420', fontSize: 18, fontWeight: '800' },
  list: { gap: 16, paddingBottom: 18, paddingHorizontal: 22 },
  comment: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  avatar: { alignItems: 'center', backgroundColor: '#F0EAFE', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  commentText: { color: '#2D2630', flex: 1, fontSize: 14, lineHeight: 20, paddingTop: 5 },
  composer: { alignItems: 'center', borderTopColor: '#EEEAF0', borderTopWidth: 1, flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingTop: 13 },
  input: { backgroundColor: '#F5F2F6', borderRadius: 22, color: '#201924', flex: 1, fontSize: 14, height: 44, paddingHorizontal: 16 },
  send: { alignItems: 'center', backgroundColor: '#6717F5', borderRadius: 22, height: 42, justifyContent: 'center', width: 42 },
  sendDisabled: { backgroundColor: '#C9B5F4' },
});
