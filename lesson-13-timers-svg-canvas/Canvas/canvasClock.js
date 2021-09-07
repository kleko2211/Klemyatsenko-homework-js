'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 700;

var radius = canvas.height / 2; // Использование высоты canvas для вычисления радиуса часов позволяет создавать часы для любого размера canvas
ctx.translate(radius, radius); // Задаю (0,0) позицию часов в центре canvas
radius = radius * 0.80; // Уменьшаю радиус часов на 10% для лучшей отрисовки часов внутри canvas

var circlesRadius = 30; // Радиус кругов с цифрами
var numbersBaseRadius = radius / 1.3; // Радиус оси цифр циферблата
var dotSizeRadius = radius * 0.03; // Радиус точки в центре циферблата
var digitalClockHeight = radius / 5; // Высота цифровых часов

// UI

function drawClock() {
    drawFace(ctx, radius);
    drawDigitalClock();
    updateTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.save();
    ctx.beginPath(); // Создаю основу циферблата
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#58B8AE';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = radius * 0.05;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath(); // Создаю точку в центре циферблата
    ctx.arc(0, 0, dotSizeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();


    for (var number = 1; number <= 12; number++) { // Создаю цифры и кружочки по кругу циферблата
        var angle = number / 12 * Math.PI * 2;
        var x = ((radius - numbersBaseRadius) / 2 - dotSizeRadius * 3.9) + Math.round(Math.sin(angle) * numbersBaseRadius);
        var y = ((radius - numbersBaseRadius) / 2 - dotSizeRadius * 3.9) - Math.round(Math.cos(angle) * numbersBaseRadius);
        createHourCircle(x, y);
        createHourNumbers(number, x, y);
    }
}

function createHourCircle(x, y) {
    ctx.save();
    ctx.fillStyle = '#347779';
    ctx.strokeStyle = '#347779';
    ctx.lineWidth = '1';
    ctx.beginPath();
    ctx.arc(x, y, circlesRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function createHourNumbers(number, x, y) {
    ctx.save();
    ctx.font = radius * 0.14 + 'px arial';
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(number, x, y);
    ctx.restore();
}

function drawHand(ctx, pos, length) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = '7';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = '3';
    ctx.lineCap = 'round';

    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
    ctx.restore();
}

function drawDigitalClock() {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = radius * 0.02;
    ctx.restore();

    createDigitalNumbers();
}

function createDigitalNumbers() {
    ctx.save();
    ctx.font = radius * 0.15 + 'px arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(updateDigitalClock(), 0, -digitalClockHeight * -1.3);
    ctx.restore();
}

// Logic

function updateTime(ctx, radius) {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.025);

    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.6, radius * 0.015);

    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.8, radius * 0.008);
}

function updateDigitalClock() {
    var time = new Date();
    var digitalTime = time.toLocaleTimeString();
    return digitalTime;
}

function animate() {
    drawClock();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
