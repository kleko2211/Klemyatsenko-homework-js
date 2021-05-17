'use strict'

var obj = {
    className: 'open menu',
};

function removingDuplicateClass(object, cls) {
    /* функция ещё требует доработки, при тестировании вырезает не так как нужно (к примеру вырезав слово 'pen') -->
     останется ('o menu'). Полагаю нужно последовательное побуквенное сравнение через цикл*/
    var classes = object.className;

    do {
        classes = classes.replace(cls, '');
        classes = classes.replace('  ', ' ');
    } while (classes.indexOf(cls) !== -1)


    classes = classes.trim();
    object.className = classes;
    return object;
}

console.log(removingDuplicateClass(obj, 'pen'));