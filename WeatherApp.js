import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const WeatherApp = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '3996211f99b7c8bd06e078d352427cd0';
  const encodedCity = city ? encodeURIComponent(city.trim()) : '';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&APPID=${API_KEY}`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.main && data.main.temp !== undefined) {
        setWeatherData(data);
        setError(null);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('API Request Error:', error);
      setError(error.message || 'Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchWeatherData();
  };

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weatherData && (
        <View>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.temperature}>
            {Math.round(weatherData.main.temp - 273.15)}°C
          </Text>
          <Text style={styles.weatherCondition}>
            {weatherData.weather[0].description}
          </Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
            }}
          />
          <Button
            title="Refresh"
            onPress={handleRefresh}
            style={styles.refreshButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db', // Attractive blue background color
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  weatherCondition: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  refreshButton: {
    backgroundColor: '#2ecc71', // Refresh button color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default WeatherApp;
