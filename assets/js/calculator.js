class Calculator {
    constructor() {
        this.currentValue = height;
        this.width = width;
    }

    static userInput(value) {
        document.getElementById('number').innerText = (document.getElementById('number').innerText === '0')
            ? value.toString()
            : document.getElementById('number').innerText.toString() + value.toString();

        document.getElementById('sub-number').innerText = (document.getElementById('sub-number').innerText === '0')
            ? value.toString()
            : document.getElementById('sub-number').innerText.toString() + value.toString();
    }


    static add(a, b) {
        return a + b;
    }

    static subtract(a, b) {
        return a - b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static divide(a, b) {
        return a / b;
    }
}
