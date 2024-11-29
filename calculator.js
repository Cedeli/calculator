const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const input = display.querySelector('input');

input.value = 0;
let previousNum = 0;
let operation = '+';

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            console.log(`${a} + ${b}`);
            return add(a, b);
        case '-':
            console.log(`${a} - ${b}`);
            return subtract(a, b);
        case 'x':
            console.log(`${a} * ${b}`);
            return multiply(a, b);
        case '/':
            console.log(`${a} / ${b}`);
            return divide(a, b);
        default:
            throw new Error('Invalid operator.');
    }
}

buttons.forEach((button) => {
    if (button.classList.contains('number') || button.classList.contains('decimal')) {
        button.addEventListener('click', () => {
            if (input.value == 0) input.value = '';
            input.value += button.textContent;
        });
    }

    if (button.classList.contains('operator')) {
        button.addEventListener('click', () => {
            operation = button.textContent;
            previousNum = input.value;
            input.value = '';
        });
    }

    if (button.classList.contains('equals')) {
        button.addEventListener('click', () => {
            if (!input.value || !previousNum) return;
            let ans = operate(Number(previousNum), Number(input.value), operation);
            input.value = ans;
            previousNum = NaN;
        });
    }

    if (button.classList.contains('del')) {
        button.addEventListener('click', () => {
            let strValue = String(input.value);
            if (strValue.length <= 0) return; 

            let trimmedValue = strValue.substring(0, strValue.length - 1);
            input.value = Number(trimmedValue);
        });
    }

    if (button.classList.contains('clear')) {
        button.addEventListener('click', () => {
            input.value = '';
            previousNum = NaN;
        });
    }
});