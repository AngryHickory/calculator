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