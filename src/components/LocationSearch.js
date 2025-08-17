import React from 'react';
import './LocationSearch.css'; // Assuming you have a CSS file for styling

const LocationSearch = ({ 
  location, 
  setLocation, 
  handleSearch,
  fetchByGeolocation 
}) => {
  return (
    <div className="search-container">
      <div className="search-input-group">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
          aria-label="Enter city name for weather search"
        />
        <button 
          onClick={handleSearch}
          className="search-button"
          disabled={!location.trim()}
          aria-label="Search weather"
        >
          Search
        </button>
      </div>
      <button
      onClick={fetchByGeolocation}
      className="geolocation-btn"
      aria-label="Use current location"
      title="Use my current location"
    >
      <i className="bi bi-geo-alt-fill"></i>
    </button>
    </div>
  );
};

export default LocationSearch;