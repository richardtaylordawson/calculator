import Calculator from "./modules/calculator.js";
import Theme from "./modules/theme.js";

/**
 * Initializes the calculator object
 * Object takes care of all the logic, event listeners, etc of the calculator
 * @param {object} all the elements of the calculator
 * @param {object} all the options of the calculator
 * @constant Calculator
 */
new Calculator(
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
        "backspaceButton" : document.getElementById('btn-backspace'),
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


/**
 * Initializes the theme object
 * Object takes care of all the logic, event listeners, etc of switching app theme
 * @param {object} All the DOM elements and identifiers for the application themes
 * @constant Theme
 */
new Theme({
    "themes": [
        {
            "element": document.getElementById('minty-theme'),
            "identifier": "minty-theme",
            "default": false
        },
        {
            "element": document.getElementById('sandstone-theme'),
            "identifier": "sandstone-theme",
            "default": false
        },
        {
            "element": document.getElementById('pulse-theme'),
            "identifier": "pulse-theme",
            "default": false
        },
        {
            "element": document.getElementById('journal-theme'),
            "identifier": "journal-theme",
            "default": false
        },
        {
            "element": document.getElementById('solar-theme'),
            "identifier": "solar-theme",
            "default": false
        },
        {
            "element": document.getElementById('slate-theme'),
            "identifier": "slate-theme",
            "default": false
        },
        {
            "element": document.getElementById('dark-theme'),
            "identifier": "dark-theme",
            "default": false
        },
        {
            "element": document.getElementById('school-theme'),
            "identifier": "school-theme",
            "default": false
        },
        {
            "element": document.getElementById('default-theme'),
            "identifier": "default-theme",
            "default": true
        }
    ]
});
