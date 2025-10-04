import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      await AsyncStorage.setItem("token", res.data.token);
      navigation.replace("Tasks");
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuario:</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Contraseña:</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}
