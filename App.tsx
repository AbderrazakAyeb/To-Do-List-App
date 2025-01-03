import React, { useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme, Text, TextInput, Button, List, IconButton } from "react-native-paper";

export default function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState<{ text: string; priority: string }[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, priority }]);
      setTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const getTaskBackgroundColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ff4d4d";
      case "Medium":
        return "#ffcc00";
      case "Low":
        return "#4caf50";
      default:
        return theme.colors.surface;
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <IconButton
          icon={isDarkTheme ? "weather-sunny" : "moon-waxing-crescent"}
          size={30}
          onPress={() => setIsDarkTheme(!isDarkTheme)}
          style={styles.toggleButton}
        />
        <Text variant="headlineLarge" style={styles.title}>
          To-Do List
        </Text>
        <TextInput
          label="Enter a task..."
          value={task}
          onChangeText={setTask}
          mode="outlined"
          style={styles.input}
        />
        <View style={styles.priorityContainer}>
          {["High", "Medium", "Low"].map((level) => (
            <Button
              key={level}
              mode={priority === level ? "contained" : "outlined"}
              onPress={() => setPriority(level)}
              style={[styles.priorityButton, priority === level && { backgroundColor: getTaskBackgroundColor(level) }]}
            >
              {level}
            </Button>
          ))}
        </View>
        <Button mode="contained" onPress={addTask} style={styles.addButton}>
          Add Task
        </Button>
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <List.Item
              title={`${item.text}`}
              titleStyle={{ color: isDarkTheme ? "#fff" : "#000" }}
              style={[styles.taskItem, { backgroundColor: getTaskBackgroundColor(item.priority) }]}
              right={() => (
                <IconButton icon="delete" iconColor="white" size={20} onPress={() => removeTask(index)} />
              )}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleButton: {
    alignSelf: "flex-end",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  priorityButton: {
    paddingHorizontal: 10,
  },
  addButton: {
    marginBottom: 20,
  },
  taskItem: {
    marginBottom: 5,
    borderRadius: 5,
  },
});