import React, { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import './App.css';

function App() {
  const [colors, setColors] = useState([
    { value: 'red', name: 'Red' },
    { value: 'blue', name: 'Blue' },
    { value: 'green', name: 'Green' },
    { value: 'yellow', name: 'Yellow' },
    { value: 'orange', name: 'Orange' },
    { value: 'purple', name: 'Purple' }
  ]);

  const [currentColor, setCurrentColor] = useState('black');
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [minDuration, setMinDuration] = useState(1);
  const [maxDuration, setMaxDuration] = useState(3);
  const [announceNumber, setAnnounceNumber] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const timerRef = useRef(null);

  const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

  const getRandomInterval = () => {
    const min = minDuration * 1000;
    const max = maxDuration * 1000;
    return Math.random() * (max - min) + min;
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const changeColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    const selected = colors[index];
    setCurrentColor(selected.value);
    const number = getRandomNumber();
    setCurrentNumber(number);

    // Construct announcement
    let announcement = selected.name;
    if (announceNumber) {
      announcement += ` ${number}`;
    }

    speak(announcement);

    timerRef.current = setTimeout(changeColor, getRandomInterval());
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      changeColor();
    }
  };

  const stop = () => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentColor('black');
    setCurrentNumber(null);
  };

  const addColor = () => {
    const newColor = prompt('Enter color name or hex code:');
    const newName = prompt('Enter display name for this color:');
    if (newColor && newName) {
      setColors([...colors, { value: newColor, name: newName }]);
    }
  };

  const removeColor = () => {
    const colorToRemove = prompt('Enter display name of color to remove:');
    setColors(colors.filter(c => c.name.toLowerCase() !== colorToRemove.toLowerCase()));
  };

  return (
    <div style={{
  backgroundColor: currentColor,
  width: '100vw',
  height: '100vh',
  fontFamily: "'Roboto', sans-serif",
  color: 'white',
  fontSize: '10rem',
  textAlign: 'center',
  position: 'relative'
}}>
      {/* Hamburger Menu */}
      <div style={{ position: 'absolute', top: 20, left: 20, fontSize: '2rem', cursor: 'pointer' }}
        onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      {/* Settings Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 60,
          left: 20,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '10px',
          borderRadius: '5px',
          textAlign: 'left',
          fontSize: '1rem'
        }}>
          <div>
            <label>Min Duration (s): </label>
            <input
              type="number"
              value={minDuration}
              min="0.1"
              step="0.1"
              onChange={(e) => setMinDuration(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Max Duration (s): </label>
            <input
              type="number"
              value={maxDuration}
              min="0.1"
              step="0.1"
              onChange={(e) => setMaxDuration(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={announceNumber}
                onChange={() => setAnnounceNumber(!announceNumber)}
              /> Announce Number
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={addColor}>Add Color</button>
            <button onClick={removeColor}>Remove Color</button>
          </div>
        </div>
      )}

      {/* Main Number Display */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        {currentNumber}
        <div style={{ fontSize: '1rem', marginTop: '20px' }}>
          <button onClick={start} disabled={isRunning}>Start</button>
          <button onClick={stop} disabled={!isRunning}>Stop</button>
        </div>
      </div>
    </div>
  );
}

export default App;