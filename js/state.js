'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var mapFormElement = document.querySelector('.map__filters');
  var adFormInputElements = adFormElement.querySelectorAll('input, select');
  var mapFormInputElements = mapFormElement.querySelectorAll('input, select');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  var setState = function (state) {
    window.vars.mapElement.classList[state.classAction]('map--faded');

    window.utils.setAddress(state.mapPinHeight);

    adFormElement.classList[state.classAction]('ad-form--disabled');
    for (var i = 0; i < adFormInputElements.length; i++) {
      adFormInputElements[i].disabled = state.inputDisableAction;
    }
    mapFormElement.classList[state.classAction]('map-form--disabled');
    for (var j = 0; j < mapFormInputElements.length; j++) {
      mapFormInputElements[j].disabled = state.inputDisableAction;
    }
  };

  var showPins = function (pins) {
    window.state.pins = pins;
    window.utils.populateDom(pins, window.vars.mapPinsElement, mapPinTemplate, window.render.renderMapPin);
    return window.state.pins;
  };

  var activate = function () {
    window.backend.load(showPins, window.backend.onDefaultError);

    var mapPinElements;
    window.addEventListener('listingLoad', function () {
      mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      window.setup.showMapCardElement(window.state.pins, mapPinElements);
    });

    window.setup.showMap();

    setState({
      classAction: 'remove',
      inputDisableAction: false,
      mapPinHeight: window.vars.mapPinMainElementDimensions.height + window.vars.mapPinMainElementDimensions.after,
    });

    window.validate();
  };

  var deactivate = function () {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
    }

    var cardElement = document.querySelector(window.consts.CARD_ELEMENT_CLASS);
    if (cardElement) {
      cardElement.remove();
    }

    window.utils.resetMapPin();

    window.utils.setAddress(window.vars.mapPinMainElement.offsetHeight / 2);

    window.state.init();
  };

  var init = function () {
    setState({
      classAction: 'add',
      inputDisableAction: true,
      mapPinHeight: window.vars.mapPinMainElementDimensions.height / 2,
    });
    window.drag();
  };

  window.state = {
    activate: activate,
    deactivate: deactivate,
    init: init,
  };
})();
