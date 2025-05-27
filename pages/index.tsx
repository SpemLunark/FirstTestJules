import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Calculator.module.css';
import React, { useState, useEffect } from 'react';

const CalculatorPage: NextPage = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('0');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(true);
  const [angleMode, setAngleMode] = useState<'Degrees' | 'Radians'>('Degrees'); // New state for angle mode

  // Helper to convert angle based on mode
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const toDegrees = (radians: number): number => radians * (180 / Math.PI);

  const handleNumberClick = (number: string) => {
    // ... (same as before)
    if (overwrite) {
      setCurrentOperand(number);
      setOverwrite(false);
    } else {
      if (currentOperand === '0' && number === '0') return;
      if (number === '.' && currentOperand.includes('.')) return;
      if (currentOperand === '0' && number !== '.') {
        setCurrentOperand(number);
      } else {
        setCurrentOperand(prev => prev + number);
      }
    }
  };

  const handleOperationClick = (op: string) => {
    // ... (same as before, but ensure it doesn't conflict with unary operations)
    if (currentOperand === '' && previousOperand === null && !['√', 'ln', 'log', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', '!', 'abs', '10^x', 'e^x'].includes(op)) return;

    // If it's a unary operation that can act on the current operand
    if (['√', 'ln', 'log', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', '!', 'abs', '10^x', 'e^x'].includes(op)) {
        handleUnaryOperation(op);
        return;
    }
    
    // For binary operations like x^y
    if (op === 'x^y') {
        setOperation('^'); // Use a simple symbol for internal state
        setPreviousOperand(currentOperand);
        setOverwrite(true);
        return;
    }

    if (previousOperand !== null && !overwrite) {
      calculate();
    }
    
    setOperation(op);
    setPreviousOperand(currentOperand);
    setOverwrite(true);
  };
  
  const handleUnaryOperation = (unaryOp: string) => {
    if (currentOperand === 'Error' || currentOperand === '') return;
    let value = parseFloat(currentOperand);
    let result: number | string = 0;

    switch (unaryOp) {
      case 'sin':
        result = angleMode === 'Degrees' ? Math.sin(toRadians(value)) : Math.sin(value);
        break;
      case 'cos':
        result = angleMode === 'Degrees' ? Math.cos(toRadians(value)) : Math.cos(value);
        break;
      case 'tan':
        result = angleMode === 'Degrees' ? Math.tan(toRadians(value)) : Math.tan(value);
        break;
      case 'asin':
        if (value < -1 || value > 1) { result = 'Error'; break; }
        result = angleMode === 'Degrees' ? toDegrees(Math.asin(value)) : Math.asin(value);
        break;
      case 'acos':
        if (value < -1 || value > 1) { result = 'Error'; break; }
        result = angleMode === 'Degrees' ? toDegrees(Math.acos(value)) : Math.acos(value);
        break;
      case 'atan':
        result = angleMode === 'Degrees' ? toDegrees(Math.atan(value)) : Math.atan(value);
        break;
      case 'ln':
        if (value <= 0) { result = 'Error'; break; }
        result = Math.log(value);
        break;
      case 'log': // log base 10
        if (value <= 0) { result = 'Error'; break; }
        result = Math.log10(value);
        break;
      case '10^x':
        result = Math.pow(10, value);
        break;
      case 'e^x':
        result = Math.exp(value);
        break;
      case '√':
        if (value < 0) { result = 'Error'; break; }
        result = Math.sqrt(value);
        break;
      case '!': // Factorial
        if (value < 0 || !Number.isInteger(value)) { result = 'Error'; break; }
        if (value === 0) { result = 1; break; }
        let fact = 1;
        for (let i = 1; i <= value; i++) fact *= i;
        result = fact;
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      default:
        return;
    }
    setCurrentOperand(result.toString());
    setOverwrite(true);
  };

  const calculate = () => {
    if (previousOperand === null || operation === null || currentOperand === '' || currentOperand === 'Error') return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result: number = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '−':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          setCurrentOperand('Error');
          setPreviousOperand(null);
          setOperation(null);
          setOverwrite(true);
          return;
        }
        result = prev / current;
        break;
      case '^': // For x^y
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  const handleEqualsClick = () => {
    calculate();
  };

  const handleClearClick = () => {
    setCurrentOperand('0');
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  const handleDeleteClick = () => {
    // ... (same as before)
    if (overwrite) {
        setCurrentOperand('0');
        setOverwrite(true);
        return;
    }
    if (currentOperand.length === 1) {
      setCurrentOperand('0');
      setOverwrite(true);
    } else {
      setCurrentOperand(prev => prev.slice(0, -1));
    }
  };

  const handlePercentageClick = () => {
    // ... (same as before)
    if (currentOperand === 'Error' || currentOperand === '') return;
    const currentValue = parseFloat(currentOperand);
    setCurrentOperand((currentValue / 100).toString());
    setOverwrite(true);
  };

  const handleConstantClick = (constant: string) => {
    let value = '';
    if (constant === 'π') value = Math.PI.toString();
    if (constant === 'e') value = Math.E.toString();
    setCurrentOperand(value);
    setOverwrite(false); // Allow appending to this constant if needed, or use in operation
  };
  
  const toggleAngleMode = () => {
    setAngleMode(prevMode => prevMode === 'Degrees' ? 'Radians' : 'Degrees');
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Engineering Calculator</title>
        <meta name="description" content="Web-based engineering calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Engineering Calculator
        </h1>

        <div className={styles.calculator}>
          <div className={styles.display}>
            <div className={styles.previousOperand}>
              {previousOperand} {operation}
            </div>
            <div className={styles.currentOperand}>{currentOperand}</div>
            <div className={styles.angleModeDisplay} onClick={toggleAngleMode} title="Toggle Angle Mode">
                {angleMode}
            </div>
          </div>

          {/* Adjust grid-template-columns if more columns are needed, e.g., 5 or 6 */}
          <div className={`${styles.buttonGrid} ${styles.scientificGrid}`}>
            {/* Row 1: Angle Mode, Inv, Sci Functions */}
            <button onClick={toggleAngleMode} className={`${styles.button} ${styles.sciFunctionButton}`}>{angleMode === 'Degrees' ? 'Rad' : 'Deg'}</button>
            <button onClick={() => handleUnaryOperation('sin')} className={`${styles.button} ${styles.sciFunctionButton}`}>sin</button>
            <button onClick={() => handleUnaryOperation('cos')} className={`${styles.button} ${styles.sciFunctionButton}`}>cos</button>
            <button onClick={() => handleUnaryOperation('tan')} className={`${styles.button} ${styles.sciFunctionButton}`}>tan</button>
            <button onClick={handleClearClick} className={`${styles.button} ${styles.functionButton}`}>AC</button>
            
            {/* Row 2: Sci Functions */}
            <button onClick={() => handleUnaryOperation('asin')} className={`${styles.button} ${styles.sciFunctionButton}`}>sin⁻¹</button>
            <button onClick={() => handleUnaryOperation('acos')} className={`${styles.button} ${styles.sciFunctionButton}`}>cos⁻¹</button>
            <button onClick={() => handleUnaryOperation('atan')} className={`${styles.button} ${styles.sciFunctionButton}`}>tan⁻¹</button>
            <button onClick={() => handleUnaryOperation('abs')} className={`${styles.button} ${styles.sciFunctionButton}`}>|x|</button>
            <button onClick={handleDeleteClick} className={`${styles.button} ${styles.functionButton}`}>DEL</button>

            {/* Row 3: Sci Functions & Percentage */}
            <button onClick={() => handleUnaryOperation('ln')} className={`${styles.button} ${styles.sciFunctionButton}`}>ln</button>
            <button onClick={() => handleUnaryOperation('log')} className={`${styles.button} ${styles.sciFunctionButton}`}>log</button>
            <button onClick={() => handleOperationClick('x^y')} className={`${styles.button} ${styles.sciFunctionButton}`}>xʸ</button>
            <button onClick={() => handleUnaryOperation('√')} className={`${styles.button} ${styles.sciFunctionButton}`}>√</button>
            <button onClick={handlePercentageClick} className={`${styles.button} ${styles.functionButton}`}>%</button>

            {/* Row 4: Constants & Basic Ops */}
            <button onClick={() => handleConstantClick('π')} className={`${styles.button} ${styles.sciFunctionButton}`}>π</button>
            <button onClick={() => handleConstantClick('e')} className={`${styles.button} ${styles.sciFunctionButton}`}>e</button>
            <button onClick={() => handleUnaryOperation('10^x')} className={`${styles.button} ${styles.sciFunctionButton}`}>10ˣ</button>
            <button onClick={() => handleUnaryOperation('e^x')} className={`${styles.button} ${styles.sciFunctionButton}`}>eˣ</button>
            <button onClick={() => handleOperationClick('÷')} className={`${styles.button} ${styles.operatorButton}`}>÷</button>

            {/* Row 5: Numbers & Basic Ops */}
            <button onClick={() => handleUnaryOperation('!')} className={`${styles.button} ${styles.sciFunctionButton}`}>n!</button>
            <button onClick={() => handleNumberClick('7')} className={styles.button}>7</button>
            <button onClick={() => handleNumberClick('8')} className={styles.button}>8</button>
            <button onClick={() => handleNumberClick('9')} className={styles.button}>9</button>
            <button onClick={() => handleOperationClick('×')} className={`${styles.button} ${styles.operatorButton}`}>×</button>

            {/* Row 6: Numbers & Basic Ops */}
            <button className={`${styles.button} ${styles.placeholderButton}`}></button> {/* Placeholder */}
            <button onClick={() => handleNumberClick('4')} className={styles.button}>4</button>
            <button onClick={() => handleNumberClick('5')} className={styles.button}>5</button>
            <button onClick={() => handleNumberClick('6')} className={styles.button}>6</button>
            <button onClick={() => handleOperationClick('−')} className={`${styles.button} ${styles.operatorButton}`}>−</button>
            
            {/* Row 7: Numbers & Basic Ops */}
            <button className={`${styles.button} ${styles.placeholderButton}`}></button> {/* Placeholder */}
            <button onClick={() => handleNumberClick('1')} className={styles.button}>1</button>
            <button onClick={() => handleNumberClick('2')} className={styles.button}>2</button>
            <button onClick={() => handleNumberClick('3')} className={styles.button}>3</button>
            <button onClick={() => handleOperationClick('+')} className={`${styles.button} ${styles.operatorButton}`}>+</button>

            {/* Row 8: Numbers & Basic Ops */}
            <button className={`${styles.button} ${styles.placeholderButton}`}></button> {/* Placeholder */}
            <button onClick={() => handleNumberClick('0')} className={`${styles.button} ${styles.spanTwo}`}>0</button>
            <button onClick={() => handleNumberClick('.')} className={styles.button}>.</button>
            <button onClick={handleEqualsClick} className={`${styles.button} ${styles.operatorButton}`}>=</button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Engineering Calculator © 2023</p>
      </footer>
    </div>
  );
};

export default CalculatorPage;
