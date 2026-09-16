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

export default function FormUsuarioScreen({ usuario, onVoltar, onSalvo }) {
  const editando = !!usuario;

  const [nome, setNome] = useState(usuario?.nome ?? '');
  const [email, setEmail] = useState(usuario?.email ?? '');
  const [senha, setSenha] = useState('');
  const [preferencias, setPreferencias] = useState(usuario?.preferencias ?? '');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!nome.trim() || !email.trim() || (!editando && !senha.trim())) {
      window.alert('Preencha nome, email e senha.');
      return;
    }

    setSalvando(true);
    try {
      if (editando) {
        const dados = {
          nome: nome.trim(),
          email: email.trim(),
          preferencias: preferencias.trim(),
        };
        if (senha.trim()) {
          dados.senha = senha.trim();
        }
        await api.put(`/usuarios/${usuario.id_usuario}`, dados);
      } else {
        await api.post('/usuarios', {
          nome: nome.trim(),
          email: email.trim(),
          senha: senha.trim(),
          preferencias: preferencias.trim(),
        });
      }

      window.alert(editando ? 'Usuário atualizado!' : 'Usuário criado!');
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
          {editando ? 'Editar usuário' : 'Novo usuário'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome completo"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Senha {editando && '(deixe vazio para manter)'}
        </Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          secureTextEntry
        />

        <Text style={styles.label}>Preferências</Text>
        <TextInput
          style={styles.input}
          value={preferencias}
          onChangeText={setPreferencias}
          placeholder="Ex: música, arte, esporte"
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