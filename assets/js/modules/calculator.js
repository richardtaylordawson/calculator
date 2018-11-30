/**
 * @author Richard Dawson
 * @classdesc involves all logic, event listeners, etc of a working calculator application
 */
export default class Calculator {
    /**
     * Create a Calculator.
     * @param {object} elements - All the DOM objects of the calculator.
     * @param {object} options - All the possible options & settings for the calculator.
     */
    constructor(elements, options) {
        this.numberButtons = elements.numberButtons;

        this.decimalButton = elements.decimalButton;

        this.plusMinusButton = elements.plusMinusButton;

        this.clearButton = elements.clearButton;
        this.backspaceButton = elements.backspaceButton;

        this.percentageButton = elements.percentageButton;
        this.squareRootButton = elements.squareRootButton;

        this.additionButton = elements.additionButton;
        this.subtractionButton = elements.subtractionButton;
        this.multiplicationButton = elements.multiplicationButton;
        this.divisionButton = elements.divisionButton;

        this.equalsButton = elements.equalsButton;

        this.primaryDisplay = elements.primaryDisplay;
        this.secondaryDisplay = elements.secondaryDisplay;

        this.maxNumberLength = options.maxNumberLength;

        // These are strings because otherwise we cannot have a number with a decimal and nothing after. Ex: 5.
        this.firstNumber = '0';
        this.secondNumber = '0';
        this.currentNumber = '0';
        this.operator = '';

        this.initializeCalculator();

        this.initializeClickEvents();

        this.initializeKeyboardEvents();
    }

    /**
     * Initializes the calculator values / clears the memory back to normal when needed
     */
    initializeCalculator() {
        this.firstNumber = '0';
        this.secondNumber = '0';
        this.currentNumber = '0';
        this.operator = '';

        this.primaryDisplay.innerText = this.currentNumber;
        this.secondaryDisplay.innerText = this.currentNumber;
        this.toggleInputButtons(false);
    }

    /**
     * Adds click event handlers to all DOM objects of the calculator.
     */
    initializeClickEvents() {
        this.numberButtons.forEach((numberButton) => {
            numberButton.addEventListener('click', (event) => {
                this.input(this.getInputValue(event.target));
            });
        });

        this.decimalButton.addEventListener('click', () => {
            this.input('.');
        });

        this.plusMinusButton.addEventListener('click', () => {
            this.input('plus-minus');
        });

        this.clearButton.addEventListener('click', () => {
            this.initializeCalculator();
        });

        this.backspaceButton.addEventListener('click', () => {
           this.backspace();
        });

        this.percentageButton.addEventListener('click', () => {
            this.percentage();
        });

        this.squareRootButton.addEventListener('click', () => {
            this.squareRoot();
        });

        this.additionButton.addEventListener('click', () => {
            this.toggleSingleNumberButtons(true);
            this.add();
        });

        this.subtractionButton.addEventListener('click', () => {
            this.toggleSingleNumberButtons(true);
            this.subtract();
        });

        this.multiplicationButton.addEventListener('click', () => {
            this.toggleSingleNumberButtons(true);
            this.multiply();
        });

        this.divisionButton.addEventListener('click', () => {
            this.toggleSingleNumberButtons(true);
            this.divide();
        });

        this.equalsButton.addEventListener('click', () => {
            this.compute();
        });
    }

    /**
     * Adds a keydown handler to the document that listens for certain keystrokes used for calculations
     */
    initializeKeyboardEvents() {
        document.addEventListener('keydown', (event)  => {
            // TODO need keyboard events for sqrt, percentage, plus minus
            if((event.key >= 0 && event.key <= 9) || event.key === '.') {
                this.input(event.key);
            } else if(event.key === 'Escape' || event.key === 'Clear') {
                this.initializeCalculator();
            } else if(event.key === 'Backspace') {
                this.backspace();
            } else if(event.key === '+') {
                this.add();
            } else if(event.key === '-') {
                this.subtract();
            } else if(event.key === '*') {
                this.multiply();
            } else if(event.key === '/') {
                this.divide();
            } else if(event.key === '=') {
                this.compute();
            } else if(event.key === 'Enter') {
                this.compute();
            }
        });
    }

    /**
     * Enables or disables all number buttons and decimal/plus-minus button
     * @param {boolean} enable - Decides whether or not to enable or disable the buttons.
     */
    toggleInputButtons(enable) {
        this.numberButtons.forEach((numberButton) => {
            numberButton.disabled = enable;
        });

        const decimalRegex = new RegExp(/\./, 'g');

        this.decimalButton.disabled = (decimalRegex.test(this.currentNumber) || enable);

        this.plusMinusButton.disabled = enable;
    }

    toggleSingleNumberButtons(disable) {
        this.percentageButton.disabled = disable;
        this.squareRootButton.disabled = disable;
    }

    /**
     * Searches and finds the input value of a number button
     * @param {element} element - DOM element that was clicked or keystroked.
     * @return {string} Returns the index of the matched element as a string
     */
    getInputValue(element) {
        return this.numberButtons.indexOf(element).toString();
    }

