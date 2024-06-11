//Function for basic mathematical operations
const add = (a,b) => a + b ;

const sub = (a,b) => a - b ;

const mult = (a,b) => a*b;

const div = (a,b) => a/b;


function formatNumber(num, maxDecimals) {
    if (Math.floor(num*1000)/1000 !== num) {
      return num.toFixed(maxDecimals);
    }
    return num.toString();
  }



//Mathematical operation
//Variables to store the data needed for a mathematical operation
let firstNum;
let secondNum;
let operator;

//Functions for the basic operations
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

//console.log(operation(5,6,'+'));
let display = document.querySelector('.display');

//Må ha en variabel som holder orden på hvilken type knapp som var den forrige
//og en variabel som holder styr på om det er første gang operatorknapp blir brukt
//slik at vi vet om vi bare skal lagre verdiene eller gjøre en utregning
let lastType = '';
let antOperator = 0;

//Variabel som tilordnast referanse til siste knapp som er valgt (av operatortype)
let currButton;

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
            if(antOperator === 1 || operator === '='){
                firstNum = parseInt(display.textContent);
                operator = e.target.textContent;
            }
            else {
                secondNum = parseInt(display.textContent);
                firstNum = operation(firstNum,secondNum,operator);
                display.textContent = firstNum;
                operator = e.target.textContent;
                }
            //Markerer hvilken operasjon som er valgt, unntatt for =
            if(operator !== '=') {
                let selector = '#'+ e.target.id;
                currButton = document.querySelector(selector);
                currButton.classList.add("chosen");
                console.log(currButton.className);
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




