const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const clear = document.querySelector('#clear');
const solve = document.querySelector('#solve');
const decimal = document.querySelector('#decimal');

let clearedValue = true;
let firstValue;
let secondValue;
let operator;

numbers.forEach((button) => {
    button.addEventListener('click', () => {
        const length = display.textContent.length;

        if (clearedValue) {
            display.textContent = button.textContent;
            clearedValue = false;
        } else {
            if (length <= 14) {
                display.textContent += button.textContent;
            }
        }    
    });
});

operators.forEach((button) => {
    button.addEventListener('click', () => {
        checkValuePosition();

        if (operator !== undefined && secondValue !== undefined) {
            solveDisplay();
        }

        operator = button.textContent;
    });
});

decimal.addEventListener('click', () => {
    if(!display.textContent.includes('.')){
        display.textContent += decimal.textContent;
        clearedValue = false;
    }   
});

clear.addEventListener('click', () => {
    display.textContent = '0';
    display.style.fontSize = '25px';
    clearValues();
});

solve.addEventListener('click', () =>{
    checkValuePosition();

    if(!clearedValue && operator !== undefined){
        solveDisplay();

        if(display.textContent.length >16){
            display.style.fontSize = '21px';
        }
        
        clearValues();
    }
});

function checkValuePosition() {
    if (operator === undefined) {
        firstValue = display.textContent;
        clearedValue = true;
    } else {
        secondValue = display.textContent;
    }    
}

function solveDisplay(){
    display.textContent = operate(operator, Number(firstValue), Number(secondValue));
}

function clearValues(){
    clearedValue = true;
    operator = undefined;
    firstValue = undefined;
    secondValue = undefined;
}

function operate(operator, numberOne, numberTwo){
    switch(operator){
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

function add(numberOne, numberTwo){
    return Math.round((numberOne + numberTwo) * 100) / 100;
}

function subtract(numberOne, numberTwo){
    return Math.round((numberOne - numberTwo) * 100) / 100;
}

function multipy(numberOne, numberTwo){
    return Math.round((numberOne * numberTwo) * 100) / 100;
}

function divide(numberOne, numberTwo){
    if(secondValue == 0){
        display.style.fontSize = '19px';
        return 'Nuclear missile launched!';
    }

    return Math.round((numberOne / numberTwo) * 100) / 100;
}