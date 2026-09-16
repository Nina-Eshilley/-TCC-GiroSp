import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileHeader({
  profile,
  initial,
  avatarColor,
  onOpenActivities,
}) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.logo}>♛</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onOpenActivities}>
            <Text style={styles.icon}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileRow}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.initial}>{initial}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>{profile.username}</Text>

          <View style={styles.stats}>
            <Stat number={profile.followers} label="Seguidores" />
            <Stat number={profile.following} label="Seguindo" />
            <Stat number={profile.events || 0} label="Eventos" />
          </View>
        </View>
      </View>
    </View>
  );
}

function Stat({ number, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 76,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { fontSize: 38, color: "#6333d8" },
  headerActions: { flexDirection: "row", gap: 20 },
  icon: { fontSize: 25, color: "#222" },
  profileRow: {
    flexDirection: "row",
    paddingHorizontal: 28,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#7b43e6",
  },
  initial: { color: "#fff", fontSize: 36, fontWeight: "800" },
  details: { flex: 1, marginLeft: 17 },
  name: { fontSize: 19, fontWeight: "800", color: "#111" },
  username: { color: "#777", marginTop: 2, fontSize: 13 },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
    maxWidth: 220,
  },
  stat: { alignItems: "center" },
  number: { fontSize: 16, fontWeight: "800", color: "#111" },
  label: { fontSize: 10, color: "#777", marginTop: 2 },
});
