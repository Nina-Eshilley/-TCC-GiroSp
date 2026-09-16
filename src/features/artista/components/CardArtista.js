import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CardArtista({ artista, onEditar, onDeletar }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{artista.genero || 'Artista'}</Text>
        <Text style={styles.email}>{artista.contato}</Text>
        {artista.biografia && <Text style={styles.pref}>{artista.biografia}</Text>}
      </View>
      <View style={styles.acoes}>
        <TouchableOpacity onPress={() => onEditar(artista)} style={styles.botao}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeletar(artista.id_artista)} style={[styles.botao, styles.botaoPerigo]}>
          <Text style={[styles.botaoTexto, styles.botaoTextoPerigo]}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  info: { marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: '800', color: '#111' },
  email: { fontSize: 13, color: '#666', marginTop: 2 },
  pref: { fontSize: 12, color: '#7B20FF', marginTop: 4 },
  acoes: { flexDirection: 'row', gap: 8 },
  botao: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  botaoPerigo: { backgroundColor: '#ffe5e5' },
  botaoTexto: { fontSize: 12, fontWeight: '700', color: '#333' },
  botaoTextoPerigo: { color: '#c00' },
});