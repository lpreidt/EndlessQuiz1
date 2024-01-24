import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
export function Settings({
  setShowSettings,
  setUsername,
  setLoggedIn,
  setScore,
  removeData,
  deletePlayer,
  username,
}) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>

      <TouchableOpacity
        style={[styles.resetButton, screenWidth > 600 && { width: "50%" }]}
        onPress={() => {
          setUsername(null);
          setLoggedIn(false);
          setShowSettings(false);
          setScore(0);
          removeData("localUser");
          deletePlayer(username);
        }}
      >
        <Text style={styles.buttonText}>Spielstand zurücksetzen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backButton, screenWidth > 600 && { width: "50%" }]}
        onPress={() => setShowSettings(false)}
      >
        <Text style={styles.buttonText}>Zurück</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  resetButton: {
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
