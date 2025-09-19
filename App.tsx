import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default function App() {
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [showMovieScreen, setShowMovieScreen] = useState(false);
  const [numOfMovie, setNumOfMovie] = useState('');
  const [movieMessage, setMovieMessage] = useState('');

  const handleAgeInputChange = (input: string) => {
    setAge(input);
  };

  const handleAgeCheck = () => {
    const ageNumber = parseInt(age);

    if (isNaN(ageNumber) || ageNumber <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid age.');
      return;
    }

    if (ageNumber < 18) {
      setMessage('You are a minor.');
    } else if (ageNumber >= 21) {
      setMessage('You will be taken to a different screen shortly.');
      setTimeout(() => {
        setShowMovieScreen(true);
      }, 2000);
    } else {
      setMessage('You are an adult.');
    }
  };

  const handleMovieInputChange = (input: string) => {
    setNumOfMovie(input);
  };

  const handleMovieSelection = () => {
    const movieNumber = parseInt(numOfMovie);
    if (isNaN(movieNumber) || movieNumber < 1 || movieNumber > 5) {
      setMovieMessage('Invalid input. Please enter a number between 1 and 5.');
    } else {
      const movieList = [
        'Flight 2012',
        'DeadPool',
        'Lyco',
        'The Con is On',
        'Higher Power',
      ];
      setMovieMessage(`You selected: ${movieList[movieNumber - 1]}`);
    }
  };

  // Show Movie Selection Screen if applicable
  if (showMovieScreen) {
    
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Choose a movie (1-5):</Text>

        <Text style={{ fontSize: 18, marginTop: 20 }}>Available Movies:</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>1. Flight 2012</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>2. DeadPool</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>3. Lyco</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>4. The Con is On</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>5. Higher Power</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter number of the movie"
          keyboardType="numeric"
          value={numOfMovie}
          onChangeText={handleMovieInputChange}
        />
        <Button title="Select Movie" onPress={handleMovieSelection} />
        {movieMessage ? <Text style={styles.message}>{movieMessage}</Text> : null}

        <StatusBar style="auto" />
      </View>
    );
  }

  // Default Age Checker Screen
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Age Checker</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Please enter your age:</Text>
      <Text style={{ fontSize: 12, marginBottom: 10, color: 'gray' }}>
        (Only numeric input is allowed)
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={handleAgeInputChange}
      />
      <Button title="Check Age" onPress={handleAgeCheck} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <StatusBar style="auto" />
    </View>
  );
}
