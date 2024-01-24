import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Question({
  setScore,
  score,
  questions,
  username,
  updatePlayer,
  showSettings,
  showLeaderboard,
  index,
  setIndex,
  useLessState,
  setUseLessState,
}) {
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const celebrate = () => {
    if (correct) {
      return (
        <View style={styles.correctContainer}>
          <Text style={styles.correctText}>Richtig!</Text>
        </View>
      );
    }
    if (wrong) {
      return (
        <View style={styles.wrongContainer}>
          <Text style={styles.wrongText}>Falsch!</Text>
        </View>
      );
    }
  };

  const handleAnswer = (answer) => {
    if (useLessState) setUseLessState(false);
    else setUseLessState(true);

    if (questions[index]?.answer === answer) {
      setScore(score + 10), updatePlayer(username, score + 10);
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
      }, 900);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 900);
      if (score - 30 > 0)
        setScore(score - 30), updatePlayer(username, score - 30);
      else setScore(0), updatePlayer(username, 0);
    }
  };

  useEffect(() => {
    celebrate();
  }, [correct, wrong]);

  return (
    <View style={styles.container}>
      {correct && celebrate()}
      {wrong && celebrate()}

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{questions[index]?.question}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            handleAnswer(questions[index]?.o1);
          }}
        >
          <Text style={styles.optionText}>{questions[index]?.o1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            handleAnswer(questions[index]?.o2);
          }}
        >
          <Text style={styles.optionText}>{questions[index]?.o2}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            handleAnswer(questions[index]?.o3);
          }}
        >
          <Text style={styles.optionText}>{questions[index]?.o3}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
  },
  timerText: {
    fontSize: 16,
  },
  questionContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 150, // Fügen Sie eine feste Höhe hinzu
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  correctContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  correctText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },

  wrongContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  wrongText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },

  optionButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingVertical: 20, // Geändert von padding zu paddingVertical
    paddingHorizontal: 20, // Fügen Sie horizontalen Abstand hinzu
    marginBottom: 20,
    width: "80%",
    height: 60, // Fügen Sie eine feste Höhe hinzu
    justifyContent: "center", // Zentriert den Text vertikal
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
});
