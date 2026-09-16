import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../../services/api';
import CardUsuario from '../components/CardUsuario';

export default function ListaUsuariosScreen({ onVoltar, onEditar, onNovo }) {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    setCarregando(true);
    try {
      const { data } = await api.get('/usuarios');
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      window.alert('Não foi possível carregar usuários');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function deletar(id) {
    const confirmar = window.confirm('Deseja deletar este usuário?');
    if (!confirmar) return;

    try {
      await api.delete(`/usuarios/${id}`);
      carregar();
    } catch (err) {
      console.error(err);
      window.alert('Não foi possível deletar');
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#7B20FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar}>
          <Text style={styles.voltar}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Usuários</Text>
        <TouchableOpacity onPress={onNovo}>
          <Text style={styles.novo}>+</Text>
        </TouchableOpacity>
      </View>

      {usuarios.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.vazio}>Nenhum usuário cadastrado</Text>
          <TouchableOpacity onPress={onNovo} style={styles.botaoNovo}>
            <Text style={styles.botaoNovoTexto}>Criar primeiro usuário</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id_usuario)}
          renderItem={({ item }) => (
            <CardUsuario usuario={item} onEditar={onEditar} onDeletar={deletar} />
          )}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    height: 74,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  voltar: { fontSize: 40, lineHeight: 40, color: '#111' },
  titulo: { fontSize: 20, fontWeight: '800', color: '#111' },
  novo: { fontSize: 32, color: '#7B20FF', fontWeight: '700' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  vazio: { color: '#888', fontSize: 14, marginBottom: 16 },
  lista: { padding: 16 },
  botaoNovo: {
    backgroundColor: '#7B20FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoNovoTexto: { color: '#fff', fontWeight: '800' },
});