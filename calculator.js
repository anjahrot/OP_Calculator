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

console.log(operation(2,3,'*'));

