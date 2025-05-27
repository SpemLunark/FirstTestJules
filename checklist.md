# Engineering Calculator Development Checklist

## Phase 1: Project Setup & Basic Structure
- [x] Initialize Git repository and create `develop` branch. (Partially done - branch will be handled by Jules)
- [x] Create basic HTML structure (`index.html`):
    - [x] Display area (for input and results)
    - [x] Button grid container
- [x] Create basic CSS file (`style.css`):
    - [x] Initial styling for layout, display, and buttons.
- [x] Create JavaScript file (`script.js`).

## Phase 2: Core Calculator Logic (JavaScript)
- [x] Implement number input (0-9, .).
- [x] Implement basic arithmetic operators (+, -, *, /).
- [x] Implement clear (C/AC) and backspace/delete functionality.
- [x] Implement equals (=) button to perform calculation.
- [x] Handle order of operations (PEMDAS/BODMAS) if complex expressions are to be input directly. (Alternatively, adopt an immediate execution model).
- [x] Display input and results dynamically.
- [x] Implement error handling (e.g., division by zero, invalid input).

## Phase 3: Scientific Functions (JavaScript)
- [x] Implement trigonometric functions (sin, cos, tan).
    - [x] Add Deg/Rad mode toggle and functionality.
- [x] Implement inverse trigonometric functions (asin, acos, atan).
- [x] Implement logarithmic functions (ln, log).
- [x] Implement exponential functions (e^x, 10^x).
- [x] Implement power function (x^y).
- [x] Implement square root (√).
- [x] Implement Pi (π) and Euler's (e) constants.
- [x] Implement factorial (n!).
- [x] Implement absolute value (|x|).

## Phase 4: Memory Functions (JavaScript)
- [x] Implement Memory Clear (MC).
- [x] Implement Memory Recall (MR).
- [x] Implement Memory Add (M+).
- [x] Implement Memory Subtract (M-).
- [x] Visual indicator for memory state (e.g., "M" symbol on display).

## Phase 5: Calculation History (JavaScript & HTML/CSS)
- [x] Design HTML structure for history display.
- [x] Style history display using CSS.
- [x] Implement JavaScript to record calculations in history.
- [x] Implement functionality to click history items to reuse them.
- [x] Implement functionality to clear history.

## Phase 6: UI/UX Enhancements & Styling
- [x] Refine CSS for a polished look and feel.
- [ ] Ensure responsive design for desktop, tablets, and mobile devices.
    - [ ] Test on various screen sizes/emulators.
- [ ] Implement keyboard support for input and operations.
- [x] Add hover and active states for buttons.
- [x] Ensure accessibility (ARIA attributes, keyboard navigation).

## Phase 7: Testing & Refinement
- [ ] Perform thorough unit testing for all functions.
    - [ ] Test edge cases (e.g., negative numbers, zero, large numbers, repeated operations).
    - [ ] Test sequence of operations.
- [ ] Perform cross-browser testing (Chrome, Firefox, Safari, Edge).
- [ ] Perform usability testing.
- [ ] Debug and fix any identified issues.
- [ ] Code review and refactoring.

## Phase 8: Documentation & Deployment
- [ ] Add comments to code where necessary.
- [ ] Create a `README.md` with instructions on how to use the calculator and set up the project. (Jules will likely handle initial README, may need updates).
- [ ] Prepare for deployment (e.g., minify CSS/JS).
- [ ] Deploy to a web server or hosting platform (e.g., GitHub Pages, Netlify).

## Optional/Future Enhancements (Post MVP)
- [ ] Investigate Modulus (%) operator.
- [ ] Graphing capabilities.
- [ ] Unit conversions.
- [ ] Programmable functions.
- [ ] User accounts and themes.
