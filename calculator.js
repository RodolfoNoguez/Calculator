const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal-point");

let num1 = null;
let num2 = null;
let operator1 = ""
let operator2 = "";
let number = "";
let shouldReset = false;
let equalEvaluate = false;
let message_error = "Error";
display.textContent = "0";



for (const num of numbers){
    num.addEventListener("click", () => {
    return appendNumber(num);
    });
}

for (const op of operators){
    op.addEventListener("click", () => {
        if (num1 === null){
            num1 = storeNum();
            operator1 = op.innerText;
        }
        else if (equalEvaluate){
            num1 = storeNum();
            operator1 = op.innerText;
            equalEvaluate = false;
        }
        else{
            num2 = storeNum();
            operator2 = op.innerText;
        }
        
        evaluate()
        shouldReset = true;
    });
}

clear.addEventListener("click", () => {
    num1 = null;
    num2 = null;
    operator1 = ""
    operator2 = "";
    number = "";
    shouldReset = false;
    equalEvaluate = false;
    display.textContent = "0";

});

equal.addEventListener("click", () => {
    num2 = storeNum();
    resetDisplay();
    evaluate();
    shouldReset = true;
    equalEvaluate = true;
});

decimal.addEventListener("click", () => {
    if(!display.textContent.includes(".")){
        display.textContent += decimal.innerText;
    }
});





function resetDisplay(){
    display.textContent = "";
}



function storeNum(){
    number = Number(display.textContent);
    return number;
}

function evaluate(){
    if (num2 != null){
        result = operate(num1, num2, operator1);
        result = Math.round(result * 1000) / 1000;
        display.textContent = result;
        num1 = Number(display.textContent = result)
        num2 = null;
        operator1 = operator2;
    }
}



function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b===0){
        return message_error;
        
    }
    return a/b;
}


function operate(num1, num2, operator){
    switch(operator1){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "x":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
    }
}


function appendNumber(num) {
    if (display.textContent === "0" || shouldReset) {
      resetDisplay();
    }
    display.textContent += num.innerText;
    shouldReset = false;
  }
