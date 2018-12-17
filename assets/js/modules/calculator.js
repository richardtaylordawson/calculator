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

        // These are strings because otherwise we cannot have a number with a decimal and nothing after. Ex: 5.4
        this.firstNumber = "0";
        this.secondNumber = "0";
        this.currentNumber = "0";
        this.operator = "";

        // Mapping of key events to reduce complexity
        this.keyEvents = new Map()
            .set("0", () => { this.input("0"); })
            .set("1", () => { this.input("1"); })
            .set("2", () => { this.input("2"); })
            .set("3", () => { this.input("3"); })
            .set("4", () => { this.input("4"); })
            .set("5", () => { this.input("5"); })
            .set("6", () => { this.input("6"); })
            .set("7", () => { this.input("7"); })
            .set("8", () => { this.input("8"); })
            .set("9", () => { this.input("9"); })
            .set(".", () => { this.input("."); })
            .set("p", () => { this.input("plus-minus"); })
            .set("Escape", () => { this.initializeCalculator(); })
            .set("Clear", () => { this.initializeCalculator(); })
            .set("Backspace", () => { this.backspace(); })
            .set("%", () => { this.percentage(); })
            .set("s", () => { this.divide(); })
            .set("+", () => { this.add(); })
            .set("-", () => { this.subtract(); })
            .set("*", () => { this.multiply(); })
            .set("/", () => { this.divide(); })
            .set("=", () => { this.compute(); })
            .set("Enter", () => { this.compute(); });
    }

    /**
     * Initializes the theme class. Called by the user of the module.
     */
    initialize() {
        this.initializeCalculator();

        this.initializeClickEvents();

        this.initializeKeyboardEvents();
    }

    /**
     * Initializes the calculator values / clears the memory back to normal when needed
     */
    initializeCalculator() {
        this.firstNumber = "0";
        this.secondNumber = "0";
        this.currentNumber = "0";
        this.operator = "";

        this.primaryDisplay.innerText = this.currentNumber;
        this.secondaryDisplay.innerText = this.currentNumber;
        this.toggleInputButtons();
        this.toggleSingleNumberButtons(false);
    }

    /**
     * Adds click event handlers to all DOM objects of the calculator.
     */
    initializeClickEvents() {
        this.numberButtons.forEach((numberButton) => {
            numberButton.addEventListener("click", (event) => {
                this.input(this.getInputValue(event.target));
            });
        });

        this.decimalButton.addEventListener("click", () => {
            this.input(".");
        });

        this.plusMinusButton.addEventListener("click", () => {
            this.input("plus-minus");
        });

        this.clearButton.addEventListener("click", () => {
            this.initializeCalculator();
        });

        this.backspaceButton.addEventListener("click", () => {
           this.backspace();
        });

        this.percentageButton.addEventListener("click", () => {
            this.percentage();
        });

        this.squareRootButton.addEventListener("click", () => {
            this.squareRoot();
        });

        this.additionButton.addEventListener("click", () => {
            this.add();
        });

        this.subtractionButton.addEventListener("click", () => {
            this.subtract();
        });

        this.multiplicationButton.addEventListener("click", () => {
            this.multiply();
        });

        this.divisionButton.addEventListener("click", () => {
            this.divide();
        });

        this.equalsButton.addEventListener("click", () => {
            this.compute();
        });
    }

    /**
     * Adds a keydown handler to the document that listens for certain keystrokes used for calculations
     */
    initializeKeyboardEvents() {
        document.addEventListener("keydown", (event)  => {
            this.runKeyEvent(event.key);
        });
    }

    /**
     * Runs correct method depending on the key that was pressed
     * @param {string} key - The string of the key that was pressed from the keydown event.
     */
    runKeyEvent(key) {
        if(this.keyEvents.get(key)) {
            this.keyEvents.get(key)();
        }
    }

    /**
     * Enables or disables input buttons depending on the criteria
     */
    toggleInputButtons() {
        const maxDisplayHit = this.currentNumber.length === this.maxNumberLength;

        this.numberButtons.forEach((numberButton) => {
            numberButton.disabled = maxDisplayHit;
        });

        const decimalRegex = new RegExp(/\./, "g");

        this.decimalButton.disabled = (decimalRegex.test(this.currentNumber) || maxDisplayHit);

        const minusRegex = new RegExp(/-/, "g");

        if(!maxDisplayHit) {
            this.plusMinusButton.disabled = false;
        } else if(minusRegex.test(this.currentNumber)) {
            this.plusMinusButton.disabled = false;
        } else {
            this.plusMinusButton.disabled = maxDisplayHit;
        }
    }

    /**
     * Enables or disables the single number function buttons
     * @param {boolean} disable - Decides whether or not to enable or disable the buttons.
     */
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
        const minusRegex = new RegExp(/-/, "g");

        if((this.currentNumber.length !== this.maxNumberLength) || (value === "plus-minus" && minusRegex.test(this.currentNumber) && this.currentNumber.charAt(0) === "-")) {
            const decimalRegex = new RegExp(/\./, "g");

            if((!decimalRegex.test(this.currentNumber) && value === ".")) {
                this.currentNumber = `${this.currentNumber}${value}`;
            } else if(value === "plus-minus") {
                if(this.currentNumber !== "0") {
                    this.currentNumber = this.currentNumber.charAt(0) === "-"
                        ? this.currentNumber.slice(1)
                        : `-${this.currentNumber}`;
                }
            } else if(value !== "." && value === "0" && this.currentNumber !== "0") {
                this.currentNumber = `${this.currentNumber}${value}`;
            } else if(value !== ".") {
                this.currentNumber = this.currentNumber === "0"
                    ? `${value}`
                    : `${this.currentNumber}${value}`;
            }

            if(this.operator === "") {
                this.firstNumber = this.currentNumber;
            } else {
                this.secondNumber = this.currentNumber;
            }

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
            let value = "";

            if(this.operator === String.fromCharCode(37)) {
                value = `${this.firstNumber}${this.operator} =`;
            } else if(this.operator === String.fromCharCode(8730)) {
                value = `${this.operator}(${this.firstNumber}) =`;
            } else {
                value = `${this.firstNumber} ${this.operator} ${this.secondNumber} =`;
            }

            this.secondaryDisplay.innerText = value;

            this.firstNumber = this.currentNumber;
            this.operator = "";
            this.secondNumber = "0";

            this.toggleSingleNumberButtons(false);
        } else {
            this.secondaryDisplay.innerText = (this.operator === "")
                ? `${this.firstNumber}`
                : `${this.firstNumber} ${this.operator} ${this.secondNumber}`;
        }

        this.toggleInputButtons();
    }

    /**
     * Deletes the last character inputted
     */
    backspace() {
        if(this.currentNumber !== "0") {
            const slicedDisplay = this.currentNumber.slice(0, this.currentNumber.length - 1);

            this.currentNumber = (slicedDisplay === "" || slicedDisplay === "-")
                ? "0"
                : slicedDisplay;

            if(this.operator === "") {
                this.firstNumber = this.currentNumber;
            } else {
                this.secondNumber = this.currentNumber;
            }

            this.display();
        }
    }

    /**
     * Performs the percentage as long as only one number is current as input
     */
    percentage() {
        if(this.currentNumber !== "0" && this.operator === "") {
            this.operator = String.fromCharCode(37);
            this.compute();
        }
    }

    /**
     * Performs the square root as long as only one number is current as input and it is not negative
     */
    squareRoot() {
        const minusRegex = new RegExp(/-/, "g");

        if(this.operator === "" && !minusRegex.test(this.currentNumber)) {
            this.operator = String.fromCharCode(8730);
            this.compute();
        }
    }

    /**
     * Lets the class know that addition would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    add() {
        this.operator = String.fromCharCode(43);
        this.multiNumberFunctionInitiated();
    }

    /**
     * Lets the class know that subtraction would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    subtract() {
        this.operator = String.fromCharCode(8722);
        this.multiNumberFunctionInitiated();
    }

    /**
     * Lets the class know that multiplication would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    multiply() {
        this.operator = String.fromCharCode(215);
        this.multiNumberFunctionInitiated();
    }

    /**
     * Lets the class know that division would like to be performed by either calling compute or adding
     * to the secondary display of the calculator.
     */
    divide() {
        this.operator = String.fromCharCode(247);
        this.multiNumberFunctionInitiated();
    }

    /**
     * Performs actions that are similar for all buttons that need multiple numbers in order to perform
     */
    multiNumberFunctionInitiated() {
        this.toggleSingleNumberButtons(this.operator !== "");
        this.currentNumber = "0";
        this.display();
    }

    /**
     * Computes the mathematical expression and displays it on the calculator
     * @param {boolean} early - If a computation button is clicked before equals, then computation occurs "early"
     */
    compute(early = false) {
        // Javascript requires two different ones or else the ternary statement won't work
        // Weirdest thing I've ever seen
        const decimalRegexFirstNumber = new RegExp(/\./, "g");
        const decimalRegexSecondNumber = new RegExp(/\./, "g");

        let tempFirstNumber = decimalRegexFirstNumber.test(this.firstNumber)
            ? parseFloat(this.firstNumber)
            : parseInt(this.firstNumber, 10);

        let tempSecondNumber = decimalRegexSecondNumber.test(this.secondNumber)
            ? parseFloat(this.secondNumber)
            : parseInt(this.secondNumber, 10);

        let value;

        switch(this.operator) {
            case String.fromCharCode(37):
                value = parseFloat(tempFirstNumber / 100);
                break;
            case String.fromCharCode(8730):
                value = Math.sqrt(tempFirstNumber);
                break;
            case String.fromCharCode(43):
                value = (tempFirstNumber + tempSecondNumber);
                break;
            case String.fromCharCode(8722):
                value = (tempFirstNumber - tempSecondNumber);
                break;
            case String.fromCharCode(215):
                value = (tempFirstNumber * tempSecondNumber);
                break;
            case String.fromCharCode(247):
                value = (tempFirstNumber / tempSecondNumber);
                break;
        }

        value = value.toString();

        if(value.length > this.maxNumberLength) {
            value = value.slice(0, this.maxNumberLength);
        }

        const decimalRegex = new RegExp(/\./, "g");

        // Cut out any trailing 0's in decimal numbers
        // Test using this expression: 65.9 × 91
        if(decimalRegex.test(value)) {
            while(value.endsWith("0")) {
                value = value.slice(0, -1)
            }
        }

        this.currentNumber = value;

        this.display(true);
    }
}
