const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const input = display.querySelector('input');

const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '/': (a, b) => Math.round((a / b) * 100) / 100,
    '%': (a, b) => a % b,
};

let previousNum = null;
let currentOperation = null;

function updateDisplay(value) {
    input.value = value;
}

function handleNumberClick(num) {
    if (input.value === '0') updateDisplay('');
    updateDisplay(input.value + num);
}

function handleOperatorClick(operator) {
    if (previousNum === null) {
        previousNum = Number(input.value);
    } else {
        calculate();
    }
    currentOperation = operator;
    updateDisplay('');
}


function handleEqualsClick() {
    if (previousNum === null || currentOperation === null) return;
    calculate();
    currentOperation = null;
    previousNum = null;
}

function calculate() {
    const currentNum = Number(input.value);
    if (isNaN(currentNum)) return;
    const result = operations[currentOperation](previousNum, currentNum);
    updateDisplay(result);
    previousNum = result;
}


function handleDecimalClick() {
    if (!input.value.includes('.')) {
        updateDisplay(input.value + '.');
    }
}

function handleDeleteClick() {
    updateDisplay(input.value.slice(0, -1) || 0);
}

function handleClearClick() {
    updateDisplay(0);
    previousNum = null;
    currentOperation = null;
}

function handleNegateClick() {
    updateDisplay((Number(input.value) * -1).toString());
}

calculator.addEventListener('click', (event) => {
    const button = event.target;
    const buttonClassList = button.classList;

    if (buttonClassList.contains('number')) {
        handleNumberClick(button.textContent);
    } else if (buttonClassList.contains('operator')) {
        handleOperatorClick(button.textContent);
    } else if (buttonClassList.contains('equals')) {
        handleEqualsClick();
    } else if (buttonClassList.contains('decimal')) {
        handleDecimalClick();
    } else if (buttonClassList.contains('del')) {
        handleDeleteClick();
    } else if (buttonClassList.contains('clear')) {
        handleClearClick();
    } else if (buttonClassList.contains('negate')) {
        handleNegateClick();
    }
});

updateDisplay(0);