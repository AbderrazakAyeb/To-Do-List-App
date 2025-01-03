import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState<{ text: string; priority: string }[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, priority }]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const getTaskBackgroundColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ff4d4d"; // Red
      case "Medium":
        return "#ffcc00"; // Yellow
      case "Low":
        return "#4caf50"; // Green
      default:
        return "#f9f9f9";
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme ? darkStyles.container : lightStyles.container]}>
      <Text style={[styles.title, isDarkTheme ? darkStyles.title : lightStyles.title]}>To-Do List</Text>

      <TextInput
        style={[styles.input, isDarkTheme ? darkStyles.input : lightStyles.input]}
        placeholder="Enter a task..."
        value={task}
        onChangeText={setTask}
      />

      {/* Priority Selection */}
      <View style={styles.priorityContainer}>
        {["High", "Medium", "Low"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level && { backgroundColor: getTaskBackgroundColor(level) }]}
            onPress={() => setPriority(level)}
          >
            <Text style={styles.priorityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.addButton, isDarkTheme ? darkStyles.addButton : lightStyles.addButton]} onPress={addTask}>
        <Text style={[styles.addButtonText, isDarkTheme ? darkStyles.addButtonText : lightStyles.addButtonText]}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={[styles.taskItem, { backgroundColor: getTaskBackgroundColor(item.priority) }]}>
            <Text style={[styles.taskText, isDarkTheme ? darkStyles.taskText : lightStyles.taskText]}>
              {item.text} ({item.priority})
            </Text>
            <TouchableOpacity onPress={() => removeTask(index)}>
              <Text style={[styles.deleteText, isDarkTheme ? darkStyles.deleteText : lightStyles.deleteText]}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={isDarkTheme ? darkStyles.toggleButton : lightStyles.toggleButton} onPress={toggleTheme}>
        <Ionicons name={isDarkTheme ? "moon" : "sunny"} size={30} color={isDarkTheme ? "#fff" : "#000"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { padding: 10, borderRadius: 5, marginBottom: 10 },
  priorityContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  priorityButton: { padding: 10, borderRadius: 5, backgroundColor: "#ddd" },
  priorityText: { fontWeight: "bold" },
  addButton: { padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 20 },
  addButtonText: { fontSize: 18, fontWeight: "bold" },
  taskItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderRadius: 5, marginBottom: 10 },
  taskText: { fontSize: 16, flexShrink: 1 },
  deleteText: { fontSize: 18 },
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: "#222" },
  title: { color: "#fff" },
  input: { backgroundColor: "#fff", color: "#000" },
  addButton: { backgroundColor: "#28a745" },
  addButtonText: { color: "#fff" },
  taskText: { color: "#fff" },
  deleteText: { color: "#ff4d4d" },
  toggleButton: { position: "absolute", top: 40, right: 5, padding: 10, borderRadius: 50 },
});

const lightStyles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  title: { color: "#000" },
  input: { backgroundColor: "#f1f1f1", color: "#000" },
  addButton: { backgroundColor: "#28a745" },
  addButtonText: { color: "#fff" },
  taskText: { color: "#000" },
  deleteText: { color: "#ff4d4d" },
  toggleButton: { position: "absolute", top: 40, right: 5, padding: 10, borderRadius: 50 },
});
