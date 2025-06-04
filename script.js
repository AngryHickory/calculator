let input1 = "";
let input2 = "";
let operator = "";
let currentDisplayNumber = "0";

const screen = document.getElementById('screen');
screen.textContent = currentDisplayNumber;

const numberButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operatorButtons = ['+', '-', '×', '÷'];

const calculatorButtons = document.querySelectorAll('.buttons');


for (let i = 0; i < calculatorButtons.length; i++) {
    const button = calculatorButtons[i];

    button.addEventListener('click', function() {
        const buttonValue = this.textContent;
        
        if (numberButtons.includes(buttonValue)) {
          if (buttonValue === '.') {
            // Check if currentDisplayNumber already has a decimal point
            if (!currentDisplayNumber.includes('.')) {
                // Check if it's empty, add a 0 before the decimal if so
                if (currentDisplayNumber === "") {
                    currentDisplayNumber = "0.";
                } else {
                    currentDisplayNumber += buttonValue;
                }
            }
          } else {
            if (currentDisplayNumber === "0") {
                currentDisplayNumber = buttonValue;
            } else {
                currentDisplayNumber += buttonValue;
            }
          }
          screen.textContent = currentDisplayNumber;

    } 
    });
}

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
    if (b === 0) {
        return "error - can't divide by 0";
    }
    return a / b;
}

function operate(a, b, operator) {
    if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "*") {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }

}