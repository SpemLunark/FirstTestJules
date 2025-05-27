# Engineering Calculator Development Checklist

## Phase 1: Project Setup & Basic Structure
- [ ] Initialize Git repository and create `develop` branch. (Partially done - branch will be handled by Jules)
- [ ] Create basic HTML structure (`index.html`):
    - [ ] Display area (for input and results)
    - [ ] Button grid container
- [ ] Create basic CSS file (`style.css`):
    - [ ] Initial styling for layout, display, and buttons.
- [ ] Create JavaScript file (`script.js`).

## Phase 2: Core Calculator Logic (JavaScript)
- [ ] Implement number input (0-9, .).
- [ ] Implement basic arithmetic operators (+, -, *, /).
- [ ] Implement clear (C/AC) and backspace/delete functionality.
- [ ] Implement equals (=) button to perform calculation.
- [ ] Handle order of operations (PEMDAS/BODMAS) if complex expressions are to be input directly. (Alternatively, adopt an immediate execution model).
- [ ] Display input and results dynamically.
- [ ] Implement error handling (e.g., division by zero, invalid input).

## Phase 3: Scientific Functions (JavaScript)
- [ ] Implement trigonometric functions (sin, cos, tan).
    - [ ] Add Deg/Rad mode toggle and functionality.
- [ ] Implement inverse trigonometric functions (asin, acos, atan).
- [ ] Implement logarithmic functions (ln, log).
- [ ] Implement exponential functions (e^x, 10^x).
- [ ] Implement power function (x^y).
- [ ] Implement square root (√).
- [ ] Implement Pi (π) and Euler's (e) constants.
- [ ] Implement factorial (n!).
- [ ] Implement absolute value (|x|).

## Phase 4: Memory Functions (JavaScript)
- [ ] Implement Memory Clear (MC).
- [ ] Implement Memory Recall (MR).
- [ ] Implement Memory Add (M+).
- [ ] Implement Memory Subtract (M-).
- [ ] Visual indicator for memory state (e.g., "M" symbol on display).

## Phase 5: Calculation History (JavaScript & HTML/CSS)
- [ ] Design HTML structure for history display.
- [ ] Style history display using CSS.
- [ ] Implement JavaScript to record calculations in history.
- [ ] Implement functionality to click history items to reuse them.
- [ ] Implement functionality to clear history.

## Phase 6: UI/UX Enhancements & Styling
- [ ] Refine CSS for a polished look and feel.
- [ ] Ensure responsive design for desktop, tablets, and mobile devices.
    - [ ] Test on various screen sizes/emulators.
- [ ] Implement keyboard support for input and operations.
- [ ] Add hover and active states for buttons.
- [ ] Ensure accessibility (ARIA attributes, keyboard navigation).

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
