import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import LocationSearch from './components/LocationSearch';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(''); // always string
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState('default-bg');
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const searchWeather = async (loc) => {
    if (!loc || typeof loc !== 'string') return;
    try {
      setLoading(true);
      setError(null);
      const geoRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${API_KEY}`
      );
      const { lat, lon } = geoRes.data.coord;
      const data = await fetchWeatherData(lat, lon);
      setWeather(data);
      setLocation(data.name);
    } catch (err) {
      setError(err.response?.data?.message || 'Location not found. Please try another city.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchByGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherData(latitude, longitude);
          setWeather(data);
          setLocation(data.name);
        } catch (err) {
          setError('Failed to fetch weather for your location');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Geolocation permission denied. Please search manually.');
        setLoading(false);
      }
    );
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const updateBackground = (weatherCondition) => {
    let bgClass = 'default-bg';
    if (!weatherCondition) return;

    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        bgClass = darkMode ? 'clear-night-bg' : 'clear-day-bg';
        break;
      case 'clouds':
        bgClass = 'cloudy-bg';
        break;
      case 'rain':
      case 'light rain':
        bgClass= 'lightrain-bg';
        break;
      case 'drizzle':
        bgClass = 'rainy-bg';
        break;
      case 'thunderstorm':
        bgClass = 'storm-bg';
        break;
      case 'snow':
        bgClass = 'snow-bg';
        break;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'fog':
        bgClass = 'foggy-bg';
        break;
      default:
        bgClass = darkMode ? 'default-dark-bg' : 'default-bg';
    }

    setBackgroundClass(bgClass);
  };

  useEffect(() => {
    searchWeather('Kannur');
  }, []);

  useEffect(() => {
    if (weather) {
      updateBackground(weather.weather[0]?.main);
    }
  }, [weather, darkMode]);

  // ✅ Safe handleSearch: always use current location string
  const handleSearch = () => {
    if (location && typeof location === 'string' && location.trim()) {
      searchWeather(location.trim());
    }
  };

  return (
    <div className={`app ${backgroundClass} ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="header-controls">
          <h1>Weather App</h1>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <LocationSearch
          location={location}
          setLocation={setLocation}
          handleSearch={handleSearch}
          fetchByGeolocation={fetchByGeolocation}
        />

        {loading && <div className="loading-spinner"></div>}
        {error && <p className="error">{error}</p>}

        {weather && <Weather data={weather} />}
      </div>
    </div>
  );
}

export default App;
