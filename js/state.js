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


  var activate = function () {
    var pins = window.generateListings();

    window.utils.populateDom(pins, window.vars.mapPinsElement, mapPinTemplate, window.render.renderMapPin);
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    window.setup.showMapCardElement(pins, mapPinElements);
    window.setup.showMap();

    window.state.setState({
      classAction: 'remove',
      inputDisableAction: false,
      mapPinHeight: window.vars.mapPinMainElementDimensions.height + window.vars.mapPinMainElementDimensions.after,
    });

    window.vars.roomsSelectElement.addEventListener('change', window.validation.onChangeCapacity);
    window.validation.setCapacity();

    window.vars.typeSelectElement.addEventListener('change', window.validation.onChangeType);
    window.validation.setMinPrice();

    window.vars.timeInSelectElement.addEventListener('change', window.validation.onChangeTime);
    window.vars.timeOutSelectElement.addEventListener('change', window.validation. onChangeTime);
    window.validation.syncTime();
  };

  window.state = {
    setState: setState,
    activate: activate,
  };
})();
