import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileTabs({ activeTab, onChange }) {
  const tabs = [
    { id: "events", label: "Meus eventos" },
    { id: "saved", label: "Salvos" },
    { id: "liked", label: "Curtidos" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.active]}
          onPress={() => onChange(tab.id)}
        >
          <Text
            style={[
              styles.text,
              activeTab === tab.id && styles.activeText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 25,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: "#111",
  },
  text: { fontSize: 12, color: "#888" },
  activeText: { color: "#111", fontWeight: "800" },
});
