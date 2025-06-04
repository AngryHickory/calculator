let input1 = "";
let input2 = "";
let operator = "";
let currentDisplayNumber = "0";
let fullEquationDisplay = "0";
let displayOperator = "";

const screen = document.getElementById('screen');
screen.textContent = currentDisplayNumber;

const numberButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operatorButtons = ['+', '-', '×', '÷'];

const calculatorButtons = document.querySelectorAll('.buttons');


for (let i = 0; i < calculatorButtons.length; i++) {
    const button = calculatorButtons[i];

    button.addEventListener('click', function() {
        const buttonValue = this.textContent;

        // Number and Decimal Buttons
        if (numberButtons.includes(buttonValue)) {
            if (buttonValue === '.') {
                // Logic for decimal point
                if (!currentDisplayNumber.includes('.')) {
                    if (currentDisplayNumber === "" || currentDisplayNumber === "0") {
                        currentDisplayNumber = "0.";
                    } else {
                        currentDisplayNumber += buttonValue;
                    }
                }
            } else { // Logic for digits (0-9)
                if (currentDisplayNumber === "0") {
                    currentDisplayNumber = buttonValue; // Replace "0" with the new digit
                } else {
                    currentDisplayNumber += buttonValue; // Append the digit
                }
            }

            if (operator !== "") { // If an operator is already set, it means we are typing input2
                // We need to rebuild the fullEquationDisplay
                fullEquationDisplay = input1 + " " + displayOperator + " " + currentDisplayNumber;
            } else { // No operator yet, so just show the current number being typed
                fullEquationDisplay = currentDisplayNumber;
            }

            screen.textContent = fullEquationDisplay; // Update display after number input

        }
        // Button Clicks
        else if (operatorButtons.includes(buttonValue)) {
            // If input1 is empty, it means this is the first number being entered
            if (input1 === "") {
                input1 = Number(currentDisplayNumber); // Store current display as input1 (convert to number)

                displayOperator = buttonValue;
                
                operator = buttonValue;
                if (operator === '×') {
                    operator = '*';
                } else if (operator === '÷') {
                    operator = '/';
                }
                
                currentDisplayNumber = "0"; 
                fullEquationDisplay = input1 + " " + displayOperator;

                console.log("Input1 set:", input1);
                console.log("Operator set:", operator);
                console.log("Display cleared for next input.");
                screen.textContent = fullEquationDisplay;
            } else {
                // Chaining operations 
        
            }
        }
    
        else if (buttonValue === '=') {
            

        }
        else if (buttonValue === 'CLEAR') {
            console.log("CLEAR clicked. Reset all variables and screen.");
            input1 = "";
            input2 = "";
            operator = "";
            currentDisplayNumber = "0";
            fullEquationDisplay = "0";
            screen.textContent = fullEquationDisplay;
        }

        else if (buttonValue === 'BACKSPACE') {
            console.log("BACKSPACE clicked. Remove last digit.");
            if (currentDisplayNumber.length > 1) {
                currentDisplayNumber = currentDisplayNumber.slice(0, -1); 
            } else {
                currentDisplayNumber = "0"; 
            }

            if (operator !== "") {
                // If there's an operator, we're editing input2 (currentDisplayNumber)
                fullEquationDisplay = input1 + " " + operator + " " + currentDisplayNumber;
            } else {
                // Otherwise, we're editing input1 (currentDisplayNumber)
                fullEquationDisplay = currentDisplayNumber;
            }
            screen.textContent = fullEquationDisplay;
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