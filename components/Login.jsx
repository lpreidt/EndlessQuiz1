import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Admin from "./Admin";

export default function Login({
  setLoggedIn,
  loggedIn,
  username,
  setUsername,
  players,
  updatePlayer,
}) {
  const [error, setError] = useState(true);
  const screenWidth = Dimensions.get("window").width;
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("localUser", value);
    } catch (e) {
      // Fehler beim Speichern der Daten
    }
  };

  const handleSubmit = async () => {
    if (username.length === 0 || username.length === undefined) {
      setError(true);
      Alert.alert("Fehler", "Der Username darf nicht leer sein.");
    } else if (players.some((player) => player.name === username)) {
      setError(true);
      Alert.alert("Fehler", "Der Username ist bereits vergeben.");
    } else {
      setError(false);
      updatePlayer(username, 0);
      setLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      {username === "A" && <Admin />}
      <Image
        style={styles.image}
        source={require("../assets/adaptive-icon.png")}
      />
      <Text style={styles.title}>Willkommen!</Text>
      <TextInput
        defaultValue=""
        style={[
          styles.input,
          error && styles.errorInput,
          screenWidth > 600 && { width: "50%" },
        ]}
        placeholder="Dein Username"
        onChangeText={(text) => {
          if (text) {
            setUsername(text);
            storeData(text);

            setError(false);
          } else {
            setUsername(""); // Setze den Username auf einen leeren String
            setError(true);
          }
        }}
        value={username}
      />
      <TouchableOpacity
        disabled={error}
        style={[
          styles.loginButton,
          error && styles.errorButton,
          screenWidth > 600 && { width: "50%" },
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.loginButtonText}>Weiter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: "#333333",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  errorInput: {
    // borderColor: "red",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
  },
  errorButton: {
    // backgroundColor: "red",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center",
  },
});
