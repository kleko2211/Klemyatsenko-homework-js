'use strict';

var baseRadius = 600; // радиус циферблата
var numbersBaseRadius = baseRadius / 2.5; // радиус оси цифр циферблата
var hourHandLength = baseRadius / 5; // длина часовой стрелки
var minuteHandLength = baseRadius / 4; // длина минутной стрелки
var secondHandLength = baseRadius / 3; // длина секундной стрелки
var circleRadius = baseRadius / 25; // радиус кругов с цифрами
var numberInCircleSize = circleRadius; // размер цифр

var digitalClockWidth = baseRadius / 4; // ширина цифровых часов
var digitalClockHeight = baseRadius / 14; // высота цифровых часов
var digitalClockFont = baseRadius / 25; // размер цифр на цифровых часах

var dotSize = 10; // размер точки в центре часов
var wrapper = document.getElementById('wrapper');

wrapper.appendChild(createClock());
setInterval(tickTimer, 1000);

// UI

function createClock() {
    var base = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    base.id = 'base';
    base.style.width = baseRadius;
    base.style.height = baseRadius;
    base.appendChild(createMainCircle());
    base.appendChild(createDigitalClock());
    base.appendChild(createDigitalNumbers());
    base.appendChild(createClockFace());
    base.appendChild(createArrow('hours', hourHandLength, '#ffffff'));
    base.appendChild(createArrow('minutes', minuteHandLength, '#ffffff'));
    base.appendChild(createArrow('seconds', secondHandLength, '#ffffff'));
    base.appendChild(createDecorativeDot(dotSize));

    return base;
}

function createMainCircle() {
    var mainCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    mainCircle.setAttribute('cy', baseRadius / 2);
    mainCircle.setAttribute('cx', baseRadius / 2);
    mainCircle.setAttribute('r', baseRadius / 2 - 5);
    mainCircle.setAttribute('fill', '#347779');
    mainCircle.setAttribute('stroke', '#ffffff');
    mainCircle.setAttribute('stroke-width', '5');

    return mainCircle;
}

function createClockFace() {
    var clockFace = document.createDocumentFragment();
    for (var number = 1; number <= 12; number++) {
        var angle = number / 12 * Math.PI * 2;
        var x = ((baseRadius - circleRadius + 6) / 2) + Math.round(Math.sin(angle) * numbersBaseRadius);
        var y = ((baseRadius - circleRadius + 10) / 2) - Math.round(Math.cos(angle) * numbersBaseRadius);
        clockFace.appendChild(createHourCircle(x, y));
        clockFace.appendChild(createHourNumbers(x, y, number));
    }

    return clockFace;
}

function createHourCircle(circleX, circleY) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cy', circleY);
    circle.setAttribute('cx', circleX);
    circle.setAttribute('r', circleRadius);
    circle.setAttribute('fill', '#ffffff');
    circle.setAttribute('stroke', '#347779FF');
    circle.setAttribute('stroke-width', '1');

    return circle;
}

function createHourNumbers(circleX, circleY, number) {
    var num = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    num.setAttribute('y', circleY);
    num.setAttribute('x', circleX);
    num.setAttribute('text-anchor', 'middle');
    num.setAttribute('fill', '#347779ff');
    num.setAttribute('dominant-baseline', 'central');
    num.setAttribute('font-size', numberInCircleSize);
    num.textContent = number;

    return num;
}

function createArrow(arrowType, arrowWidth, arrowColor) {
    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrow.setAttribute('x1', baseRadius / 2);
    arrow.setAttribute('y1', baseRadius / 2);
    arrow.setAttribute('x2', baseRadius / 2 + arrowWidth);
    arrow.setAttribute('y2', baseRadius / 2);
    arrow.setAttribute('stroke', arrowColor);
    arrow.setAttribute('stroke-width', '1.5');
    arrow.id = arrowType;
    arrow.style.transformOrigin = 'left';
    arrow.style.transformBox = 'fill-box';
    arrow.style.transform = 'rotate(90deg)';

    return arrow;
}

function createDecorativeDot(size) {
    var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cy', baseRadius / 2);
    dot.setAttribute('cx', baseRadius / 2);
    dot.setAttribute('r', size);
    dot.setAttribute('fill', '#ffffff');

    return dot;
}

function createDigitalClock() {
    var digitalClock = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    digitalClock.setAttribute('x', baseRadius / 2 - digitalClockWidth / 2);
    digitalClock.setAttribute('y', baseRadius / 2 + digitalClockHeight * 2);
    digitalClock.setAttribute('width', digitalClockWidth);
    digitalClock.setAttribute('height', digitalClockHeight);
    digitalClock.setAttribute('fill', '#009865');
    digitalClock.setAttribute('rx', '20');
    digitalClock.setAttribute('ry', '20');

    return digitalClock;
}

function createDigitalNumbers() {
    var digits = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    digits.id = 'clockDigits';
    digits.setAttribute('x', baseRadius / 2);
    digits.setAttribute('y', baseRadius / 2 + digitalClockHeight * 2.5);
    digits.setAttribute('text-anchor', 'middle');
    digits.setAttribute('fill', '#ffffff');
    digits.setAttribute('dominant-baseline', 'middle');
    digits.setAttribute('font-size', digitalClockFont);

    return digits;
}

// Logic

function tickTimer() {
    var now = new Date();
    var thisSecond = now.getSeconds();
    var thisMinute = now.getMinutes();
    var thisHour = now.getHours();
    updateAnalogClock(thisHour, thisMinute, thisSecond);
    updateDigitalClock();
}

function updateAnalogClock(hour, minute, second) {
    var thisSecondRotate = (second / 60) * 360 - 90;
    var thisMinuteRotate = (minute) / 60 * 360 - 90;
    var thisHourRotate = (hour + minute / 60) / 12 * 360 - 90;
    rotateHandle('seconds', thisSecondRotate);
    rotateHandle('minutes', thisMinuteRotate);
    rotateHandle('hours', thisHourRotate);
}

function rotateHandle(handle, degree) {
    var arrow = document.getElementById(`${handle}`);
    arrow.style.transform = `rotate(${degree}deg)`;
}

function formatDateTime(dt) {
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    return converter(hours, 2) + ':' + converter(minutes, 2) + ':' + converter(seconds, 2);
}

function converter(val, length) {
    var timeValue = val.toString();

    while (timeValue.length < length) {
        timeValue = '0' + timeValue;
    }

    return timeValue;
}

function updateDigitalClock() {
    var time = new Date();
    document.querySelector('#clockDigits').textContent = formatDateTime(time);
}