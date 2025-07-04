import React from 'react';

const Controls = ({ start, stop, isRunning }) => {
  return (
    <div>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
    </div>
  );
};

export default Controls;