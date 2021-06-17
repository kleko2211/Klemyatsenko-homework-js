'use strict';

(function () {

    function createElement(element, elementClassName, parentClassName) {
        var _element = document.createElement(element);
        _element.className = elementClassName;
        (document.querySelector(parentClassName)).appendChild(_element);
        return _element;
    }

    createElement('div', 'clock', 'body');
    createElement('div', 'arrows', '.clock');
    createElement('div', 'hour hand', '.arrows');
    createElement('div', 'minute hand', '.arrows');
    createElement('div', 'second hand', '.arrows');
    createElement('div', 'core', '.clock');

    createElement('div', 'divisions', '.clock');
    for (var i = 0; i < 12; i++) {
        createElement('div', 'division', '.divisions');
    }

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