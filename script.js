const decimalBtn = document.getElementById('calc-decimal');
const clearBtn = document.getElementById('calc-clear');
const backspaceBtn = document.getElementById('calc-backspace');

const displayEl = document.getElementById('calc-display-value');

const calcNumBtns = document.getElementsByClassName('calc-btn-num');
const calcOpBtns = document.getElementsByClassName('calc-btn-operator');

let displayVal = '0';
let pendingVal;
let evalStringArray = [];

function updateDisplayVal(clickBtn) {     // clickBtn = num
    const numClicked = clickBtn.target.innerText;     // btnText is equal to the button clicked

    if(displayVal === '0') {
        displayVal = ' ';     // make the display value empty when button is clicked so that only the value of the button clicked is displayed
    }

    displayVal+= numClicked;     // get the values of the button(s) clicked
    displayEl.innerText = displayVal;     // display the button(s) clicked
}

for (let num of calcNumBtns) {     // iterate through all the numbers on the calculator
    num.addEventListener('click', updateDisplayVal);      // add a click event listener to all the number buttons and call the updateDisplayVal when clicked
}

function performOp(clickBtn) {
    const operatorClicked = clickBtn.target.innerText;     // btnText is equal to the button clicked
    switch (operatorClicked) {
        case '÷':
            pendingVal = displayVal;
            displayVal = '0';
            displayEl.innerText = displayVal; 
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            break;
        case 'x':
            pendingVal = displayVal;
            displayVal = '0';
            displayEl.innerText = displayVal; 
            evalStringArray.push(pendingVal);     // adds the number clicked prior to clicking operator
            evalStringArray.push('*');
             break;
        case '-':
            pendingVal = displayVal;
            displayVal = '0';
            displayEl.innerText = displayVal; 
            evalStringArray.push(pendingVal);     // adds the number clicked prior to clicking operator
            evalStringArray.push('-');
            break;
        case '+':
            pendingVal = displayVal;
            displayVal = '0';
            displayEl.innerText = displayVal; 
            evalStringArray.push(pendingVal);     // adds the number clicked prior to clicking operator
            evalStringArray.push('+');
            break;
        case '=':
            evalStringArray.push(displayVal);     // adds the number clicked prior to clicking operator
            let evaluate = eval(evalStringArray.join(' '));
            displayVal = evaluate + ' ';     // convert to string
            displayEl.innerText = displayVal;
            evalStringArray = [];
            displayVal = '0';
             break;
            
    }
}

for (let operator of calcOpBtns) {     // iterate through all the numbers on the calculator
    operator.addEventListener('click', performOp);      // add a click event listener to all the number buttons and call the updateDisplayVal when clicked
}

function resetCalc() {
    displayVal = '0';     // set the display value back to 0
    pendingVal = undefined;     
    evalStringArray= [];
    displayEl.innerHTML = displayVal;     // display 0
}

clearBtn.addEventListener('click', resetCalc);

function backspace() {
    displayVal = displayVal.slice(0, displayVal.length - 1);     // the slice removes the last digit in the string
    if (displayVal === ' ') {     // when backspacing/removing the last digit, reset to 0 instead of a blank display
        displayVal = '0';
    }
    displayEl.innerHTML = displayVal; 
}

backspaceBtn.addEventListener('click', () => {
    if (displayVal === '0') {     // prevents deleting the inital 0, which would then display a blank screen
        return;
    } else {
        backspace();
    }
});

function decimal() {
    displayVal+= '.';     // adds a decimal to the displayVal
    displayEl.innerText = displayVal;     // displays the decimal
}

decimalBtn.addEventListener('click', () => {
    if (displayVal.includes('.')) {     // only allows one decimal to be displayed
        return;
    } else {
        decimal();
    }
});






