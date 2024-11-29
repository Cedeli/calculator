const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const input = display.querySelector('input');

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
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
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
});