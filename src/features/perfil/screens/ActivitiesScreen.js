import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomNavigation from "../components/BottomNavigation";
import EmptyState from "../components/EmptyState";

export default function ActivitiesScreen({
  activities = [],
  onBack,
  onNavigate,
}) {
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    if (tab === "all") return activities;
    return activities.filter((item) => item.type === tab);
  }, [activities, tab]);

  const tabs = [
    { id: "all", label: "Todas" },
    { id: "liked", label: "Curtidas" },
    { id: "comment", label: "Comentários" },
    { id: "following", label: "Seguindo" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Atividades</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.tabs}>
          {tabs.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setTab(item.id)}
              style={[
                styles.tab,
                tab === item.id && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === item.id && styles.activeTabText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 ? (
          <EmptyState
            icon="♡"
            title="Nenhuma atividade ainda"
            description="Quando houver novas curtidas, comentários ou pessoas seguindo você, elas aparecerão aqui."
          />
        ) : (
          <View style={styles.activityList}>
            {filtered.map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <View style={styles.activityAvatar}>
                  <Text style={styles.activityAvatarText}>
                    {(item.user || "?").charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.activityText}>
                  <Text style={styles.activityMessage}>
                    {item.message}
                  </Text>
                  <Text style={styles.activityTime}>
                    {item.time || "agora"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNavigation
        active="activities"
        onNavigate={onNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingBottom: 105 },
  header: {
    height: 74,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { width: 40 },
  backText: { fontSize: 40, lineHeight: 40, color: "#111" },
  title: { fontSize: 21, fontWeight: "800", color: "#111" },
  headerSpacer: { width: 40 },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#111",
  },
  tabText: { fontSize: 11, color: "#888" },
  activeTabText: { color: "#111", fontWeight: "800" },
  activityList: { padding: 22 },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },
  activityAvatarText: { color: "#fff", fontWeight: "800" },
  activityText: { flex: 1, marginLeft: 12 },
  activityMessage: { color: "#222", fontSize: 13 },
  activityTime: { color: "#999", fontSize: 11, marginTop: 4 },
});
