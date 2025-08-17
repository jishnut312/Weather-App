import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const LocationAutocomplete = ({ location, setLocation, handleSearch }) => {
  return (
    <div className="location-autocomplete">
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={(selected) => {
          setLocation(selected);
          handleSearch(selected);
        }}
        searchOptions={{
          types: ['(cities)'],
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-wrapper">
            <input
              {...getInputProps({
                placeholder: 'Search for a city...',
                className: 'search-input',
                'aria-label': 'Enter city name for weather search',
              })}
            />
            <div className={`suggestions-container ${suggestions.length > 0 ? 'has-suggestions' : ''}`}>
              {loading && <div className="suggestion-item loading">Loading suggestions...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item active'
                  : 'suggestion-item';
                
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationAutocomplete;