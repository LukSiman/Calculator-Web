const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const tracker = document.querySelector('#tracker');
const clear = document.querySelector('#clear');
const solve = document.querySelector('#solve');
const decimal = document.querySelector('#decimal');
const back = document.querySelector('#back');

let clearedValue = true;
let firstOperand;
let secondOperand;
let operator;


//Prevent enter from firing focused buttons
document.addEventListener('keydown', function (key) {
    if (key.code === 13 || key.key === 'Enter') {
        key.preventDefault();
        return false;
    }    
});

//Takes keyboard inputs and calls the correct function
document.addEventListener('keydown', (key) => {
    let button = key.key;

    if (isFinite(button)) {
        numberLogic(button);
    } else if (button.match(/^(\*|\-|\+|\/)$/)) {
        operatorLogic(button);
    } else if (button.match(/^(\.)$/)) {
        decimalLogic(button);
    } else if (button.match(/^(Enter|\=)$/)) {
        solveLogic();
    } else if (button.match(/^(Backspace)$/)) {
        backspaceLogic();
    }
});

//Add numbers to the display
numbers.forEach((button) => {
    button.addEventListener('click', () => {
        numberLogic(button.textContent);
    });
});

//Functionality for number buttons
function numberLogic(button) {

    if(clearedValue && firstOperand === undefined){
        tracker.textContent = '';
    }

    if (clearedValue) {
        display.textContent = button;
        clearedValue = false;
    } else {
        if (display.textContent.length <= 14) {
            display.textContent += button;
        }
    }

    if(operator !== undefined){
        secondOperand = display.textContent;
    }
}

//Set the operator
operators.forEach((button) => {
    button.addEventListener('click', () => {
        operatorLogic(button.textContent);
    });
});

//Functionality for operator buttons
function operatorLogic(button) {
    
    checkOperandPosition();

    // if operator was already set solve the operation
    if (operator !== undefined && secondOperand !== undefined) {
        solveDisplay();
        secondOperand = undefined;
    }

    operator = button;   

    if(operator !== undefined){
        tracker.textContent = firstOperand + ' ' + operator;
    }
};

//Sets first and second operand according to operator value
function checkOperandPosition() {
    if (operator === undefined) {
        firstOperand = display.textContent;
        clearedValue = true;
    }
}

//Add decimal if no decimals are already added
decimal.addEventListener('click', () => {
    decimalLogic(decimal.textContent);
});

//Functionality for decimal
function decimalLogic(button) {
    if (!display.textContent.includes('.')) {
        display.textContent += button;
        clearedValue = false;
    }
}

//Solve the operation
solve.addEventListener('click', solveLogic);

//Functionality for solving the calculation
function solveLogic() {
    if (!clearedValue && operator !== undefined) {
        solveDisplay();
        tracker.textContent = tracker.textContent + ' ' + secondOperand + ' = ';
        clearValues();
    }
}

//Solves the operation
function solveDisplay() {
    display.textContent = operate(operator, Number(firstOperand), Number(secondOperand));
    
    operator = undefined;    
    clearedValue = true;
    firstOperand = display.textContent;

    if (display.textContent.length > 16) {
        display.style.fontSize = '22px';
    }
}

//Clear the display
clear.addEventListener('click', () => {
    display.textContent = '0';
    tracker.textContent = '';
    display.style.fontSize = '25px';
    clearValues();
});

//Backspace on entered numbers
back.addEventListener('click', backspaceLogic);

//Functionality for deleting numbers from display
function backspaceLogic() {
    display.textContent = display.textContent.slice(0, length - 1);
    if (display.textContent === '') {
        display.textContent = 0;
        clearedValue = true;
    }
}

//Clears values to default 
function clearValues() {
    clearedValue = true;
    operator = undefined;
    firstOperand = undefined;
    secondOperand = undefined;    
}

//Calls math function according to operator value
function operate(operator, numberOne, numberTwo) {
    switch (operator) {
        case "+":
            return add(numberOne, numberTwo);
        case "-":
            return subtract(numberOne, numberTwo);
        case "*":
            return multipy(numberOne, numberTwo);
        case "/":
            return divide(numberOne, numberTwo);
    }
}

//Calculates addition
function add(numberOne, numberTwo) {
    return Math.round((numberOne + numberTwo) * 100) / 100;
}

//Calculates subtraction
function subtract(numberOne, numberTwo) {
    return Math.round((numberOne - numberTwo) * 100) / 100;
}

//Calculates multiplication
function multipy(numberOne, numberTwo) {
    return Math.round((numberOne * numberTwo) * 100) / 100;
}

//Calculates division
function divide(numberOne, numberTwo) {
    if (secondOperand == 0) {
        display.style.fontSize = '19px';
        return 'Nuclear missile launched!';
    }

    return Math.round((numberOne / numberTwo) * 100) / 100;
}