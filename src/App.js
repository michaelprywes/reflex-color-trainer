import React, { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import './App.css';

function App() {
  const allColors = [
    { value: 'red', name: 'Red' },
    { value: 'orange', name: 'Orange' },
    { value: 'yellow', name: 'Yellow' },
    { value: 'green', name: 'Green' },
    { value: 'blue', name: 'Blue' },
    { value: 'purple', name: 'Purple' },
    { value: 'white', name: 'White' },
    { value: 'black', name: 'Black' },
  ];

  const [selectedColors, setSelectedColors] = useState([
    'Red',
    'Yellow',
    'Blue'
  ]);

  const [currentColor, setCurrentColor] = useState('black');
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(10);
  const [minDuration, setMinDuration] = useState(1);
  const [maxDuration, setMaxDuration] = useState(3);
  const [announceNumber, setAnnounceNumber] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const timerRef = useRef(null);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  };

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
    const filteredColors = allColors.filter(c => selectedColors.includes(c.name));
    if (filteredColors.length === 0) {
      alert('Please select at least one color.');
      stop();
      return;
    }

    const index = Math.floor(Math.random() * filteredColors.length);
    const selected = filteredColors[index];
    setCurrentColor(selected.value);

    const number = getRandomNumber();
    setCurrentNumber(number);

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

  const handleColorChange = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
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
          fontSize: '1rem',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <div>
            <label>Min Number: </label>
            <input
              type="number"
              value={minNumber}
              onChange={(e) => setMinNumber(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Max Number: </label>
            <input
              type="number"
              value={maxNumber}
              onChange={(e) => setMaxNumber(parseInt(e.target.value))}
            />
          </div>
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
            <strong>Choose Colors:</strong>
            {allColors.map((color) => (
              <div key={color.name}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color.name)}
                    onChange={() => handleColorChange(color.name)}
                  /> {color.name}
                </label>
              </div>
            ))}
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
);}
export default App;
