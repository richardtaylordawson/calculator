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

        this.clearButton = elements.clearButton;
        this.backspaceButton = elements.backspaceButton;

        this.additionButton = elements.additionButton;
        this.subtractionButton = elements.subtractionButton;
        this.multiplicationButton = elements.multiplicationButton;
        this.divisionButton = elements.divisionButton;

        this.equalsButton = elements.equalsButton;

        this.primaryDisplay = elements.primaryDisplay;
        this.secondaryDisplay = elements.secondaryDisplay;

        this.maxNumberLength = options.maxNumberLength;

        this.initializeClickEvents();

        this.initializeKeyboardEvents();
    }

    /**
     * Adds click event handlers to all DOM objects of the calculator.
     */
    initializeClickEvents() {
        //TODO change to for each loops everywhere
        for(let i = 0; i < this.numberButtons.length; i++) {
            this.numberButtons[i].addEventListener('click', (event) => {
                this.input(this.getInputValue(event.target));
            });
        }

        this.decimalButton.addEventListener('click', () => {
            this.input('.');
        });

        this.clearButton.addEventListener('click', () => {
            this.clear();
        });

        this.backspaceButton.addEventListener('click', () => {
           this.backspace();
        });

        this.additionButton.addEventListener('click', () => {
            this.add();
        });

        this.subtractionButton.addEventListener('click', () => {
            this.subtract();
        });

        this.multiplicationButton.addEventListener('click', () => {
            this.multiply();
        });

        this.divisionButton.addEventListener('click', () => {
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
            if((event.key >= 0 && event.key <= 9) || event.key === '.') {
                this.input(event.key);
            } else if(event.key === 'Escape' || event.key === 'Clear') {
                this.clear();
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
     * Enables or disables all number buttons and decimal button
     * @param {boolean} enable - Decides whether or not to enable or disable the buttons.
     */
    toggleNumberButtons(enable) {
        for(let i = 0; i < this.numberButtons.length; i++) {
            this.numberButtons[i].disabled = enable;
        }

        this.decimalButton.disabled = enable;
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
     * Adds the input value to the primary and secondary display of the calculator
     * @param {string} value - Either a number value between 0-9 or a decimal value
     */
    input(value) {
        if(this.primaryDisplay.innerText.toString().length !== this.maxNumberLength) {
            const decimalRegex = new RegExp(/\./, 'g');
            const operatorRegex = new RegExp(/[\/+\-*]/, 'g');

            // Check to make sure a decimal hasn't already been added since numbers can only have a single decimal point
            if((value === '.' && !decimalRegex.test(this.primaryDisplay.innerText)) || value !== '.') {
                let secondaryDisplayValue = (operatorRegex.test(this.secondaryDisplay.innerText) && this.secondaryDisplay.innerText.split(' ').length !== 3)
                    ? `${this.secondaryDisplay.innerText.toString()} ${value.toString()}`
                    : `${this.secondaryDisplay.innerText.toString()}${value.toString()}`;

                this.primaryDisplay.innerText = (this.primaryDisplay.innerText !== '0' && value !== '.') || (value === '.')
                    ? `${this.primaryDisplay.innerText.toString()}${value.toString()}`
                    : value.toString();

                //TODO Need to figure out the secondary display better
                this.secondaryDisplay.innerText = (this.secondaryDisplay.innerText !== '0' && value !== '.') || (value === '.')
                    ? secondaryDisplayValue
                    : value.toString();
            }

            this.toggleNumberButtons(this.primaryDisplay.innerText.toString().length === this.maxNumberLength)
        }
    }

    /**
     * Clears the calculator displays and resets everything back to its original state
     */
    clear() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = '0';
        this.toggleNumberButtons(false);
    }

    /**
     * Deletes the last character inputted
     */
    backspace() {
        if((this.primaryDisplay.innerText !== '0')) {
            const slicedDisplay = this.primaryDisplay.innerText.toString().slice(0, this.primaryDisplay.innerText.toString().length - 1);

            this.primaryDisplay.innerText = (slicedDisplay === '') ? '0' : slicedDisplay;
            this.secondaryDisplay.innerText = (slicedDisplay === '') ? '0' : slicedDisplay;
        }
    }

    /**
     * Lets the class know that addition would like to be performed by either calling computer or adding
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
     * Lets the class know that subtraction would like to be performed by either calling computer or adding
     * to the secondary display of the calculator.
     */
    subtract() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = `${this.secondaryDisplay.innerText} - `;
    }

    /**
     * Lets the class know that multiplication would like to be performed by either calling computer or adding
     * to the secondary display of the calculator.
     */
    multiply() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = `${this.secondaryDisplay.innerText} * `;
    }

    /**
     * Lets the class know that division would like to be performed by either calling computer or adding
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
        const equalsRegex = new RegExp(/=/, 'g');

        if(!equalsRegex.test(this.secondaryDisplay.innerText)) {
            const parts = this.secondaryDisplay.innerText.split(' ');

            let value;

            console.log(parts[1].charCodeAt(0));

            switch(parts[1]) {
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

            this.primaryDisplay.innerText = (early)
                ? '0'
                : value;

            this.secondaryDisplay.innerText = (early)
                ? `${value} ${parts[1]}`
                : `${this.secondaryDisplay.innerText.toString()} = `;
        } else {

        }
    }
}
