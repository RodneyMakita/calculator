import React, { useState } from 'react';
import './styles.css';

function App() {
  const [previousOperand, setPreviousOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('');

  // Function to handle button clicks
  const handleButtonClick = (value) => {
    setCurrentOperand(currentOperand + value);
  };

  // Function to handle AC button click
  const handleACClick = () => {
    setPreviousOperand('');
    setCurrentOperand('');
  };

  // Function to handle DEL button click
  const handleDELClick = () => {
    setCurrentOperand(currentOperand.slice(0, -1));
  };

  const handleEqualsClick = () => {
    try {
      // Use Function constructor to evaluate the expression
      const result = new Function('return ' + currentOperand)();
      // Update the state to display the result
      setPreviousOperand(currentOperand);
      setCurrentOperand(result.toString());
    } catch (error) {
      // Handle errors if the expression is invalid
      setCurrentOperand('Error Mfanawakithi');
    }
  };

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={handleACClick}>AC</button>
      <button onClick={handleDELClick}>DEL</button>
      <button onClick={() => handleButtonClick('÷')}>÷</button>
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
      <button className="span-two" onClick={handleEqualsClick}>=</button>
    </div>
  );
}

export default App;
