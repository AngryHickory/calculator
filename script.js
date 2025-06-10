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

        if (numberButtons.includes(buttonValue)) {
            if (buttonValue === '.') {
              
                if (!currentDisplayNumber.includes('.')) {
                    if (currentDisplayNumber === "" || currentDisplayNumber === "0") {
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

            if (operator !== "") { 
    
                fullEquationDisplay = input1 + " " + displayOperator + " " + currentDisplayNumber;
            } else { 
                fullEquationDisplay = currentDisplayNumber;
            }

            screen.textContent = fullEquationDisplay;

        }
        else if (operatorButtons.includes(buttonValue)) {
           
            if (input1 === "") {
                input1 = Number(currentDisplayNumber); 

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
                console.log("Chaining operation detected.");
                console.log("Before chain: input1=", input1, "operator=", operator, "currentDisplayNumber=", currentDisplayNumber);

                let input2 = Number(currentDisplayNumber); 

                let result = operate(input1, input2, operator);

                input1 = result;

                displayOperator = buttonValue;
                operator = buttonValue; 
                if (operator === '×') {
                    operator = '*';
                } else if (operator === '÷') {
                    operator = '/';
                }

                
                currentDisplayNumber = "0";

                fullEquationDisplay = input1 + " " + displayOperator;
                screen.textContent = fullEquationDisplay;

                console.log("After chain: input1=", input1, "operator=", operator, "displayOperator=", displayOperator, "currentDisplayNumber=", currentDisplayNumber);
                console.log("Display showing:", fullEquationDisplay);
        
            }
        }
    
        else if (buttonValue === '=') {
            if (input1 !== "" && operator !== "" && currentDisplayNumber !== "0" && currentDisplayNumber !== "") {
                let input2 = Number(currentDisplayNumber); 

                
                let finalResult = operate(input1, input2, operator);

               
                if (typeof finalResult === 'string' && finalResult.startsWith('error')) {
                    fullEquationDisplay = finalResult; 
                    screen.textContent = fullEquationDisplay;

                    
                    input1 = "";
                    input2 = "";
                    operator = "";
                    currentDisplayNumber = "0";
                    displayOperator = "";
                } else {
                   
                    fullEquationDisplay = String(finalResult); 
                    screen.textContent = fullEquationDisplay;

                    
                    input1 = finalResult;      
                    currentDisplayNumber = String(finalResult); 
                                                                
                    operator = "";          
                    displayOperator = "";     
                    input2 = "";           
                }
            } else {
                
                if (input1 !== "" && operator !== "" && (currentDisplayNumber === "0" || currentDisplayNumber === "")) {
                     let input2 = input1;
                     let finalResult = operate(input1, input2, operator);

                     fullEquationDisplay = String(finalResult);
                     screen.textContent = fullEquationDisplay;

                     input1 = finalResult;
                     currentDisplayNumber = String(finalResult);
                     operator = "";
                     displayOperator = "";
                     input2 = "";
                } else if (currentDisplayNumber !== "0" && currentDisplayNumber !== "") {
           
                    fullEquationDisplay = currentDisplayNumber;
                    screen.textContent = fullEquationDisplay;
    
                    input1 = Number(currentDisplayNumber);
                    operator = "";
                    displayOperator = "";
                    input2 = "";
                }
                
            }
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

                fullEquationDisplay = input1 + " " + operator + " " + currentDisplayNumber;
            } else {

                fullEquationDisplay = currentDisplayNumber;
            }
            screen.textContent = fullEquationDisplay;
        }

        else if (buttonValue === '+/-') {
            let num = Number(currentDisplayNumber);

            if (!isNaN(num)) {
                num = num * -1;
                currentDisplayNumber = String(num); 
            } else {
                
                currentDisplayNumber = "0"; 
            }
            
        
            if (operator !== "") { 
                fullEquationDisplay = input1 + " " + displayOperator + " " + currentDisplayNumber;
            } else { 
                fullEquationDisplay = currentDisplayNumber;
            }
            
            screen.textContent = fullEquationDisplay;
        }
    });
}

document.addEventListener('keydown', function(event) {
    let pressedKey = event.key; // Gets the value of the pressed key (e.g., "5", "+", "Enter", "Backspace")

    // Define a mapping from keyboard keys to your calculator's button textContent
    const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '.': '.',
        '+': '+',
        '-': '-',
        '*': '×', // Keyboard '*' maps to calculator '×'
        '/': '÷', // Keyboard '/' maps to calculator '÷'
        'Enter': '=', // Enter key for equals
        '=': '=',     // Some keyboards have a separate '=' key without Shift
        'Backspace': 'BACKSPACE',
        'Escape': 'CLEAR' // Escape key for CLEAR
        // Add more mappings if you have other special keys (e.g., 'Delete' for CLEAR)
    };

    // Get the corresponding calculator button value from our map
    let calculatorButtonValue = keyMap[pressedKey];

    // If the pressed key is one we recognize in our map
    if (calculatorButtonValue) {
        // Prevent default browser actions for certain keys
        // (e.g., 'Enter' submitting a form, 'Backspace' navigating back, 'Space' scrolling)
        if (pressedKey === 'Enter' || pressedKey === 'Backspace' || pressedKey === ' ' || pressedKey === '/' || pressedKey === '*') {
            event.preventDefault();
        }

        // Find the actual button element in your calculator layout
        // We need to iterate through all calculatorButtons to find the one that matches
        calculatorButtons.forEach(button => {
            // Special handling for '*' and '/' because their textContent is '×' and '÷'
            let buttonText = button.textContent;
            if (calculatorButtonValue === '×' && buttonText === '×') {
                button.click();
            } else if (calculatorButtonValue === '÷' && buttonText === '÷') {
                button.click();
            } else if (buttonText === calculatorButtonValue) {
                // For all other buttons (numbers, '+', '-', '.', '=', CLEAR, BACKSPACE, +/-)
                button.click();
            }
        });
    }
});

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
    } else if (operator == "/") {
        return divide(a, b);
    } else {
        return a; 
    }
}