var screen;
var btns;
var isDecimal;

window.onload = function () {
    screen = document.getElementById("screen");
    btns = document.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].innerHTML == "C") {
            btns[i].onclick = clear;
            continue;
        }

        if (btns[i].innerHTML == "=") {
            btns[i].onclick = calc;
            continue;
        }
        btns[i].onclick = add;
    }
};

function add() {
    var char = this.innerHTML;
    var text = screen.innerHTML;

    if (text.length==1){
        isDecimal = false;
    }

    if (char == ".") {
        if (isOperator(text.charAt(text.length - 1)) || isDecimal) {
            return;
        }

        isDecimal = true;
    }

    if (isOperator(char)) {
        if (isOperator(text.charAt(text.length - 1))) {
            screen.innerHTML = text.slice(0, text.length-1) + char;
            return;
        }

        isDecimal = false;
    }

    screen.innerHTML += char;
    
    if (isMaxLength(screen.innerHTML)){
        screen.innerHTML = "Digit Limit Met";
    }
}

function isOperator(char) {
    return char == "+" || char == "-" || char == "x" || char == ":";
}

function calc() {
    var text = screen.innerHTML;
    text = text.replace(/x/g, "*").replace(/:/g,"/");
    if(isOperator(text.charAt(text.length - 1))){
        text = text.slice(0, text.length - 1);
    }
    var res = Math.round( eval(text)*1000)/1000;
    screen.innerHTML = eval(res);
}

function clear() {
    screen.innerHTML = "";
    isDecimal = true;
}

function isMaxLength(text){
    return text.length > 13;
}