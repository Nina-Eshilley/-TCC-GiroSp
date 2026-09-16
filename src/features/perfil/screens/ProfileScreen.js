import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";
import BottomNavigation from "../components/BottomNavigation";

const AVATAR_COLORS = ["#151515", "#263238", "#3E2723", "#1B1B3A", "#222222"];

function getInitial(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

export default function ProfileScreen({
  profile,
  setProfile,
  events,
  savedEvents,
  likedEvents,
  onCreateEvent,
  onToggleSave,
  onToggleLike,
  onOpenActivities,
  onNavigate,
}) {
  const [tab, setTab] = useState("events");
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);

  const [eventName, setEventName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const avatarColor = useMemo(
    () => AVATAR_COLORS[profile.id % AVATAR_COLORS.length],
    [profile.id]
  );

  function openEdit() {
    setName(profile.name);
    setUsername(profile.username);
    setBio(profile.bio);
    setEditVisible(true);
  }

  function saveProfile() {
    if (!name.trim() || !username.trim()) {
      Alert.alert("Atenção", "Nome e username são obrigatórios.");
      return;
    }

    setProfile((current) => ({
      ...current,
      name: name.trim(),
      username: username.trim().startsWith("@")
        ? username.trim()
        : `@${username.trim()}`,
      bio: bio.trim(),
    }));

    setEditVisible(false);
  }

  function submitEvent() {
    if (
      !eventName.trim() ||
      !eventPlace.trim() ||
      !eventDate.trim() ||
      !eventTime.trim()
    ) {
      Alert.alert(
        "Preencha os campos",
        "Informe nome, local, data e horário."
      );
      return;
    }

    onCreateEvent({
      name: eventName.trim(),
      place: eventPlace.trim(),
      date: eventDate.trim(),
      time: eventTime.trim(),
    });

    setEventName("");
    setEventPlace("");
    setEventDate("");
    setEventTime("");
    setCreateVisible(false);
  }

  function handleFollow() {
    setProfile((current) => ({
      ...current,
      followers: current.followers + 1,
    }));
  }

  const currentList =
    tab === "events"
      ? events
      : tab === "saved"
      ? savedEvents
      : likedEvents;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProfileHeader
          profile={profile}
          initial={getInitial(profile.name)}
          avatarColor={avatarColor}
          onOpenActivities={onOpenActivities}
        />

        <View style={styles.bioArea}>
          <Text style={styles.bio}>{profile.bio || "Sem biografia."}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.outlineButton} onPress={openEdit}>
            <Text style={styles.outlineButtonText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleFollow}>
            <Text style={styles.primaryButtonText}>Seguir</Text>
          </TouchableOpacity>
        </View>

        <ProfileTabs activeTab={tab} onChange={setTab} />

        <View style={styles.list}>
          {currentList.length === 0 ? (
            <EmptyState
              icon={tab === "events" ? "+" : tab === "saved" ? "🔖" : "♡"}
              title={
                tab === "events"
                  ? "Nenhum evento ainda"
                  : tab === "saved"
                  ? "Nenhum evento salvo"
                  : "Nenhum evento curtido"
              }
              description={
                tab === "events"
                  ? "Crie seu primeiro evento e comece a compartilhar experiências."
                  : tab === "saved"
                  ? "Os eventos que você salvar aparecerão aqui."
                  : "Os eventos que você curtir aparecerão aqui."
              }
              actionLabel={tab === "events" ? "Criar evento" : null}
              onAction={() => setCreateVisible(true)}
            />
          ) : (
            currentList.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                saved={savedEvents.some((item) => item.id === event.id)}
                liked={likedEvents.some((item) => item.id === event.id)}
                onSave={() => onToggleSave(event)}
                onLike={() => onToggleLike(event)}
                onOptions={() =>
                  Alert.alert(event.name, "Opções do evento.")
                }
              />
            ))
          )}
        </View>
      </ScrollView>

      <BottomNavigation
        active="profile"
        onNavigate={(destination) => {
          if (destination === "create") setCreateVisible(true);
          else onNavigate(destination);
        }}
      />

      <Modal visible={editVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Editar perfil</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="@usuario"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Biografia</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={bio}
              onChangeText={setBio}
              placeholder="Conte um pouco sobre você"
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={createVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Criar evento</Text>

            <Text style={styles.label}>Nome do evento</Text>
            <TextInput
              style={styles.input}
              value={eventName}
              onChangeText={setEventName}
              placeholder="Ex.: Encontro cultural"
            />

            <Text style={styles.label}>Local</Text>
            <TextInput
              style={styles.input}
              value={eventPlace}
              onChangeText={setEventPlace}
              placeholder="Onde será?"
            />

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Data</Text>
                <TextInput
                  style={styles.input}
                  value={eventDate}
                  onChangeText={setEventDate}
                  placeholder="20/09"
                />
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={eventTime}
                  onChangeText={setEventTime}
                  placeholder="19:00"
                />
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setCreateVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={submitEvent}>
                <Text style={styles.saveText}>Criar evento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingBottom: 105 },
  bioArea: { paddingHorizontal: 28, marginTop: 16 },
  bio: { color: "#333", fontSize: 14, lineHeight: 21 },
  actions: { paddingHorizontal: 28, marginTop: 16 },
  outlineButton: {
    height: 42,
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  outlineButtonText: { fontWeight: "700", color: "#171717" },
  primaryButton: {
    height: 42,
    marginTop: 9,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  list: { paddingHorizontal: 22 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: { fontSize: 22, fontWeight: "800", marginBottom: 20 },
  label: { fontSize: 12, fontWeight: "700", color: "#444", marginBottom: 6 },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    fontSize: 14,
  },
  multiline: { height: 78, paddingTop: 12, textAlignVertical: "top" },
  row: { flexDirection: "row", gap: 10 },
  half: { flex: 1 },
  modalActions: { flexDirection: "row", gap: 10, marginTop: 5 },
  cancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: { fontWeight: "700" },
  saveButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#111",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700" },
});
