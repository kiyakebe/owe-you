import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Check } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TasksScreen: React.FC = () => {
  const inset = useSafeAreaInsets();

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Review Design Specs", completed: true },
    { id: 2, title: "Weekly Team Sync", completed: false },
    { id: 3, title: "Update Tailwind Config", completed: false },
    { id: 4, title: "Client Feedback Implementation", completed: false },
    { id: 5, title: "Prepare Q3 Roadmap", completed: false },
  ]);

  const completedTaskNumber = tasks.filter((t) => t.completed).length;
  const totalTaskNumber = tasks.length;
  const completedPercentage = (completedTaskNumber / totalTaskNumber) * 100;

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => toggleTask(item.id)}
      style={[styles.taskItem, item.completed && styles.taskItemCompleted]}
    >
      <View
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
      >
        {item.completed && <Check size={16} color="#fff" />}
      </View>

      <Text
        style={[styles.taskText, item.completed && styles.taskTextCompleted]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Current Tasks</Text>

        <Text>
          {completedTaskNumber}/{totalTaskNumber}
        </Text>
      </View>

      <View style={styles.progressIndicator}>
        <View
          style={[
            styles.progressIndicatorFill,
            { width: `${completedPercentage}%` },
          ]}
        />
      </View>

      {/* Scrollable Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: inset.bottom + 60 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },

  addButton: {
    backgroundColor: "#4F46E5",
    padding: 7,
    borderRadius: 10,
  },

  list: {
    gap: 8,
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  taskItemCompleted: {
    backgroundColor: "#F5F5F5",
    borderColor: "#D4D4D4",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D4D4D4",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  checkboxCompleted: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },

  taskText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },

  insightWrapper: {
    marginTop: 32,
  },

  insightCard: {
    backgroundColor: "#020617",
    borderRadius: 32,
    padding: 24,
    overflow: "hidden",
  },

  insightLabel: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginBottom: 4,
  },

  insightText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 24,
  },

  insightDecoration: {
    position: "absolute",
    right: -24,
    bottom: -24,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(99,102,241,0.2)",
  },

  progressIndicator: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
    marginBottom: 24,
  },

  progressIndicatorFill: {
    height: "100%",
    backgroundColor: "#000000",
  },
});
