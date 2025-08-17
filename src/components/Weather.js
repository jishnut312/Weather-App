import React from 'react';

function Weather({ data }) {
  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-container">
      <h2>{name}, {sys.country}</h2>
      <div className="weather-main">
        <img src={iconUrl} alt={weather[0].description} />
        <div>
          <p className="temperature">{Math.round(main.temp)}°C</p>
          <p className="description">{weather[0].description}</p>
        </div>
      </div>
      <div className="weather-details">
        <p>Feels like: {Math.round(main.feels_like)}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
        <p>Pressure: {main.pressure} hPa</p>
      </div>
    </div>
  );
}

export default Weather;