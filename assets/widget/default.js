import Calculator from "./modules/calculator.js";

/**
 * Initializes the calculator object
 * Object takes care of all the logic, event listeners, etc of the calculator
 * @param {object} all the elements of the calculator
 * @param {object} all the options of the calculator
 * @constant Calculator
 */
const calculator = new Calculator(
    {
        "numberButtons": [
            document.getElementById("btn-zero"),
            document.getElementById("btn-one"),
            document.getElementById("btn-two"),
            document.getElementById("btn-three"),
            document.getElementById("btn-four"),
            document.getElementById("btn-five"),
            document.getElementById("btn-six"),
            document.getElementById("btn-seven"),
            document.getElementById("btn-eight"),
            document.getElementById("btn-nine")
        ],
        "decimalButton" : document.getElementById("btn-decimal"),
        "plusMinusButton": document.getElementById("btn-plus-minus"),
        "clearButton" : document.getElementById("btn-clear"),
        "backspaceButton" : document.getElementById("btn-backspace"),
        "percentageButton" : document.getElementById("btn-percentage"),
        "squareRootButton" : document.getElementById("btn-square-root"),
        "additionButton" : document.getElementById("btn-addition"),
        "subtractionButton" : document.getElementById("btn-subtraction"),
        "multiplicationButton" : document.getElementById("btn-multiplication"),
        "divisionButton" : document.getElementById("btn-division"),
        "equalsButton" : document.getElementById("btn-equals"),
        "primaryDisplay" : document.getElementById("primary-display"),
        "secondaryDisplay" : document.getElementById("secondary-display")
    },
    {
        "maxNumberLength" : 12
    }
);

calculator.initialize();
