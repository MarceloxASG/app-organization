import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { createTask, updateTask } from "../services/api";

export default function TaskFormScreen({ route, navigation }) {
  const { token, task } = route.params || {};
  const [title, setTitle] = useState(task ? task.title : "");

  const handleSave = async () => {
    try {
      if (task) {
        await updateTask(task._id, { title }, token);
      } else {
        await createTask({ title }, token);
      }
      navigation.goBack();
    } catch (err) {
      alert("Error al guardar tarea");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Título de la tarea:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}
