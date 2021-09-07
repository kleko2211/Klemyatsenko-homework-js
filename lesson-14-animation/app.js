"use strict";

var TField = document.getElementById('Field');
TField.style.width = 700 + "px";
TField.style.height = 400 + "px";
TField.style.background = "rgba(236,241,93,0.89)";
TField.style.border = '2px yellow solid';

var startBtn = document.createElement("input");
document.body.insertBefore(startBtn, document.body.children[0]);
startBtn.type = "button";
startBtn.value = "START";
startBtn.onclick = Start;
startBtn.style.width = 70 + "px"

var score = document.createElement("div");
document.body.insertBefore(score, document.body.children[1]);
score.style.marginLeft = 325 + "px";
score.style.fontSize = 2 + "rem";
var score1 = 0;
var score2 = 0;

var leftRacket = document.createElement("div");
TField.appendChild(leftRacket);
leftRacket.style.width = 10 + "px";
leftRacket.style.height = 150 + "px";
leftRacket.style.background = "#de5e5e";
leftRacket.style.position = "absolute";

var rightRacket = document.createElement("div");
TField.appendChild(rightRacket);
rightRacket.style.width = 10 + "px";
rightRacket.style.height = 150 + "px";
rightRacket.style.background = "#f04454";
rightRacket.style.position = "absolute";

var racketH = {
    width: 10,
    height: 150,
    leftRacketX: TField.getBoundingClientRect().left,
    leftRacketY: TField.getBoundingClientRect().top + TField.getBoundingClientRect().height / 2 - leftRacket.getBoundingClientRect().height / 2,
    leftRacketSpeed: 0,
    rightRacketX: TField.getBoundingClientRect().left + TField.getBoundingClientRect().width - rightRacket.getBoundingClientRect().width,
    rightRacketY: TField.getBoundingClientRect().top + TField.getBoundingClientRect().height / 2 - leftRacket.getBoundingClientRect().height / 2,
    rightRacketSpeed: 0,

    Update: function () {
        var Lracket = leftRacket;
        Lracket.style.left = this.leftRacketX + "px";
        Lracket.style.top = this.leftRacketY + "px";
        var Rracket = rightRacket;
        Rracket.style.left = this.rightRacketX + "px";
        Rracket.style.top = this.rightRacketY + "px";
    }
};
var racketAreaH = {
    width: 10,
    height: TField.getBoundingClientRect().height
};
racketH.Update();

var ball = document.createElement("div");
TField.appendChild(ball);
ball.style.background = "#367d9e"
ball.style.borderRadius = "50%";
ball.style.width = 30 + "px";
ball.style.height = 30 + "px";
ball.style.position = "absolute";

var ballH = {
    ballX: TField.getBoundingClientRect().left + TField.getBoundingClientRect().width / 2 - ball.getBoundingClientRect().width / 2,
    ballY: TField.getBoundingClientRect().top + TField.getBoundingClientRect().height / 2 - ball.getBoundingClientRect().height / 2,
    speedX: 0,
    speedY: 0,
    width: 30,
    height: 30,

    Update: function () {
        var updBall = ball;
        updBall.style.left = this.ballX + "px";
        updBall.style.top = this.ballY + "px";
    }
};

var ballAreaH = {
    width: TField.getBoundingClientRect().width,
    height: TField.getBoundingClientRect().height
};
ballH.Update();

requestAnimationFrame(Tick);

function Keyboard() {
    window.addEventListener("keydown", function (EO) {
        EO = EO || window.event;
        EO.preventDefault();

        if (EO.keyCode === 17) {
            racketH.leftRacketSpeed = 5;
        }

        if (EO.keyCode === 16) {
            racketH.leftRacketSpeed = -5;
        }

        if (EO.keyCode === 40) {
            racketH.rightRacketSpeed = 5;
        }

        if (EO.keyCode === 38) {
            racketH.rightRacketSpeed = -5;
        }
    });

    window.addEventListener("keyup", function (EO) {
        EO = EO || window.event;
        EO.preventDefault();

        if (EO.keyCode === 17) {
            racketH.leftRacketSpeed = 0;
        }

        if (EO.keyCode === 16) {
            racketH.leftRacketSpeed = 0;
        }

        if (EO.keyCode === 40) {
            racketH.rightRacketSpeed = 0;
        }

        if (EO.keyCode === 38) {
            racketH.rightRacketSpeed = 0;
        }
    });
}

