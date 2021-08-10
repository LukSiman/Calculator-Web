const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const clear = document.querySelector('#clear');
const solve = document.querySelector('#solve');
const decimal = document.querySelector('#decimal');
const back = document.querySelector('#back');

let clearedValue = true;
let firstOperand;
let secondOperand;
let operator;

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
    } else if(button.match(/^(Backspace)$/)){
        console.log(button);

    }

    //add click on keyboard?

});

//Add numbers to the display
numbers.forEach((button) => {
    button.addEventListener('click', () => {
        numberLogic(button.textContent);
    });
});

//Functionality for number buttons
function numberLogic(button) {
    if (clearedValue) {
        display.textContent = button;
        clearedValue = false;
    } else {
        if (display.textContent.length <= 14) {
            display.textContent += button;
        }
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
    }

    operator = button;
};

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
    checkOperandPosition();

    if (!clearedValue && operator !== undefined) {
        solveDisplay();

        if (display.textContent.length > 16) {
            display.style.fontSize = '21px';
        }

        clearValues();
    }
}

//Clear the display
clear.addEventListener('click', () => {
    display.textContent = '0';
    display.style.fontSize = '25px';
    clearValues();
});

//Backspace on entered numbers
back.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, length - 1);
    if (display.textContent === '') {
        display.textContent = 0;
        clearedValue = true;
    }
});



//Sets first and second operand according to operator value
function checkOperandPosition() {
    if (operator === undefined) {
        firstOperand = display.textContent;
        clearedValue = true;
    } else {
        secondOperand = display.textContent;
    }
}

//Solves the operation
function solveDisplay() {
    display.textContent = operate(operator, Number(firstOperand), Number(secondOperand));
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