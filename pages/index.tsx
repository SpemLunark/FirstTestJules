import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Calculator.module.css';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect

const CalculatorPage: NextPage = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('0');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(true); // To overwrite currentOperand after an operation or equals

  const handleNumberClick = (number: string) => {
    if (overwrite) {
      setCurrentOperand(number);
      setOverwrite(false);
    } else {
      // Prevent multiple zeros at the beginning
      if (currentOperand === '0' && number === '0') return;
      // Prevent multiple decimal points
      if (number === '.' && currentOperand.includes('.')) return;
      // If currentOperand is '0' and a non-zero number is pressed, replace '0'
      if (currentOperand === '0' && number !== '.') {
        setCurrentOperand(number);
      } else {
        setCurrentOperand(prev => prev + number);
      }
    }
  };

  const handleOperationClick = (op: string) => {
    if (currentOperand === '' && previousOperand === null) return;

    if (previousOperand !== null && !overwrite) { // If there's a previous operand and new numbers were entered, calculate first
      calculate();
    }
    
    setOperation(op);
    setPreviousOperand(currentOperand);
    setOverwrite(true);
  };

  const calculate = () => {
    if (previousOperand === null || operation === null || currentOperand === '') return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result: number = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '−': // Using minus sign, not hyphen
        result = prev - current;
        break;
      case '×': // Using multiplication sign
        result = prev * current;
        break;
      case '÷': // Using division sign
        if (current === 0) {
          setCurrentOperand('Error');
          setPreviousOperand(null);
          setOperation(null);
          setOverwrite(true);
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setPreviousOperand(null); // Clear previous operand after calculation
    setOperation(null); // Clear operation after calculation
    setOverwrite(true); // Ready to overwrite with new input or after next operation
  };

  const handleEqualsClick = () => {
    calculate();
    // After equals, we might want to allow starting a new calculation or continuing with the result.
    // For now, keep the result in currentOperand, ready to be overwritten or used in a new operation.
    // setPreviousOperand(null); // Already handled in calculate
    // setOperation(null); // Already handled in calculate
  };

  const handleClearClick = () => {
    setCurrentOperand('0');
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  const handleDeleteClick = () => {
    if (overwrite) { // If about to overwrite, clear instead of deleting
        setCurrentOperand('0');
        setOverwrite(true); // Keep it true so next number replaces 0
        return;
    }
    if (currentOperand.length === 1) {
      setCurrentOperand('0');
      setOverwrite(true); // If only one digit, reset to 0 and allow overwrite
    } else {
      setCurrentOperand(prev => prev.slice(0, -1));
    }
  };

  // Placeholder for percentage, will be refined later
  const handlePercentageClick = () => {
    if (currentOperand === 'Error' || currentOperand === '') return;
    const currentValue = parseFloat(currentOperand);
    setCurrentOperand((currentValue / 100).toString());
    setOverwrite(true); // Result of an operation
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
          </div>

          <div className={styles.buttonGrid}>
            <button onClick={handleClearClick} className={`${styles.button} ${styles.functionButton}`}>AC</button>
            <button onClick={handleDeleteClick} className={`${styles.button} ${styles.functionButton}`}>DEL</button>
            <button onClick={handlePercentageClick} className={`${styles.button} ${styles.functionButton}`}>%</button>
            <button onClick={() => handleOperationClick('÷')} className={`${styles.button} ${styles.operatorButton}`}>÷</button>

            <button onClick={() => handleNumberClick('7')} className={styles.button}>7</button>
            <button onClick={() => handleNumberClick('8')} className={styles.button}>8</button>
            <button onClick={() => handleNumberClick('9')} className={styles.button}>9</button>
            <button onClick={() => handleOperationClick('×')} className={`${styles.button} ${styles.operatorButton}`}>×</button>

            <button onClick={() => handleNumberClick('4')} className={styles.button}>4</button>
            <button onClick={() => handleNumberClick('5')} className={styles.button}>5</button>
            <button onClick={() => handleNumberClick('6')} className={styles.button}>6</button>
            <button onClick={() => handleOperationClick('−')} className={`${styles.button} ${styles.operatorButton}`}>−</button>

            <button onClick={() => handleNumberClick('1')} className={styles.button}>1</button>
            <button onClick={() => handleNumberClick('2')} className={styles.button}>2</button>
            <button onClick={() => handleNumberClick('3')} className={styles.button}>3</button>
            <button onClick={() => handleOperationClick('+')} className={`${styles.button} ${styles.operatorButton}`}>+</button>

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
