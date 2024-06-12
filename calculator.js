//Function for basic mathematical operations
const add = (a,b) => a + b ;

const sub = (a,b) => a - b ;

const mult = (a,b) => a*b;

const div = (a,b) => a/b;

//Function for limiting number of decimals if necessary,
//but not having the decimals if it is not needed.
function formatNumber(num, maxDecimals) {
    if (Math.floor(num*1000)/1000 !== num) {
      return num.toFixed(maxDecimals);
    }
    return num.toString();
  }

//Variables to store the data needed for a mathematical operation
let firstNum;
let secondNum;
let operator;

//Function to run the basic mathematical operations
//depending on chosen operator
const operation = function(a,b,operator) {
    switch (operator) {
        case '+':
            return formatNumber(add(a,b), 8);
            break;
        case '-':
            return formatNumber(sub(a,b), 8);
            break;
        case '*':
            return formatNumber(mult(a,b), 8);
            break;
        case '/':
            if(b === 0){
                return 'div0 ERROR';
              }
            let result = div(a,b);
            return formatNumber(result, 8);
            break;
        case '=':
            return a;
            break;
        default:
            return 'ERROR';
            break;
    }
}

let display = document.querySelector('.display');

//Variable to hold the type of button that was last chosen (operator or number)
//Variable to hold how many times an operator has been chosen in a calculation
//Reason: Need to know whether to just store values or do a calculation
let lastType = '';
let antOperator = 0;

//Variabel som tilordnast referanse til siste knapp som er valgt (av operatortype)
let currButton;

//What happens when you press the buttons in the browser:
document.addEventListener('click', (e) => {
    let type = e.target.className;
  
    switch (type) {
        case 'number':
            if(display.textContent === '0') {
                display.textContent = e.target.textContent;
                lastType = 'number';
            }
            else {
                if(lastType === 'operator' || lastType === 'operator chosen') { 
                    display.textContent = '';
                    //Removing highlighted operator once starting to enter new number
                    currButton.classList.remove("chosen");
                    }
                display.textContent += e.target.textContent;
                lastType = 'number';
            }
            break;
        case 'operator':
            lastType = 'operator';
            antOperator++;
            if(antOperator === 1) { 
                firstNum = parseFloat(display.textContent);
                operator = e.target.textContent;
            }
            else {
                secondNum = parseFloat(display.textContent);
                firstNum = operation(firstNum,secondNum,operator);
                display.textContent = firstNum;
                firstNum = parseFloat(firstNum);
                operator = e.target.textContent;
                }
            //Highlighting chosen operator, except for =
            if(operator !== '=') {
                let selector = '#'+ e.target.id;
                currButton = document.querySelector(selector);
                currButton.classList.add("chosen");
                }
            break;
        case 'clear':
            display.textContent = 0;
            firstNum = 0;
            secondNum = 0;
            operator = '';
            antOperator = 0; 
        default:
            break;
    }
   
});




