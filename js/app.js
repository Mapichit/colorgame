//Squares
let squares = document.querySelectorAll(".square__box");
let colors = generateRandomColors();
let pickedColor = pickColor();

//Header
let colorDisplay = document.querySelector("#colorDisplay");
let h1 = document.querySelector("h1");

//Menu - left
let score = document.querySelector("#score");
let turn = document.querySelector("#turn");
let timer = document.querySelector("#timer");

let miliseconds = 1;
let seconds = 30;
let displayMiliseconds = 0;
let displaySeconds = 0;


let status = "stopped";
let interval = null;
let startCheck = true;

//Menu - right
let start = document.querySelector("#start");
let plusTen = document.querySelector("#plusTen");
let minusTen = document.querySelector("#minusTen");
let nextGameBtn = document.querySelector("#nextGame");
let resetScoreBtn = document.querySelector("#reset");


//Logic and default values
let defaultColor = "rgb(35, 35, 35)";
let scoreValue = 0;
let game = false;
let turnValue = 0;

//Initial Setup

for(var i = 0; i< 6; i++){
    squares[i].style.background = colors[i];

    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.background;

        if(pickedColor === clickedColor && game == true){
            changeColors(clickedColor);
            h1.style.background = clickedColor;
            scoreValue = scoreValue + 2;
            score.textContent = scoreValue;
            game = false;
            turnValue = turnValue + 1;
            turn.textContent = turnValue;     

            colorDisplay.textContent = "Correct!";
            setTimeout(resetColors, 500);
        }

        else if(pickedColor != clickedColor && clickedColor != defaultColor && game == true){
            
            this.style.background = defaultColor;
            scoreValue = scoreValue -1;
            score.textContent = scoreValue;
        }
    })
}

colorDisplay.textContent = pickedColor;


function generateRandomColors(){
    var arr = []
    for(var i = 0; i < 6; i++){
        arr.push(randomColor())
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor(){
    var random = Math.floor(Math.random() * 6);
    return colors[random];
}

function changeColors(color){
    for (var i = 0; i < 6; i++){
        squares[i].style.background = color;
    }
}

//Menu 

nextGameBtn.addEventListener("click", function(){

    if(game === true){

    turnValue = turnValue + 1;
    turn.textContent = turnValue;

    resetColors();
    }
})

resetScoreBtn.addEventListener("click", function(){
    if(game == false){
    scoreValue = 0;
    score.textContent = scoreValue;
    turnValue = 0;
    turn.textContent = turnValue;
    startCheck = true;
    seconds = 30;

    resetColors();
    timer.textContent = "30:00";
    game = false;

    }
    
})

function resetColors(){
    colors = generateRandomColors();
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    game = true;
    h1.style.background = "#4682b4";
    
    for(var i = 0; i < squares.length; i++){
        squares[i].style.background = colors[i];
    }
}

start.addEventListener("click", function(){
    if(startCheck == true){
    interval = window.setInterval(stopWatch, 10);
    startCheck = false;
    game = true;
    }
})

plusTen.addEventListener("click", function(){
    if(startCheck == true){
        seconds += 10;
        timer.textContent = seconds + ":00";
    }
})

minusTen.addEventListener("click", function(){
    if(startCheck == true){
        seconds -= 10;
        timer.textContent = seconds + ":00";
    }
})


//Timer 

function stopWatch(){
  

    miliseconds --;

    if(miliseconds === 0){
        miliseconds = 99;
        seconds --;
    }

    if(miliseconds < 10){
        displayMiliseconds = "0" + seconds.toString();
    }

    else{
        displayMiliseconds = miliseconds;
    }

    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    
    else {
        displaySeconds = seconds;
    }
    

    if(seconds < 0){
        
        window.clearInterval(interval);
        colorDisplay.textContent = "GAME OVER";
        game = false;
        h1.style.background = "red";
        return null;
    }

    timer.textContent = displaySeconds + ":" + displayMiliseconds;

}