    /**
     * Adds the input value to the current number and calls the display
     * @param {string} value - Either a number value between 0-9 or a decimal value
     */
    input(value) {
        // Need this check because although the buttons will be disabled the user can still use the keyboard
        if(this.currentNumber.length !== this.maxNumberLength) {
            const decimalRegex = new RegExp(/\./, 'g');

            if((!decimalRegex.test(this.currentNumber) && value === '.')) {
                this.currentNumber = `${this.currentNumber}${value}`;
            } else if(value !== '.' && value === '0' && this.currentNumber !== '0') {
                this.currentNumber = `${this.currentNumber}${value}`;
            } else if(value !== '.') {
                this.currentNumber = this.currentNumber === '0'
                    ? `${value}`
                    : `${this.currentNumber}${value}`;
            }

            this.operator === ''
                ? this.firstNumber = this.currentNumber
                : this.secondNumber = this.currentNumber;

            this.display();
        }
    }

    /**
     * Displays the numbers correctly on the primary and secondary display
     * @param {boolean} computed - lets the display know if the equation was just computed
     */
    display(computed = false) {
        this.primaryDisplay.innerText = `${this.currentNumber}`;

        if(computed) {
            this.secondaryDisplay.innerText = `${this.firstNumber} ${this.operator} ${this.secondNumber} =`;

            this.firstNumber = this.currentNumber;
            this.operator = '';
            this.secondNumber = '0';

            this.toggleSingleNumberButtons(false);
        } else {
            this.secondaryDisplay.innerText = (this.operator === '')
                ? `${this.firstNumber}`
                : `${this.firstNumber} ${this.operator} ${this.secondNumber}`;
        }

        this.toggleInputButtons(this.currentNumber.length === this.maxNumberLength);
    }

    /**
     * Deletes the last character inputted
     */
    backspace() {
        if((this.currentNumber !== '0')) {
            const slicedDisplay = this.currentNumber.slice(0, this.currentNumber.length - 1);

            this.currentNumber = (slicedDisplay === '')
                ? '0'
                : slicedDisplay;

            this.operator === ''
                ? this.firstNumber = this.currentNumber
                : this.secondNumber = this.currentNumber;

            this.display();
        }
    }

    /**
     * Performs the percentage as long as only one number is current as input
     */
    percentage() {
        if(this.currentNumber !== '0') {
            this.operator = '%';
            this.compute();
        }
    }

    /**
     * Performs the square root as long as only one number is current as input
     */
    squareRoot() {
        // TODO cannot take the square root of a negative number
        if(this.operator === '') {
            let value = Math.sqrt(parseInt(this.firstNumber));
            this.primaryDisplay.innerText = value;
            this.secondaryDisplay.innerText = `sqrt(${this.firstNumber}) = ${value}`;
            console.log('square root');
        }
    }

    /**
     * Lets the class know that addition would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    add() {
        // const operatorRegex = new RegExp(/[\/\+\-\*]/, 'g');
        //
        // if(!operatorRegex.test(this.secondaryDisplay.innerText)) {
        //     this.primaryDisplay.innerText = '0';
        //     this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' + ';
        // } else {
        //     //Do computation and call add again
        //     this.compute(true);
        // }
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = `${this.secondaryDisplay.innerText} + `;
    }

    /**
     * Lets the class know that subtraction would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    subtract() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = `${this.secondaryDisplay.innerText} - `;
    }

    /**
     * Lets the class know that multiplication would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    multiply() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = `${this.secondaryDisplay.innerText} * `;
    }

    /**
     * Lets the class know that division would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    divide() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = `${this.secondaryDisplay.innerText} / `;
    }

    /**
     * Computes the mathematical expression and displays it on the calculator
     * @param {boolean} early - If a computation button is clicked before equals, then computation occurs "early"
     */
    compute(early = false) {
        let value;

        switch(this.operator) {
            case "%":
                value = parseFloat(this.currentNumber / 100).toString();
                break;
            case "+":
                value = parseInt(parts[0]) + parseInt(parts[2]);
                break;
            case "-":
                value = parseInt(parts[0]) - parseInt(parts[2]);
                break;
            case "*":
                value = parseInt(parts[0]) * parseInt(parts[2]);
                break;
            case "/":
                value = parseInt(parts[0]) / parseInt(parts[2]);
                break;
        }

        this.currentNumber = value;

        this.display(true);

        // const equalsRegex = new RegExp(/=/, 'g');
        //
        // if(!equalsRegex.test(this.secondaryDisplay.innerText)) {
        //     const parts = this.secondaryDisplay.innerText.split(' ');
        //
        //     let value;
        //
        //     console.log(parts[1].charCodeAt(0));
        //
        //     switch(parts[1]) {
        //         case "+":
        //             value = parseInt(parts[0]) + parseInt(parts[2]);
        //             break;
        //         case "-":
        //             value = parseInt(parts[0]) - parseInt(parts[2]);
        //             break;
        //         case "*":
        //             value = parseInt(parts[0]) * parseInt(parts[2]);
        //             break;
        //         case "/":
        //             value = parseInt(parts[0]) / parseInt(parts[2]);
        //             break;
        //     }
        //
        //     this.primaryDisplay.innerText = (early)
        //         ? '0'
        //         : value;
        //
        //     this.secondaryDisplay.innerText = (early)
        //         ? `${value} ${parts[1]}`
        //         : `${this.secondaryDisplay.innerText.toString()} = `;
        // } else {
        //
        // }
    }
}
