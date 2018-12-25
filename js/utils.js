
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

  var onPopupEscPress = function (e, popup) {
    if (e.keyCode === window.consts.ESC_KEYCODE) {
      closePopup(popup);
    }
  };

  var closePopup = function (popup) {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', function (e) {
      onPopupEscPress(e, popup);
    });
  };

  var mapPinMainElementInitialCoords = {
    top: window.vars.mapPinMainElement.style.top,
    left: window.vars.mapPinMainElement.style.left,
  };

  var resetMapPin = function () {
    window.vars.mapPinMainElement.style = 'left: ' + mapPinMainElementInitialCoords.left + '; top: ' + mapPinMainElementInitialCoords.top;
  };

  var removeCard = function () {
    var cardElement = document.querySelector(window.consts.CARD_ELEMENT_CLASS_SELECTOR);
    if (cardElement) {
      cardElement.remove();
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.vars.DEBOUNCE_INTERVAL);
    };
  };

  var removeArrayElement = function (array, element) {
    var index = array.indexOf(element);
    if (index !== -1) {
      var result = array.splice(index, 1);
    }
    return result;
  };

  var removeActivePinClass = function (element) {
    element.classList.remove(window.consts.ACTIVE_PIN_CLASS);
  };

  var resetListingForm = function () {
    window.vars.adFormElement.reset();

    window.synchronizeFields();

    window.utils.resetMapPin();
    window.utils.setAddress(window.vars.mapPinMainElementDimensions.height + window.vars.mapPinMainElementDimensions.after);
    window.utils.removeCard();

    window.vars.avatarElement.src = window.consts.DEFAULT_AVATAR_SRC;
    var photoElements = window.vars.adFormElement.querySelectorAll('.ad-form__photo');
    photoElements.forEach(function (element) {
      element.remove();
    });
    window.vars.photoElementTemplateParentElement.appendChild(window.vars.photoElementTemplate);
    window.vars.photoUploaded = false;
  };

  var resetListingFormWithAButton = function (e) {
    e.preventDefault();
    window.utils.resetListingForm();
  };

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getRandomNumberFromLimit: getRandomNumberFromLimit,
    getRandomElements: getRandomElements,
    getRandomElementAndRemoveIt: getRandomElementAndRemoveIt,
    setAddress: setAddress,
    populateDom: populateDom,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    resetMapPin: resetMapPin,
    removeCard: removeCard,
    debounce: debounce,
    removeArrayElement: removeArrayElement,
    removeActivePinClass: removeActivePinClass,
    resetListingForm: resetListingForm,
    resetListingFormWithAButton: resetListingFormWithAButton,
  };
})();
