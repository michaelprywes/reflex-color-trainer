import React from 'react';

const ColorBox = ({ color }) => {
  const style = {
    backgroundColor: color,
    width: '300px',
    height: '300px',
    margin: '50px auto',
    borderRadius: '20px'
  };

  return <div style={style}></div>;
};

export default ColorBox;