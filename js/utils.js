
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

  var adFormElement = document.querySelector('.ad-form');
  var addressInputElement = adFormElement.querySelector('[name="address"]');

  var setAddress = function (height) {
    var addressX = Math.floor(+window.vars.mapPinMainElement.style.left.replace('px', '') + window.vars.mapPinMainElementDimensions.width / 2);
    var addressY = Math.floor(+window.vars.mapPinMainElement.style.top.replace('px', '') + height);
    addressInputElement.value = addressX + ', ' + addressY;
  };

  var populateDom = function (array, newElement, templateElement, render, clear) {
    var fragment = document.createDocumentFragment();
    for (var y = 0; y < array.length; y++) {
      fragment.appendChild(render(array[y], templateElement));
    }

    if (clear) {
      newElement.innerHTML = '';
    }
    newElement.appendChild(fragment);
  };


  window.utils = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getRandomNumberFromLimit: getRandomNumberFromLimit,
    getRandomElements: getRandomElements,
    getRandomElementAndRemoveIt: getRandomElementAndRemoveIt,
    setAddress: setAddress,
    populateDom: populateDom,
  };
})();
