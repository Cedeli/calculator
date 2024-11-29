const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const input = display.querySelector('input');

const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '/': (a, b) => Math.round((a / b) * 100) / 100,
    '%': (a, b) => Math.round((a % b) * 100) / 100,
};

const keyMap = {
    '0': 'number', '1': 'number', '2': 'number', '3': 'number', '4': 'number',
    '5': 'number', '6': 'number', '7': 'number', '8': 'number', '9': 'number',
    '.': 'decimal', '+': 'operator', '-': 'operator', '*': 'operator', '/': 'operator',
    '%': 'operator', '=': 'equals', 'Enter': 'equals', 'Backspace': 'del', 'Delete': 'del',
    'Escape': 'clear', '_': 'negate'
};

let previousNum = null;
let currentOperation = null;
let displaySnarkyErrorMessage = false;

function updateDisplay(value) {
    input.value = value;
    if (value === 'Why?'){
        displaySnarkyErrorMessage = true;
    } else {
        ddisplaySnarkyErrorMessage = false;
    }
}

function handleNumberClick(num) {
    if (input.value === '0' || displaySnarkyErrorMessage) {
        updateDisplay('');
    }
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

    if (currentOperation === '/' && currentNum === 0) {
        updateDisplay("Why?");
        return;
    }

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

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const keyType = keyMap[key];

    if (keyType) {
        event.preventDefault();
  
        switch (keyType) {
            case 'number':
                handleNumberClick(key);
                break;
            case 'operator':
                handleOperatorClick(key);
                break;
            case 'equals':
                handleEqualsClick();
                break;
            case 'decimal':
                handleDecimalClick();
                break;
            case 'del':
                handleDeleteClick();
                break;
            case 'clear':
                handleClearClick();
                break;
            case 'negate':
                handleNegateClick();
                break;
        }
    }
});

updateDisplay(0);