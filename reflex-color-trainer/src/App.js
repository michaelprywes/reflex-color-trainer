import React, { useState, useRef } from 'react';
import ColorBox from './components/ColorBox';
import IntervalSettings from './components/IntervalSettings';
import Controls from './components/Controls';
import { speak } from './components/Speech';
import './App.css';

function App() {
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  const [color, setColor] = useState("black");
  const [minInterval, setMinInterval] = useState(1);
  const [maxInterval, setMaxInterval] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const getRandomInterval = (min, max) => Math.random() * (max - min) + min;

  const changeColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[index];
    setColor(selectedColor);
    speak(selectedColor);

    const nextInterval = getRandomInterval(minInterval, maxInterval) * 1000;
    timerRef.current = setTimeout(changeColor, nextInterval);
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
    setColor("black");
  };

  return (
  <div style={{
    backgroundColor: color,
    width: '100vw',
    height: '100vh',
    margin: '0',
    fontFamily: "'Roboto', sans-serif"
  }}>
    <h1>ReflexColorTrainer</h1>
    <IntervalSettings
      minInterval={minInterval}
      maxInterval={maxInterval}
      setMinInterval={setMinInterval}
      setMaxInterval={setMaxInterval}
    />
    <Controls start={start} stop={stop} isRunning={isRunning} />
  </div>
);

}

export default App;