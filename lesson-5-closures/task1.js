'use strict'

var John = {
    name: 'John',
    surname: 'Doe',
    age: 35,
    restaurants: {
        bills: [124, 48, 268, 180, 42],
        tips: [],
        billsAndTips: [],
        calcTips: function () {

            for (var i = 0; i < this.bills.length; i++) {

                var tip;
                var percentage;

                if (this.bills[i] > 0 && this.bills[i] < 50) {
                    percentage = 0.2;
                } else if (this.bills[i] >= 50 && this.bills[i] <= 200) {
                    percentage = 0.15;
                } else if (this.bills[i] > 200) {
                    percentage = 0.1;
                }
                tip = (Math.floor(this.bills[i] * percentage * 100) / 100);
                this.tips.push(tip);
                this.billsAndTips.push(this.bills[i] + tip);

            }
        }
    }
}

var Mark = {
    name: 'Mark',
    surname: 'Dent',
    age: 42,
    restaurants: {
        bills: [77, 375, 110, 45],
        tips: [],
        billsAndTips: [],
        calcTips: function () {

            for (var i = 0; i < this.bills.length; i++) {

                var tip;
                var percentage;

                if (this.bills[i] > 0 && this.bills[i] < 100) {
                    percentage = 0.2;
                } else if (this.bills[i] >= 100 && this.bills[i] < 300) {
                    percentage = 0.1;
                } else if (this.bills[i] >= 300) {
                    percentage = 0.25;
                }
                tip = (Math.floor(this.bills[i] * percentage * 100) / 100);
                this.tips.push(tip);
                this.billsAndTips.push(this.bills[i] + tip);

            }
        }
    }
}

function averageTips(tipsArray) {
    var sum = 0;
    for (var i = 0; i < tipsArray.length; i++) {
        sum += tipsArray[i];
    }
    return (Math.floor(sum / tipsArray.length * 100) / 100);
}


function biggestTips() {
    if (averageJohnTips > averageMarkTips) {
        console.log('John\'s family paid the highest tips');
    } else if (averageMarkTips > averageJohnTips) {
        console.log('Mark\'s family paid the highest tips');
    } else {
        console.log('Draw!');
    }
}


John.restaurants.calcTips();
console.log('John\'s tips are: ', John.restaurants.tips);
console.log('John\'s tips and bills sum are: ', John.restaurants.billsAndTips);

Mark.restaurants.calcTips();
console.log('Mark\'s tips are: ', Mark.restaurants.tips);
console.log('Mark\'s tips and bills sum are: ', Mark.restaurants.billsAndTips);

var averageJohnTips = averageTips(John.restaurants.tips);
var averageMarkTips = averageTips(Mark.restaurants.tips);

console.log('John\'s average tips value is: ', averageJohnTips);
console.log('Mark\'s average tips value is: ', averageMarkTips);

biggestTips();


