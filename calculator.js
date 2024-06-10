//Function for basic mathematical operations
const add = (a,b) => a + b ;

const sub = (a,b) => a - b ;

const mult = (a,b) => a*b;

const div = function(a,b) {
    if(b == 0) {
        return undefined;
    } else {
       return a/b;
    }
};

//returns infinity when division by zero
const div2 = (a,b) => a/b;

//Mathematical operation
let firstNum;
let secondNum;
let operator;

const operation = function(a,b,operator) {
    switch (operator) {
        case '+':
            return add(a,b);
            break;
        case '-':
            return sub(a,b);
            break;
        case '*':
            return mult(a,b);
            break;
        case '/':
            return div(a,b);
            break;
        default:
            return 'ERROR';
            break;
    }
}

console.log(operation(5,6,'+'));
let display = document.querySelector('.display');

document.addEventListener('click', (e) => {
    let type = e.target.className;
    if(type === 'number') {
        if(display.textContent === '0') {
            display.textContent = e.target.textContent;
        }
        else {
            display.textContent += e.target.textContent;
        }
    } else if (type === 'operator') {
        firstNum = parseInt(display.textContent);
        display.textContent = '';
        operator = e.target.textContent;
    } else if (type === 'equal') {
        secondNum = parseInt(display.textContent);
        display.textContent= operation(firstNum, secondNum, operator);
    }
});




