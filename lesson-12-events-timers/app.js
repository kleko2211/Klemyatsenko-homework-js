'use strict';

(function () {

    var radius = 200;

    function createElement(element, elementClassName, parentClassName) {
        var _element = document.createElement(element);
        _element.className = elementClassName;
        (document.querySelector(parentClassName)).appendChild(_element);
        return _element;
    }

    createElement('div', 'wrapper', 'body')
    createElement('div', 'clock', '.wrapper');
    createElement('div', 'arrows', '.clock');
    createElement('div', 'hour hand', '.arrows');
    createElement('div', 'minute hand', '.arrows');
    createElement('div', 'second hand', '.arrows');

    createElement('div', 'divisions', '.clock');
    for (var i = 0; i < 12; i++) {
        createElement('div', 'division', '.divisions');
    }

    createElement('div', 'core', '.clock');

    (function posDigits() {
        var clockCenter = document.querySelector('.divisions');
        console.log(clockCenter);
        var divisions = document.querySelectorAll('.division');
        console.log(divisions);

        var clockCenterX = clockCenter.offsetLeft + clockCenter.offsetWidth / 2;
        console.log(clockCenterX);
        var clockCenterY = clockCenter.offsetTop + clockCenter.offsetHeight / 2;
        console.log(clockCenterY);

        for (var h = 0; h < divisions.length; h++) {
            var division = divisions[h];
            var angle = (h + 1) / 12 * Math.PI * 2;
            var divisionCenterX = clockCenterX + radius * Math.sin(angle);
            var divisionCenterY = clockCenterY - radius * Math.cos(angle);

            division.style.left = Math.round(divisionCenterX - division.offsetWidth / 2) + 'px';
            division.style.top = Math.round(divisionCenterY - division.offsetHeight / 2) + 'px';
            division.innerHTML = h + 1;
        }
    })();

    var hours = document.querySelector('.hour');
    var minutes = document.querySelector('.minute');
    var seconds = document.querySelector('.second');

    setInterval(function () {
        var dateNow = new Date;
        var hr = dateNow.getHours();
        var min = dateNow.getMinutes();
        var sec = dateNow.getSeconds();

        var calcHours = (hr * 30) + (min / 2);
        var calcMin = (min * 6) + (sec / 10);
        var calcSec = sec * 6;

        hours.style.transform = 'rotate(' + calcHours + 'deg)';
        minutes.style.transform = 'rotate(' + calcMin + 'deg)';
        seconds.style.transform = 'rotate(' + calcSec + 'deg)';
    }, 1000);

})();