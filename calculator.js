//Functions for basic mathematical operations
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
            return formatNumber(add(a,b), 6);
            break;
        case '-':
            return formatNumber(sub(a,b), 6);
            break;
        case '*':
            return formatNumber(mult(a,b), 6);
            break;
        case '/':
            if(b === 0){
                return 'div0 ERROR';
              }
            let result = div(a,b);
            return formatNumber(result, 6);
            break;
        case '=':
            return a;
            break;
        case 'Enter':
            return a;
            break;
        default:
            return 'ERROR';
            break;
    }
}

//Reference to DOM-element display
let display = document.querySelector('.display');

//Variable to contain the type of button that was last chosen (operator or number)
//Variable to contain how many times an operator has been chosen in a given calculation
//Reason: Need to know whether to just store values or do a calculation
let lastType = '';
let antOperator = 0;

//Variable to hold reference to which operator-button is currently chosen
let currButton;

//Reference to commabutton in DOM, so that it can be disabled/enabled to 
//prevent several commas in one number 
const commabutton = document.querySelector(".comma"); 


//Eventlisteners for both click and keyboard-events
document.addEventListener('click', handleEvent);
document.addEventListener('keydown', handleEvent);

//What happens when you press the buttons in the browser or keys on the keyboard:
//Setting type (operator,number etc.) and value/content (1,2,+, etc) of key/button pressed differently in the two cases
function handleEvent(e) {
    let type = null;
    let content = null;

    if(e.type === 'click'){
      type = e.target.className;
      content = e.target.textContent;
    }
    else if (e.type === 'keydown'){
      if(operations.includes(e.key)){
        type = 'operator';
      }
      else if(numbers.includes(e.key)) {
        type = 'number';
      }
      else if(e.key === ','){
        type = 'comma';
      }
      else if(e.key === 'Escape'){
        type = 'clear';
      }
      else if(e.key === 'Backspace') {
        type = 'backspace';
      }

      content = e.key;
    }
    
    switch (type) {
        case 'number':
            if(display.textContent === '0') {
                display.textContent = content;
                lastType = 'number';
            }
            else {
                if(lastType === 'operator' || lastType === 'operator chosen') { 
                    display.textContent = '';
                    //Allow new float number to be entered
                    commabutton.disabled = false;
                    //Removing highlighted operator once starting to enter new number
                    currButton.classList.remove("chosen");
                    }
                display.textContent += content;
                //Updating firstNum if comma has been added after calculation
                if(lastType === 'comma' && operator === '='){
                    firstNum = parseFloat(display.textContent);
                }
                lastType = 'number';
            }
            break;
        case 'operator':
            lastType = 'operator';
            antOperator++;
            //First operator, just save first num + operator
            if(antOperator === 1) { 
                firstNum = parseFloat(display.textContent);
                operator = content;
            }
            //Second operator, also do evaluation
            else {
                secondNum = parseFloat(display.textContent);
                firstNum = operation(firstNum,secondNum,operator);
                display.textContent = firstNum;
                firstNum = parseFloat(firstNum);
                operator = content;
                }
            //Highlighting chosen operator, except for =/Enter
            if(operator !== '=' && operator !== 'Enter') {
                //use content to find the DOM reference to the selected button
                currButton = [...document.querySelectorAll('button')].find(btn => btn.textContent.includes(content));
                currButton.classList.add("chosen");
                }
            break;
        case 'comma':
            if(display.textContent === '0' || display.textContent === ''){
                display.textContent = '0.';
            }
            else {
                display.textContent += '.';
            }
            lastType = 'comma';
            commabutton.disabled = true;
            break;
        case 'sign':
            let displayNum = parseFloat(display.textContent);
            displayNum = -displayNum;
            display.textContent = displayNum;
            firstNum = displayNum;
            break;
        case 'clear':
            display.textContent = 0;
            firstNum = 0;
            secondNum = 0;
            operator = '';
            antOperator = 0;
            commabutton.disabled = false;
            break;
        case 'backspace' :
            display.textContent = '';
            commabutton.disabled = '';
            break;
        default:
            break;
    }  
};

//Arrays used to assign type to a key that is pressed on the keyboard
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operations = ['+','-','*','/','=','Enter'];

