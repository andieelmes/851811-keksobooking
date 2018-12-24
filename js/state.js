'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var adFormInputElements = adFormElement.querySelectorAll('input, select');
  var mapFormInputElements = window.vars.mapFormElement.querySelectorAll('input, select');

  var setState = function (state) {
    window.vars.mapElement.classList[state.classAction]('map--faded');

    window.utils.setAddress(state.mapPinHeight);

    adFormElement.classList[state.classAction]('ad-form--disabled');
    for (var i = 0; i < adFormInputElements.length; i++) {
      adFormInputElements[i].disabled = state.inputDisableAction;
    }
    window.vars.mapFormElement.classList[state.classAction]('map-form--disabled');
    for (var j = 0; j < mapFormInputElements.length; j++) {
      mapFormInputElements[j].disabled = state.inputDisableAction;
    }
  };

  var activate = function () {
    window.backend.load(window.filter.updateListings, window.backend.onDefaultError);

    window.addEventListener('listingLoad', function () {
      window.setup.showMapCardElement(window.vars.listings.slice(0, window.consts.NUMBER_OF_LISTINGS));
    });

    window.setup.showMap();

    setState({
      classAction: 'remove',
      inputDisableAction: false,
      mapPinHeight: window.vars.mapPinMainElementDimensions.height + window.vars.mapPinMainElementDimensions.after,
    });

    window.synchronizeFields();
  };

  var deactivate = function () {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
    }

    window.utils.resetListingForm();
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
