import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { register } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register({ username, password });
      alert("Registro exitoso, ahora inicia sesión");
      navigation.navigate("Login");
    } catch (err) {
      alert("Error al registrarse");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuario:</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Contraseña:</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}
