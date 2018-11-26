// TODO Use Module Export for JS Class
/**
 * @author Richard Dawson
 * @classdesc involves all logic, event listeners, etc of a working calculator application
 */
class Calculator {
    /**
     * Create a Calculator.
     * @param {object} elements - All the DOM objects of the calculator.
     * @param {object} options - All the possible options & settings for the calculator.
     */
    constructor(elements, options) {
        this.numberButtons = elements.numberButtons;

        this.decimalButton = elements.decimalButton;

        this.clearButton = elements.clearButton;

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
            console.log(event.keyCode);

            switch(event.keyCode) {
                // 48 - 57
                // Numbers 0 - 9
                case 48:
                    this.input('0');
                    break;
                case 49:
                    this.input('1');
                    break;
                case 50:
                    this.input('2');
                    break;
                case 51:
                    this.input('3');
                    break;
                case 52:
                    this.input('4');
                    break;
                case 53:
                    this.input('5');
                    break;
                case 54:
                    this.input('6');
                    break;
                case 55:
                    this.input('7');
                    break;
                case 56:
                    this.input('8');
                    break;
                case 57:
                    this.input('9');
                    break;
                // . or decimal key
                case 190:
                    this.input('.');
                    break;
                // Escape key used as the clear button
                case 27:
                    this.clear();
                    break;
                //TODO finish these later. May have to change everything to a map
                // case 187:
                //     this.add();
                //     break;
                // case 187:
                //     this.subtract();
                //     break;
                // case 187:
                //     this.multiply();
                //     break;
                // case 191:
                //     this.divide();
                //     break;
                // case 191:
                //     this.compute();
                //     break;
            }
        });
    }

    /**
     * Enables or disables all number buttons and decimal button
     * @param {bool} enable - Decides whether or not to enable or disable the buttons.
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
     * @return Returns the index of the matched element
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
            const operatorRegex = new RegExp(/[\/\+\-\*]/, 'g');

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
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' + ';
    }

    /**
     * Lets the class know that subtraction would like to be performed by either calling computer or adding
     * to the secondary display of the calculator.
     */
    subtract() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' - ';
    }

    /**
     * Lets the class know that multiplication would like to be performed by either calling computer or adding
     * to the secondary display of the calculator.
     */
    multiply() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' * ';
    }

    /**
     * Lets the class know that division would like to be performed by either calling computer or adding
     * to the secondary display of the calculator.
     */
    divide() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' / ';
    }

    /**
     * Computes the mathematical expression and displays it on the calculator
     * @param {bool} early - If a computation button is clicked before equals, then computation occurs "early"
     */
    compute(early = false) {
        const equalsRegex = new RegExp(/=/, 'g');

        if(!equalsRegex.test(this.secondaryDisplay.innerText)) {
            const parts = this.secondaryDisplay.innerText.split(' ');

            let value;

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
