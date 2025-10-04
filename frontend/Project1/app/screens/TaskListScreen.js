import { useState, useCallback } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasks, deleteTask, updateTask } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");

  const fetchData = async () => {
    const t = await AsyncStorage.getItem("token");
    setToken(t);
    if (t) {
      const res = await getTasks(t);
      setTasks(res.data);
    }
  };

  // 🔥 Se ejecuta cada vez que la pantalla gana el foco
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const updated = await updateTask(id, { completed: !completed }, token);
    setTasks(tasks.map((t) => (t._id === id ? updated.data : t)));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Agregar tarea"
        onPress={() => navigation.navigate("TaskForm", { token })}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <TouchableOpacity
              onPress={() => toggleComplete(item._id, item.completed)}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button
              title="Editar"
              onPress={() =>
                navigation.navigate("TaskForm", { token, task: item })
              }
            />
            <Button
              title="Eliminar"
              color="red"
              onPress={() => handleDelete(item._id)}
            />
          </View>
        )}
      />
    </View>
  );
}
