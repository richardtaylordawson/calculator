class Calculator {
    constructor(elements) {
        // Number buttons zero indexed 0-9
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

        this.initializeClickEvents();

        this.initializeKeyboardEvents();
    }

    initializeClickEvents() {
        // Numbers 0 - 9
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

        this.multiplicationButton().addEventListener('click', () => {
            this.multiply();
        });

        this.divisionButton.addEventListener('click', () => {
            this.divide();
        });

        this.equalsButton.addEventListener('click', () => {
            this.compute();
        });
    }

    initializeKeyboardEvents() {
        document.addEventListener('keydown', (event)  => {
            console.log(event.keyCode);

            switch(event.keyCode) {
                // 48 - 57
                // Numbers 0 - 9
                case 48:
                    this.input(0);
                    break;
                case 49:
                    this.input(1);
                    break;
                case 50:
                    this.input(2);
                    break;
                case 51:
                    this.input(3);
                    break;
                case 52:
                    this.input(4);
                    break;
                case 53:
                    this.input(5);
                    break;
                case 54:
                    this.input(6);
                    break;
                case 55:
                    this.input(7);
                    break;
                case 56:
                    this.input(8);
                    break;
                case 57:
                    this.input(9);
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

    getInputValue(element) {
        return this.numberButtons.indexOf(element);
    }

    input(value) {
        document.getElementById('number').innerText = (document.getElementById('number').innerText === '0')
            ? value.toString()
            : document.getElementById('number').innerText.toString() + value.toString();

        document.getElementById('sub-number').innerText = (document.getElementById('sub-number').innerText === '0')
            ? value.toString()
            : document.getElementById('sub-number').innerText.toString() + value.toString();
    }

    clear() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = '0';
    }

    add() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' + ';
    }

    subtract() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' - ';
    }

    multiply() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' * ';
    }

    divide() {
        this.primaryDisplay.innerText = '0';
        this.secondaryDisplay.innerText = this.secondaryDisplay.innerText + ' / ';
    }

    compute() {

    }

}
