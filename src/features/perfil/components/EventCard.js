import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EventCard({
  event,
  saved,
  liked,
  onSave,
  onLike,
  onOptions,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.image}>
        <Text style={styles.emoji}>🎉</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{event.name}</Text>
        <Text style={styles.date}>
          {event.date} • {event.time}
        </Text>
        <Text style={styles.place}>{event.place}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onLike}>
            <Text style={[styles.action, liked && styles.active]}>
              {liked ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSave}>
            <Text style={[styles.action, saved && styles.active]}>
              {saved ? "▣" : "▢"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onOptions}>
        <Text style={styles.more}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 11,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: { fontSize: 28 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontWeight: "800", fontSize: 14, color: "#111" },
  date: { fontSize: 11, color: "#555", marginTop: 5 },
  place: { fontSize: 11, color: "#888", marginTop: 3 },
  actions: { flexDirection: "row", gap: 15, marginTop: 6 },
  action: { fontSize: 18, color: "#777" },
  active: { color: "#6333d8" },
  more: { fontSize: 23, padding: 8, color: "#555" },
});
