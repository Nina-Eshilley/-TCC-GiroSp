import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionLabel ? (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 70,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  icon: { fontSize: 32, color: "#777" },
  title: { fontSize: 18, fontWeight: "800", color: "#222" },
  description: {
    textAlign: "center",
    color: "#888",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#111",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
