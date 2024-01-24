import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Login from "./Login";
import Question from "./Question";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Settings } from "./Settings";
import Leaderboard from "./Leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDoc, updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

export default function Main() {
  const db = firestore;
  const [loggedIn, setLoggedIn] = useState(false);
  const [index, setIndex] = useState(5);
  const [lastTenIndex, setLastTenIndex] = useState([]);
  const [useLessState, setUseLessState] = useState(false);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [players, setPlayers] = useState([]);
  const [syncScore, setSyncScore] = useState(0);

  const updatePlayer = async (name, score) => {
    const playerRef = doc(db, "players", name);
    const playerSnap = await getDoc(playerRef);

    if (playerSnap.exists()) {
      await updateDoc(playerRef, {
        score: score,
      });
    } else {
      await setDoc(playerRef, {
        name: name,
        score: score,
      });
    }
  };
  const deletePlayer = async (name) => {
    const playerRef = doc(db, "players", name);
    await deleteDoc(playerRef);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("localUser", value);
    } catch (e) {
      // Fehler beim Speichern der Daten
    }
  };
  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // Fehler beim Löschen der Daten
      console.error("Fehler beim Löschen der Daten", e);
    }
  };

  const loadInitialData = async () => {
    if (username) {
      const playerRef = doc(db, "players", username);
      const playerSnap = await getDoc(playerRef);
      if (playerSnap.exists()) {
        const playerData = playerSnap.data();
        if (playerData) {
          setScore(playerData.score);
        }
      }
    }
  };
  const fetchData = async () => {
    const value = await AsyncStorage.getItem("localUser");
    if (value !== null) {
      setUsername(value);

      setLoggedIn(true);
    }

    const playersRef = collection(db, "players");
    const players = [];
    const snapshot1 = await getDocs(playersRef).then((querySnapshot) => {
      querySnapshot.forEach(async (dok) => {
        const id = dok.id;

        const player = dok.data();
        const name = player?.name;
        const score = player?.score;

        players.push({
          name: name,
          score: score,
        });
      });
      setPlayers(players);
    });

    const questionsRef = collection(db, "questios");
    const questions = [];
    const snapshot = await getDocs(questionsRef).then((querySnapshot) => {
      querySnapshot.forEach(async (dok) => {
        const id = dok.id;

        const question = dok.data();
        const questionText = question?.Question;
        const o1 = question?.O1;
        const o2 = question?.O2;
        const o3 = question?.O3;
        const answer = question?.SO;

        questions.push({
          question: questionText,
          o1: o1,
          o2: o2,
          o3: o3,
          answer: answer,
        });
      });
      setQuestions(questions);
    });
  };
  function shuffle() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (lastTenIndex.includes(randomIndex));

    setIndex(randomIndex);

    const updatedLastTenIndex =
      lastTenIndex.length >= 20
        ? [...lastTenIndex.slice(1), randomIndex]
        : [...lastTenIndex, randomIndex];
    setLastTenIndex(updatedLastTenIndex);
  }
  useEffect(() => {
    shuffle();
  }, [useLessState]);

  useEffect(() => {
    fetchData();
  }, [score, showLeaderboard]);
  useEffect(() => {
    loadInitialData();
  }, [username]);

  if (!loggedIn) {
    return (
      <Login
        players={players}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        username={username}
        setUsername={setUsername}
        updatePlayer={updatePlayer}
      />
    );
  }
  if (showSettings) {
    return (
      <View style={styles.container}>
        <Settings
          setUsername={setUsername}
          setLoggedIn={setLoggedIn}
          setShowSettings={setShowSettings}
          setScore={setScore}
          removeData={removeData}
          deletePlayer={deletePlayer}
          username={username}
        />
      </View>
    );
  }
  if (showLeaderboard) {
    return (
      <View style={styles.container}>
        <Leaderboard
          setShowLeaderboard={setShowLeaderboard}
          players={players}
          username={username}
        />
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hallo {username}</Text>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.subtext}>Dein aktueller Score:</Text>
          <Text style={styles.score}>{score}</Text>
        </View>
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowSettings(true)}
          >
            <Text style={styles.settingsText}>Einstellungen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowLeaderboard(true)}
          >
            <Text style={styles.settingsText}>Weltrangliste</Text>
          </TouchableOpacity>
        </View>
        <Question
          setScore={setScore}
          score={score}
          questions={questions}
          updatePlayer={updatePlayer}
          username={username}
          showSettings={showSettings}
          showLeaderboard={showLeaderboard}
          index={index}
          setIndex={setIndex}
          useLessState={useLessState}
          setUseLessState={setUseLessState}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 36,
    marginBottom: 20,
  },
  logout: {
    fontSize: 18,
    color: "blue",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  subtext: {
    fontSize: 18,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  settingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  settingsButton: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  settingsText: {
    fontSize: 18,
  },
});
