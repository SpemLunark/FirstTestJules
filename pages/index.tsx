import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Calculator.module.css';

const CalculatorPage: NextPage = () => {
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
          {/* Display Area */}
          <div className={styles.display}>
            <div className={styles.previousOperand}></div>
            <div className={styles.currentOperand}>0</div>
          </div>

          {/* Button Grid */}
          <div className={styles.buttonGrid}>
            {/* This will be populated with buttons later */}
            <button className={styles.button}>AC</button>
            <button className={styles.button}>DEL</button>
            <button className={styles.button}>%</button>
            <button className={styles.button}>÷</button>

            <button className={styles.button}>7</button>
            <button className={styles.button}>8</button>
            <button className={styles.button}>9</button>
            <button className={styles.button}>×</button>

            <button className={styles.button}>4</button>
            <button className={styles.button}>5</button>
            <button className={styles.button}>6</button>
            <button className={styles.button}>−</button>

            <button className={styles.button}>1</button>
            <button className={styles.button}>2</button>
            <button className={styles.button}>3</button>
            <button className={styles.button}>+</button>

            <button className={`${styles.button} ${styles.spanTwo}`}>0</button>
            <button className={styles.button}>.</button>
            <button className={styles.button}>=</button>
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
