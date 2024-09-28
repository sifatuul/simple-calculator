// Select the calculator and display elements
const calculator = document.querySelector('.calculator');
const resultDisplay = document.querySelector('.result');
const operationDisplay = document.querySelector('.operation');

// Track the current input and result
let currentInput = '';
let previousInput = '';
let operator = null;
let resetScreen = false;

// Function to update the display
function updateDisplay() {
  operationDisplay.textContent = previousInput + (operator || '') + currentInput;
  resultDisplay.textContent = currentInput || '0';
}

// Function to handle calculations
function calculate() {
  if (previousInput && currentInput && operator) {
    const result = eval(`${previousInput} ${operator} ${currentInput}`);
    currentInput = result.toString();
    previousInput = '';
    operator = null;
    resetScreen = true;
  }
}

// Handle number and operator buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (/\d/.test(value) || value === '.') {
      // Append numbers and decimal to the current input
      if (resetScreen) {
        currentInput = value;
        resetScreen = false;
      } else {
        currentInput += value;
      }
    } else if (value === 'AC') {
      currentInput = '';
      previousInput = '';
      operator = null;
    } else if (value === '⌫') {
      currentInput = currentInput.slice(0, -1);
    } else if (value === '=') {
      calculate();
    } else {
      // Handle operator buttons
      if (currentInput) {
        if (previousInput && operator) {
          calculate();
        } else {
          previousInput = currentInput;
          currentInput = '';
        }
      }
      operator = value === '×' ? '*' : value === '−' ? '-' : value;
    }

    updateDisplay();
  });
});

// Toggle between dark and light mode
document.getElementById('toggle-theme').addEventListener('click', () => {
  calculator.classList.toggle('light-mode');
  calculator.classList.toggle('dark-mode');
  const themeIcon = document.getElementById('toggle-theme');
  themeIcon.textContent = calculator.classList.contains('light-mode') ? '☀️' : '🌙';
});
