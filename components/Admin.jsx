import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { addDoc } from "firebase/firestore";

export default function Admin() {
  const db = firestore;

  const questions = [
    {
      Question: "Was ist die Hauptkomponente des ätherischen Öls Zimt?",
      O1: "Zimtaldehyd",
      O2: "Eugenol",
      O3: "Limonen",
      SO: "Zimtaldehyd",
    },
    {
      Question:
        "Welcher antike Philosoph war der Lehrer von Alexander dem Großen?",
      O1: "Aristoteles",
      O2: "Sokrates",
      O3: "Platon",
      SO: "Aristoteles",
    },
    {
      Question:
        "Welches chemische Element hat die höchste Schmelz- und Siedetemperatur?",
      O1: "Wolfram",
      O2: "Titan",
      O3: "Platin",
      SO: "Wolfram",
    },
    {
      Question: "Wer schrieb das Buch 'Krieg und Frieden'?",
      O1: "Fyodor Dostoevsky",
      O2: "Leo Tolstoy",
      O3: "F. Scott Fitzgerald",
      SO: "Leo Tolstoy",
    },
    {
      Question:
        "In welchem Jahr wurde das Periodensystem der Elemente erstmals veröffentlicht?",
      O1: "1869",
      O2: "1897",
      O3: "1905",
      SO: "1869",
    },
    {
      Question: "Wer war der erste Mensch im Weltraum?",
      O1: "Yuri Gagarin",
      O2: "Neil Armstrong",
      O3: "Buzz Aldrin",
      SO: "Yuri Gagarin",
    },
    {
      Question: "Welcher Komponist gilt als der 'Vater der Sinfonie'?",
      O1: "Wolfgang Amadeus Mozart",
      O2: "Ludwig van Beethoven",
      O3: "Johann Sebastian Bach",
      SO: "Ludwig van Beethoven",
    },
    {
      Question: "Was ist die Hauptkomponente des ätherischen Öls Eukalyptus?",
      O1: "Menthol",
      O2: "Eukalyptol",
      O3: "Campher",
      SO: "Eukalyptol",
    },
    {
      Question:
        "Welche Chemikerin gewann zwei Nobelpreise, einen in der Chemie und einen in der Physik?",
      O1: "Marie Curie",
      O2: "Dorothy Crowfoot Hodgkin",
      O3: "Irène Joliot-Curie",
      SO: "Marie Curie",
    },
    {
      Question:
        "In welchem Jahr wurde die Theorie der Evolution durch natürliche Auslese von Charles Darwin veröffentlicht?",
      O1: "1835",
      O2: "1859",
      O3: "1874",
      SO: "1859",
    },
    {
      Question: "Wer schrieb das Buch 'Der Name der Rose'?",
      O1: "Umberto Eco",
      O2: "Gabriel García Márquez",
      O3: "Haruki Murakami",
      SO: "Umberto Eco",
    },
    {
      Question: "Was ist die Hauptkomponente des ätherischen Öls Pfefferminze?",
      O1: "Menthol",
      O2: "Carvon",
      O3: "Campher",
      SO: "Menthol",
    },
    {
      Question:
        "Welche antike Stadt galt als eines der Zentren der antiken philosophischen und wissenschaftlichen Denkens?",
      O1: "Rom",
      O2: "Athen",
      O3: "Alexandria",
      SO: "Athen",
    },
    {
      Question: "Welches chemische Element hat die höchste Dichte?",
      O1: "Osmium",
      O2: "Iridium",
      O3: "Platin",
      SO: "Osmium",
    },
    {
      Question: "Wer schrieb das Buch '1984'?",
      O1: "Aldous Huxley",
      O2: "George Orwell",
      O3: "Ray Bradbury",
      SO: "George Orwell",
    },
    {
      Question:
        "Welcher Physiker formulierte die Maxwellschen Gleichungen und trug zur Entwicklung der Elektrodynamik bei?",
      O1: "Isaac Newton",
      O2: "James Clerk Maxwell",
      O3: "Niels Bohr",
      SO: "James Clerk Maxwell",
    },
    {
      Question:
        "In welchem Jahr wurde der Grundstein für den Eiffelturm in Paris gelegt?",
      O1: "1885",
      O2: "1898",
      O3: "1901",
      SO: "1887",
    },
    {
      Question: "Wer war der erste Mensch, der den Ärmelkanal durchschwamm?",
      O1: "Captain Matthew Webb",
      O2: "Diana Nyad",
      O3: "Gertrude Ederle",
      SO: "Captain Matthew Webb",
    },
  ];
  const handleUpload = async () => {
    //upload to firebase
    questions.forEach((question) => {
      addDoc(collection(db, "questios"), {
        Question: question.Question,
        O1: question.O1,
        O2: question.O2,
        O3: question.O3,
        SO: question.SO,
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text>Admin</Text>
      <Button title="Upload" onPress={handleUpload} />
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
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
  },
  settingsText: {
    color: "#ffffff",
    fontSize: 18,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  optionText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
