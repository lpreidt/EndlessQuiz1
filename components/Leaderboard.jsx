import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

export default function Leaderboard({ setShowLeaderboard, players, username }) {
  const db = firestore;

  const sortedPlayers = players.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weltrangliste</Text>
      <Text style={styles.subtitle}>🏆</Text>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Rang</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Score</DataTable.Title>
          </DataTable.Header>

          {sortedPlayers.map((player) => {
            const isCurrentUser = player.name === username;
            return (
              <DataTable.Row
                key={player.name}
                style={isCurrentUser ? styles.highlightRow : {}}
              >
                <DataTable.Cell>
                  {sortedPlayers.indexOf(player) + 1}
                </DataTable.Cell>
                <DataTable.Cell>{player.name}</DataTable.Cell>
                <DataTable.Cell numeric>{player.score}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          setShowLeaderboard(false);
        }}
      >
        <Text style={styles.closeButtonText}>Zurück</Text>
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
  subtitle: {
    fontSize: 24, // Größe des Untertitels, kann angepasst werden
    marginBottom: 15, // Abstand zur Tabelle
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  highlightRow: {
    backgroundColor: "#FFB90F", // Diese Farbe kann nach Wunsch geändert werden
    borderRadius: 50,
  },
});
