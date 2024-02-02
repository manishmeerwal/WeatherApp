// App.js

import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import WeatherApp from './WeatherApp';

const App = () => {
  const [city, setCity] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Get Weather" onPress={() => setCity(city)} />
      <WeatherApp city={city} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1', // Light background color
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
    backgroundColor: '#fff', // Input field color
  },
});

export default App;
