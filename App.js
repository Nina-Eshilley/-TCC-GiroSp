import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { EventDetailsScreen } from './src/features/eventos/screens/EventDetailsScreen';
import ProfileScreen from './src/features/perfil/screens/ProfileScreen';
import ActivitiesScreen from './src/features/perfil/screens/ActivitiesScreen';
import ListaUsuariosScreen from './src/features/usuario/screens/ListaUsuariosScreen';
import FormUsuarioScreen from './src/features/usuario/screens/FormUsuarioScreen';
import ListaArtistasScreen from './src/features/artista/screens/ListaArtistasScreen';
import FormArtistaScreen from './src/features/artista/screens/FormArtistaScreen';

const initialProfile = {
  id: 1,
  name: 'Sabrina',
  username: '@sabri',
  bio: 'A cultura alimenta a quebrada',
  followers: 0,
  following: 0,
  events: 0,
};

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [artistaEditando, setArtistaEditando] = useState(null);

  const [profile, setProfile] = useState(initialProfile);
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);

  // ===== TELAS =====

  if (screen === 'eventos') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <EventDetailsScreen />
      </SafeAreaView>
    );
  }

  if (screen === 'perfil') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ProfileScreen
          profile={profile}
          setProfile={setProfile}
          events={events}
          savedEvents={savedEvents}
          likedEvents={likedEvents}
          onCreateEvent={(e) => setEvents((c) => [{ ...e, id: Date.now() }, ...c])}
          onToggleSave={(ev) => setSavedEvents((c) => c.some((x) => x.id === ev.id) ? c.filter((x) => x.id !== ev.id) : [...c, ev])}
          onToggleLike={(ev) => setLikedEvents((c) => c.some((x) => x.id === ev.id) ? c.filter((x) => x.id !== ev.id) : [...c, ev])}
          onOpenActivities={() => setScreen('atividades')}
          onNavigate={(dest) => {
            if (dest === 'profile') setScreen('perfil');
            else if (dest === 'home') setScreen('eventos');
            else if (dest === 'activities') setScreen('atividades');
          }}
        />
      </SafeAreaView>
    );
  }

  if (screen === 'atividades') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ActivitiesScreen
          activities={[]}
          onBack={() => setScreen('perfil')}
          onNavigate={(dest) => {
            if (dest === 'profile') setScreen('perfil');
            else if (dest === 'home') setScreen('eventos');
          }}
        />
      </SafeAreaView>
    );
  }

  // ===== USUÁRIOS =====

  if (screen === 'listaUsuarios') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ListaUsuariosScreen
          onVoltar={() => setScreen('menu')}
          onNovo={() => { setUsuarioEditando(null); setScreen('formUsuario'); }}
          onEditar={(u) => { setUsuarioEditando(u); setScreen('formUsuario'); }}
        />
      </SafeAreaView>
    );
  }

  if (screen === 'formUsuario') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <FormUsuarioScreen
          usuario={usuarioEditando}
          onVoltar={() => setScreen('listaUsuarios')}
          onSalvo={() => setScreen('listaUsuarios')}
        />
      </SafeAreaView>
    );
  }

  // ===== ARTISTAS =====

  if (screen === 'listaArtistas') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ListaArtistasScreen
          onVoltar={() => setScreen('menu')}
          onNovo={() => { setArtistaEditando(null); setScreen('formArtista'); }}
          onEditar={(a) => { setArtistaEditando(a); setScreen('formArtista'); }}
        />
      </SafeAreaView>
    );
  }

  if (screen === 'formArtista') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <FormArtistaScreen
          artista={artistaEditando}
          onVoltar={() => setScreen('listaArtistas')}
          onSalvo={() => setScreen('listaArtistas')}
        />
      </SafeAreaView>
    );
  }

  // ===== MENU PRINCIPAL (tela inicial de teste) =====

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.menu}>
        <Text style={styles.menuTitulo}>GiroSP - Prévia</Text>

        <MenuBotao label="👤 Usuários" onPress={() => setScreen('listaUsuarios')} />
        <MenuBotao label="🎨 Artistas" onPress={() => setScreen('listaArtistas')} />
        <MenuBotao label="🎉 Eventos" onPress={() => setScreen('eventos')} />
        <MenuBotao label="👤 Perfil" onPress={() => setScreen('perfil')} />
      </View>
    </SafeAreaView>
  );
}

function MenuBotao({ label, onPress }) {
  const { TouchableOpacity, Text } = require('react-native');
  return (
    <TouchableOpacity style={styles.menuBotao} onPress={onPress}>
      <Text style={styles.menuBotaoTexto}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  menu: { flex: 1, justifyContent: 'center', padding: 22 },
  menuTitulo: { fontSize: 26, fontWeight: '800', color: '#7B20FF', marginBottom: 30, textAlign: 'center' },
  menuBotao: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuBotaoTexto: { fontSize: 16, fontWeight: '700', color: '#111' },
});