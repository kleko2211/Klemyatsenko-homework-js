function HashStorage() {
}

HashStorage.prototype.addValue = function (Key, value) {
    this[Key] = value;
}

HashStorage.prototype.getValue = function (Key) {
    var info;

    for (let key in this) {
        if (key === Key) {
            info = this[key];
        }
    }

    return info;
}

HashStorage.prototype.deleteValue = function (Key) {
    var showMessage;

    for (let key in this) {
        if (key === Key) {
            delete this[key];
            showMessage = true;
            break;
        } else {
            showMessage = false;
        }
    }

    return showMessage;
}

HashStorage.prototype.getKeys = function () {
    return Object.keys(this);
}