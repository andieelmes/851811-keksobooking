'use strict';

(function () {
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

  window.helpers = {
    setAddress: setAddress,
    populateDom: populateDom,
  };

})();
