import React, { useState, useEffect } from 'react';
import './styles.css';
import * as math from 'mathjs';

function App() {
  const [previousOperand, setPreviousOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedDarkMode !== null ? savedDarkMode : false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleButtonClick = (value) => {
    // If the equals sign is present in the previous operand, reset it for a new calculation
    if (previousOperand.endsWith('=')) {
      setPreviousOperand('');
      setCurrentOperand('');
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (currentOperand) {
        setPreviousOperand(prev => `${prev} ${currentOperand} ${value}`);
        setCurrentOperand('');  // Clear current operand after setting previous operand
      }
    } else {
      const displayValue = value === '*' ? 'x' : value;
      setCurrentOperand(prev => prev + displayValue);
    }
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
      // Replace 'x' with '*' for calculation
      const expression = `${previousOperand} ${currentOperand}`.replace(/x/g, '*');
      
      // Remove trailing operator if present
      const cleanedExpression = expression.replace(/[+\-*/]$/, '');
      
      // Evaluate the expression
      const result = math.evaluate(cleanedExpression);
      setPreviousOperand(`${cleanedExpression} =`);
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
      <button onClick={() => handleButtonClick('*')}>x</button>
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
