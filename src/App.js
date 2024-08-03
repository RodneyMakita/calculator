import React, { useState, useEffect } from 'react';
import './styles.css';
import * as math from 'mathjs';

function App() {
  const [previousOperand, setPreviousOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode setting from localStorage and apply it
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
      document.body.classList.toggle('dark-mode', savedDarkMode);
    }
  }, []);

  // Update localStorage and body class when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleButtonClick = (value) => {
    setCurrentOperand(prev => prev + value);
  };

  const handleACClick = () => {
    setPreviousOperand('');
    setCurrentOperand('');
  };

  const handleDELClick = () => {
    setCurrentOperand(prev => prev.slice(0, -1));
  };

  const handleEqualsClick = () => {
    try {
      const result = math.evaluate(currentOperand);
      setPreviousOperand(currentOperand);
      setCurrentOperand(result.toString());
    } catch (error) {
      setCurrentOperand('Error Mfanawakithi');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={handleACClick}>AC</button>
      <button onClick={handleDELClick}>DEL</button>
      <button onClick={() => handleButtonClick('/')}>÷</button>
      <button onClick={() => handleButtonClick('1')}>1</button>
      <button onClick={() => handleButtonClick('2')}>2</button>
      <button onClick={() => handleButtonClick('3')}>3</button>
      <button onClick={() => handleButtonClick('*')}>*</button>
      <button onClick={() => handleButtonClick('4')}>4</button>
      <button onClick={() => handleButtonClick('5')}>5</button>
      <button onClick={() => handleButtonClick('6')}>6</button>
      <button onClick={() => handleButtonClick('+')}>+</button>
      <button onClick={() => handleButtonClick('7')}>7</button>
      <button onClick={() => handleButtonClick('8')}>8</button>
      <button onClick={() => handleButtonClick('9')}>9</button>
      <button onClick={() => handleButtonClick('-')}>-</button>
      <button onClick={() => handleButtonClick('.')}>.</button>
      <button onClick={() => handleButtonClick('0')}>0</button>
      <button className='span-two' onClick={handleEqualsClick}>=</button>
      <div className="theme-switch">
  <label htmlFor="theme">
    <input
      id="theme"
      className="theme__toggle"
      type="checkbox"
      role="switch"
      name="theme"
      value="dark"
      checked={darkMode}
      onChange={toggleDarkMode}
    />
    <span className="theme-slider"></span>
  </label>
</div>

    </div>
  );
}

export default App;
