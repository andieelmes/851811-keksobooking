
'use strict';

(function () {

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * Math.floor((max - min) + 1) + min);
  };

  var getRandomElement = function (array) {
    return array[getRandomInt(0, array.length - 1)];
  };

  var getRandomNumberFromLimit = function (obj) {
    return getRandomInt(obj.MIN, obj.MAX);
  };

  var getRandomElements = function (array, length) {
    var elements = [];
    var elementsLength = length;
    while (elements.length < elementsLength) {
      var randomArrayElementNumber = getRandomInt(0, array.length - 1);
      var randomArrayElement = array[randomArrayElementNumber];

      if (elements.indexOf(randomArrayElement) === -1) {
        elements.push(randomArrayElement);
      }
    }

    return elements;
  };

  var getRandomElementAndRemoveIt = function (array) {
    var index = getRandomInt(0, array.length - 1);
    var element = array[index];
    array = array.splice(index, 1);
    return element;
  };

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getRandomNumberFromLimit: getRandomNumberFromLimit,
    getRandomElements: getRandomElements,
    getRandomElementAndRemoveIt: getRandomElementAndRemoveIt,
  };
})();
