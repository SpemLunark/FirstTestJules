import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Calculator.module.css';
import React, { useState, useEffect } from 'react';

const CalculatorPage: NextPage = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('0');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(true);
  const [angleMode, setAngleMode] = useState<'Degrees' | 'Radians'>('Degrees');
  const [memoryValue, setMemoryValue] = useState<number | null>(null); // For M+, M-, MR, MC
  const [showMemoryIndicator, setShowMemoryIndicator] = useState<boolean>(false); // To show 'M'

  // Helper to convert angle based on mode
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
  const toDegrees = (radians: number): number => radians * (180 / Math.PI);

  const handleNumberClick = (number: string) => {
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
    if (currentOperand === '' && previousOperand === null && !['√', 'ln', 'log', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', '!', 'abs', '10^x', 'e^x'].includes(op)) return;

    if (['√', 'ln', 'log', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', '!', 'abs', '10^x', 'e^x'].includes(op)) {
        handleUnaryOperation(op);
        return;
    }
    
    if (op === 'x^y') {
        setOperation('^');
        setPreviousOperand(currentOperand);
        setOverwrite(true);
        return;
    }

    // If there's a previous operation and new numbers were entered, calculate first.
    // This check prevents immediate calculation if user clicks multiple operator buttons.
    if (previousOperand !== null && operation !== null && !overwrite) {
      calculate();
      // After calculate, currentOperand has the result. This result should become the previousOperand for the new operation.
      setPreviousOperand(currentOperand); 
    } else {
      // No calculation was pending or we are overwriting, so set current as previous.
      setPreviousOperand(currentOperand);
    }
    
    setOperation(op);
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
      case 'log':
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
      case '!':
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
    setPreviousOperand(null); 
    setOperation(null);
    setOverwrite(true);
  };

  const calculate = () => {
    if (previousOperand === null || operation === null || currentOperand === '' || currentOperand === 'Error') return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result: number = 0;

    switch (operation) {
      case '+': result = prev + current; break;
      case '−': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷':
        if (current === 0) { setCurrentOperand('Error'); setPreviousOperand(null); setOperation(null); setOverwrite(true); return; }
        result = prev / current;
        break;
      case '^': result = Math.pow(prev, current); break;
      default: return;
    }

    setCurrentOperand(result.toString());
    setPreviousOperand(null); // Clear previous operand after calculation
    setOperation(null);     // Clear operation after calculation
    setOverwrite(true);     // Result overwrites next number input
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
    if (overwrite) { setCurrentOperand('0'); setOverwrite(true); return; }
    if (currentOperand === 'Error') { setCurrentOperand('0'); setOverwrite(true); return;}
    if (currentOperand.length === 1) { setCurrentOperand('0'); setOverwrite(true); }
    else { setCurrentOperand(prev => prev.slice(0, -1)); }
  };

  const handlePercentageClick = () => {
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
    setOverwrite(false); 
  };
  
  const toggleAngleMode = () => {
    setAngleMode(prevMode => prevMode === 'Degrees' ? 'Radians' : 'Degrees');
  };

  // Memory Functions
  const handleMemoryClear = () => {
    setMemoryValue(null);
    setShowMemoryIndicator(false);
  };

  const handleMemoryRecall = () => {
    if (memoryValue !== null) {
      setCurrentOperand(memoryValue.toString());
      setOverwrite(true); 
    }
  };

  const handleMemoryAdd = () => {
    if (currentOperand === 'Error') return;
    const currentValue = parseFloat(currentOperand);
    if (isNaN(currentValue)) return;

    setMemoryValue(prevMemory => (prevMemory === null ? 0 : prevMemory) + currentValue);
    setShowMemoryIndicator(true);
    setOverwrite(true); 
  };

  const handleMemorySubtract = () => {
    if (currentOperand === 'Error') return;
    const currentValue = parseFloat(currentOperand);
    if (isNaN(currentValue)) return;
    
    setMemoryValue(prevMemory => (prevMemory === null ? 0 : prevMemory) - currentValue);
    setShowMemoryIndicator(true);
    setOverwrite(true); 
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
            <div className={styles.memoryIndicator}>{showMemoryIndicator ? 'M' : ''}</div>
            <div className={styles.angleModeDisplay} onClick={toggleAngleMode} title="Toggle Angle Mode">
                {angleMode}
            </div>
            <div className={styles.previousOperand}>
              {previousOperand} {operation}
            </div>
            <div className={styles.currentOperand}>{currentOperand}</div>
          </div>

          <div className={`${styles.buttonGrid} ${styles.scientificGridSixCol}`}>
            {/* Row 1: Memory Functions & Angle Mode */}
            <button onClick={handleMemoryClear} className={`${styles.button} ${styles.memoryButton}`}>MC</button>
            <button onClick={handleMemoryRecall} className={`${styles.button} ${styles.memoryButton}`}>MR</button>
            <button onClick={handleMemoryAdd} className={`${styles.button} ${styles.memoryButton}`}>M+</button>
            <button onClick={handleMemorySubtract} className={`${styles.button} ${styles.memoryButton}`}>M-</button>
            <button onClick={toggleAngleMode} className={`${styles.button} ${styles.sciFunctionButton}`}>{angleMode === 'Degrees' ? 'Rad' : 'Deg'}</button>
            <button onClick={() => handleUnaryOperation('abs')} className={`${styles.button} ${styles.sciFunctionButton}`}>|x|</button>

            {/* Row 2: Sci Functions & AC/DEL */}
            <button onClick={() => handleUnaryOperation('sin')} className={`${styles.button} ${styles.sciFunctionButton}`}>sin</button>
            <button onClick={() => handleUnaryOperation('cos')} className={`${styles.button} ${styles.sciFunctionButton}`}>cos</button>
            <button onClick={() => handleUnaryOperation('tan')} className={`${styles.button} ${styles.sciFunctionButton}`}>tan</button>
            <button onClick={() => handleUnaryOperation('√')} className={`${styles.button} ${styles.sciFunctionButton}`}>√</button>
            <button onClick={handleClearClick} className={`${styles.button} ${styles.functionButton}`}>AC</button>
            <button onClick={handleDeleteClick} className={`${styles.button} ${styles.functionButton}`}>DEL</button>
            
            {/* Row 3: Inverse Sci Functions & x^y, n!, % */}
            <button onClick={() => handleUnaryOperation('asin')} className={`${styles.button} ${styles.sciFunctionButton}`}>sin⁻¹</button>
            <button onClick={() => handleUnaryOperation('acos')} className={`${styles.button} ${styles.sciFunctionButton}`}>cos⁻¹</button>
            <button onClick={() => handleUnaryOperation('atan')} className={`${styles.button} ${styles.sciFunctionButton}`}>tan⁻¹</button>
            <button onClick={() => handleOperationClick('x^y')} className={`${styles.button} ${styles.sciFunctionButton}`}>xʸ</button>
            <button onClick={() => handleUnaryOperation('!')} className={`${styles.button} ${styles.sciFunctionButton}`}>n!</button>
            <button onClick={handlePercentageClick} className={`${styles.button} ${styles.functionButton}`}>%</button>

            {/* Row 4: Logs, Exponents, Constants */}
            <button onClick={() => handleUnaryOperation('ln')} className={`${styles.button} ${styles.sciFunctionButton}`}>ln</button>
            <button onClick={() => handleUnaryOperation('log')} className={`${styles.button} ${styles.sciFunctionButton}`}>log</button>
            <button onClick={() => handleUnaryOperation('e^x')} className={`${styles.button} ${styles.sciFunctionButton}`}>eˣ</button>
            <button onClick={() => handleUnaryOperation('10^x')} className={`${styles.button} ${styles.sciFunctionButton}`}>10ˣ</button>
            <button onClick={() => handleConstantClick('π')} className={`${styles.button} ${styles.sciFunctionButton}`}>π</button>
            <button onClick={() => handleConstantClick('e')} className={`${styles.button} ${styles.sciFunctionButton}`}>e</button>

            {/* Row 5 Adjusted */}
            <button onClick={() => handleNumberClick('7')} className={styles.button}>7</button>
            <button onClick={() => handleNumberClick('8')} className={styles.button}>8</button>
            <button onClick={() => handleNumberClick('9')} className={styles.button}>9</button>
            <button className={`${styles.button} ${styles.placeholderButton}`}></button> {/* P */}
            <button onClick={() => handleOperationClick('÷')} className={`${styles.button} ${styles.operatorButton}`}>÷</button>
            <button onClick={() => handleOperationClick('×')} className={`${styles.button} ${styles.operatorButton}`}>×</button>

            {/* Row 6 Adjusted */}
            <button onClick={() => handleNumberClick('4')} className={styles.button}>4</button>
            <button onClick={() => handleNumberClick('5')} className={styles.button}>5</button>
            <button onClick={() => handleNumberClick('6')} className={styles.button}>6</button>
            <button className={`${styles.button} ${styles.placeholderButton}`}></button> {/* P */}
            <button onClick={() => handleOperationClick('−')} className={`${styles.button} ${styles.operatorButton}`}>−</button>
            <button onClick={() => handleOperationClick('+')} className={`${styles.button} ${styles.operatorButton}`}>+</button>

            {/* Row 7 Adjusted - 0 now spans 3 columns to make space for . and = */}
            <button onClick={() => handleNumberClick('1')} className={styles.button}>1</button>
            <button onClick={() => handleNumberClick('2')} className={styles.button}>2</button>
            <button onClick={() => handleNumberClick('3')} className={styles.button}>3</button>
            <button onClick={() => handleNumberClick('0')} className={`${styles.button} ${styles.spanThree}`}>0</button> {/* Spans 3 columns */}
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
