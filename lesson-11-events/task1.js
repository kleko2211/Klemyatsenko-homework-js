'use strict';

var clickX;
var clickY;
var DragImg = null;

var elementsPosition = [];
var images = document.getElementsByTagName('img');

(function SaveImagesPosition() {
    for (var i = 0; i < images.length; ++i) {
        elementsPosition[i] = {
            left: images[i].offsetLeft + 'px',
            top: images[i].offsetTop + 'px',
        }
    }
    SetImagesPosition()
})();

function SetImagesPosition() {

    for (var i = 0; i < images.length; i++) {
        images[i].style.position = 'absolute';
        images[i].addEventListener('mousedown', dragStart, false);
        images[i].style.cursor = 'move';
    }
}

function dragStart(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    DragImg = EO.target;
    document.body.appendChild(DragImg);

    clickX = EO.pageX - DragImg.offsetLeft;
    clickY = EO.pageY - DragImg.offsetTop;

    document.addEventListener('mousemove', dragMove, false);
    document.addEventListener('mouseup', dragFinish, false);
}

function dragMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    var target = EO.target;
    target.style.zIndex = 10;
    target.style.left = EO.pageX - clickX + 'px';
    target.style.top = EO.pageY - clickY + 'px';
}

function dragFinish() {
    document.removeEventListener('mousemove', dragMove, false);
    document.removeEventListener('mouseup', dragFinish, false);
}