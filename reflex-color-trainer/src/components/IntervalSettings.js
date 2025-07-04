import React from 'react';

const IntervalSettings = ({ minInterval, maxInterval, setMinInterval, setMaxInterval }) => {
  return (
    <div>
      <label>Min Interval (s):</label>
      <input
        type="number"
        value={minInterval}
        min="0.5"
        step="0.5"
        onChange={(e) => setMinInterval(parseFloat(e.target.value))}
      />
      <label style={{ marginLeft: '10px' }}>Max Interval (s):</label>
      <input
        type="number"
        value={maxInterval}
        min="0.5"
        step="0.5"
        onChange={(e) => setMaxInterval(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default IntervalSettings;