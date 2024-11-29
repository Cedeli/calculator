const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const input = display.querySelector('input');

let operation = '+';
let previousNum = 0;

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
        })
    }
});