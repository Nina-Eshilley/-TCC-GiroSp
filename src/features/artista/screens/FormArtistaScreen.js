import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../../services/api';

export default function FormArtistaScreen({ artista, onVoltar, onSalvo }) {
  const editando = !!artista;

  const [genero, setGenero] = useState(artista?.genero ?? '');
  const [contato, setContato] = useState(artista?.contato ?? '');
  const [biografia, setBiografia] = useState(artista?.biografia ?? '');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!genero.trim() || !contato.trim()) {
      window.alert('Preencha gênero e contato.');
      return;
    }

    setSalvando(true);
    try {
      if (editando) {
        await api.put(`/artistas/${artista.id_artista}`, {
          genero: genero.trim(),
          contato: contato.trim(),
          biografia: biografia.trim(),
        });
      } else {
        await api.post('/artistas', {
          genero: genero.trim(),
          contato: contato.trim(),
          biografia: biografia.trim(),
        });
      }

      window.alert(editando ? 'Artista atualizado!' : 'Artista criado!');
      onSalvo();
    } catch (err) {
      console.error('Erro completo:', err);
      console.error('Resposta da API:', err.response?.data);
      const msg = err.response?.data?.erro || err.message || 'Não foi possível salvar';
      window.alert('Erro: ' + msg);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar}>
          <Text style={styles.voltar}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>
          {editando ? 'Editar artista' : 'Novo artista'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Gênero</Text>
        <TextInput
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Samba, Rock, Teatro"
        />

        <Text style={styles.label}>Contato</Text>
        <TextInput
          style={styles.input}
          value={contato}
          onChangeText={setContato}
          placeholder="Email ou telefone"
        />

        <Text style={styles.label}>Biografia</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={biografia}
          onChangeText={setBiografia}
          placeholder="Conte sobre o artista"
          multiline
        />

        <TouchableOpacity
          style={[styles.botao, salvando && styles.botaoDesabilitado]}
          onPress={salvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>
              {editando ? 'Salvar' : 'Criar'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 74,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  voltar: { fontSize: 40, lineHeight: 40, color: '#111' },
  titulo: { fontSize: 18, fontWeight: '800', color: '#111' },
  form: { padding: 22 },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  multiline: { height: 100, paddingTop: 12, textAlignVertical: 'top' },
  botao: {
    marginTop: 28,
    height: 52,
    backgroundColor: '#7B20FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoTexto: { color: '#fff', fontWeight: '800', fontSize: 16 },
});