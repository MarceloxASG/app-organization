import { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
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

  // 🧩 Nueva función: Cerrar sesión
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, salir",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }], // 👈 Nombre de la pantalla de login
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* 🔥 Botón de Logout arriba */}
      <Button title="Cerrar sesión" color="orange" onPress={handleLogout} />

      <View style={{ marginVertical: 10 }}>
        <Button
          title="Agregar tarea"
          onPress={() => navigation.navigate("TaskForm", { token })}
        />
      </View>

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
