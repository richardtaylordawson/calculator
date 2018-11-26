/**
 * Initializes the calculator object
 * Object takes care of all the logic, event listeners, etc of the calculator
 * @constant calculator
 */
const calculator = new Calculator(
    {
        "numberButtons": [
            document.getElementById('zeroButton'),
            document.getElementById('oneButton'),
            document.getElementById('twoButton'),
            document.getElementById('threeButton'),
            document.getElementById('fourButton'),
            document.getElementById('fiveButton'),
            document.getElementById('sixButton'),
            document.getElementById('sevenButton'),
            document.getElementById('eightButton'),
            document.getElementById('nineButton')
        ],
        "decimalButton" : document.getElementById('btn-decimal'),
        "clearButton" : document.getElementById('btn-clear'),
        "additionButton" : document.getElementById('btn-addition'),
        "subtractionButton" : document.getElementById('btn-subtraction'),
        "multiplicationButton" : document.getElementById('btn-multiplication'),
        "divisionButton" : document.getElementById('btn-division'),
        "equalsButton" : document.getElementById('btn-equals'),
        "primaryDisplay" : document.getElementById('primary-display'),
        "secondaryDisplay" : document.getElementById('secondary-display')
    },
    {
        "maxNumberLength" : 12
    }
);

