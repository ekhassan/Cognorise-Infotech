let currentInput = '';
let currentOperator = '';
let previousInput = '';

function appendNumber(number) {
    if (currentInput.length >= 10) return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    previousInput = currentInput;
    currentOperator = operator;
    currentInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = currentInput || previousInput || '0';
}