Keyboard();

function scChange() {
    score.innerHTML = score1 + ":" + score2;
}

scChange();

function Start() {
    ballH.speedX = 5;
    ballH.speedY = 2.5;
}

function Tick() {
    racketH.leftRacketY += racketH.leftRacketSpeed;
    racketH.rightRacketY += racketH.rightRacketSpeed;

    if (racketH.leftRacketY + racketH.height > (TField.getBoundingClientRect().top + racketAreaH.height)) {
        racketH.leftRacketY = TField.getBoundingClientRect().top + racketAreaH.height - racketH.height;
    }
    if (racketH.leftRacketY < TField.getBoundingClientRect().top) {
        racketH.leftRacketY = TField.getBoundingClientRect().top;
    }
    if (racketH.rightRacketY + racketH.height > (TField.getBoundingClientRect().top + racketAreaH.height)) {
        racketH.rightRacketY = TField.getBoundingClientRect().top + racketAreaH.height - racketH.height;
    }
    if (racketH.rightRacketY < TField.getBoundingClientRect().top) {
        racketH.rightRacketY = TField.getBoundingClientRect().top;
    }

    ballH.ballX -= ballH.speedX;
    ballH.ballY -= ballH.speedY;

    if (ballH.ballY + ballH.height > (TField.getBoundingClientRect().top + ballAreaH.height)) {
        ballH.speedY = -ballH.speedY;
        ballH.ballY = TField.getBoundingClientRect().top + ballAreaH.height - ballH.height;
    }
    if (ballH.ballY < TField.getBoundingClientRect().top) {
        ballH.speedY = -ballH.speedY;
        ballH.ballY = TField.getBoundingClientRect().top;
    }

    if ((ballH.ballY + ballH.height < racketH.rightRacketY || ballH.ballY > (racketH.rightRacketY + racketH.height)) && ballH.ballX + ballH.width >= (TField.getBoundingClientRect().left + TField.getBoundingClientRect().width)) {
        score1 += 1;
        scChange();

        ballH.speedX = 0;
        ballH.speedY = 0;

        ballH.ballX = TField.getBoundingClientRect().left + TField.getBoundingClientRect().width - ballH.width - 1;

        window.setTimeout(function () {
            ballH.ballX = TField.getBoundingClientRect().left + racketH.width;
            ballH.ballY = racketH.leftRacketY + racketH.height / 2;
            Start();
        }, 1000);
    } else if (!(ballH.ballY + ballH.height < racketH.rightRacketY || ballH.ballY > (racketH.rightRacketY + racketH.height)) && ballH.ballX + ballH.width > (racketH.rightRacketX)) {
        ballH.speedX = -ballH.speedX;
        ballH.ballX = TField.getBoundingClientRect().left + TField.getBoundingClientRect().width - racketH.width - ballH.width;
    }

    if ((ballH.ballY + ballH.height < racketH.leftRacketY || ballH.ballY > (racketH.leftRacketY + racketH.height)) && ballH.ballX <= (TField.getBoundingClientRect().left)) {
        score2 += 1;
        scChange();

        ballH.speedX = 0;
        ballH.speedY = 0;

        ballH.ballX = TField.getBoundingClientRect().left + 1;

        window.setTimeout(function () {
            ballH.ballX = TField.getBoundingClientRect().left + TField.getBoundingClientRect().width - racketH.width;
            ballH.ballY = racketH.rightRacketY + racketH.height / 2;
            Start();
        }, 1000);
    } else if (!(ballH.ballY + ballH.height < racketH.leftRacketY || ballH.ballY > (racketH.leftRacketY + racketH.height)) && ballH.ballX < (racketH.width + racketH.leftRacketX)) {
        ballH.speedX = -ballH.speedX;
        ballH.ballX = TField.getBoundingClientRect().left + racketH.width;
    }

    racketH.Update();
    ballH.Update();

    requestAnimationFrame(Tick);
}
