let numberButtons = document.getElementsByClassName('btn-number');

for(let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
        input(this.value);
    });
}

document.getElementById('btn-clear').addEventListener('click', function() {
    document.getElementById('number').innerText = '0';
    document.getElementById('sub-number').innerText = '0';
});

document.getElementById('btn-addition').addEventListener('click', function() {
    add();
});

// Add listener for user keydown arrow keys
document.addEventListener('keydown', (event)  => {
    console.log(event.keyCode);

    switch(event.keyCode) {
        // 48 - 57
        // Numbers 0-9
        case 48:
            input(0);
            break;
        case 49:
            input(1);
            break;
        case 50:
            input(2);
            break;
        case 51:
            input(3);
            break;
        case 52:
            input(4);
            break;
        case 53:
            input(5);
            break;
        case 54:
            input(6);
            break;
        case 55:
            input(7);
            break;
        case 56:
            input(8);
            break;
        case 57:
            input(9);
            break;
        case 187:
            add();
            break;
        case 191:
            divide();
            break;
    }
});

function input(value) {
    document.getElementById('number').innerText = (document.getElementById('number').innerText === '0')
        ? value.toString()
        : document.getElementById('number').innerText.toString() + value.toString();

    document.getElementById('sub-number').innerText = (document.getElementById('sub-number').innerText === '0')
        ? value.toString()
        : document.getElementById('sub-number').innerText.toString() + value.toString();
}

function add() {
    document.getElementById('number').innerText = '0';
    document.getElementById('sub-number').innerText = document.getElementById('sub-number').innerText + ' + ';
}

function subtract() {
    document.getElementById('number').innerText = '0';
    document.getElementById('sub-number').innerText = document.getElementById('sub-number').innerText + ' - ';
}

function multiply() {
    document.getElementById('number').innerText = '0';
    document.getElementById('sub-number').innerText = document.getElementById('sub-number').innerText + ' * ';
}

function divide() {
    document.getElementById('number').innerText = '0';
    document.getElementById('sub-number').innerText = document.getElementById('sub-number').innerText + ' / ';
}
