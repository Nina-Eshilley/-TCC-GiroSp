import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavigation({ active, onNavigate }) {
  const items = [
    { id: "home", label: "Início", icon: "⌂" },
    { id: "explore", label: "Explorar", icon: "⌕" },
    { id: "create", label: "Criar", icon: "+" },
    { id: "saved", label: "Salvos", icon: "♡" },
    { id: "profile", label: "Perfil", icon: "◉" },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isCreate = item.id === "create";
        const selected = active === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => onNavigate(item.id)}
          >
            {isCreate ? (
              <View style={styles.createButton}>
                <Text style={styles.plus}>{item.icon}</Text>
              </View>
            ) : (
              <Text style={[styles.icon, selected && styles.selected]}>
                {item.icon}
              </Text>
            )}

            <Text
              style={[
                styles.label,
                selected && styles.selectedText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  item: { width: 60, alignItems: "center" },
  icon: { fontSize: 23, color: "#888" },
  selected: { color: "#111" },
  label: { fontSize: 10, color: "#888", marginTop: 4 },
  selectedText: { color: "#111", fontWeight: "800" },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
  },
  plus: { color: "#fff", fontSize: 31, fontWeight: "300" },
});
