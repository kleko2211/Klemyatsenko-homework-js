var image = {
    width: 100,
    height: 400,
    title: 'Cool image',
};

function multiplyNumeric(object) {
    for (var value in image) {
        if (!isNaN(image[value])) {
            image[value] *= 2;
        }
    }
    return object;
}

multiplyNumeric(image);
console.log(image);
alert(image)