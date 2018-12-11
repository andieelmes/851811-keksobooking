
'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinMainElementInitialCoords = {
    top: mapPinMainElement.style.top,
    left: mapPinMainElement.style.left,
  };
  var mapPinMainElementDimensions = {
    width: mapPinMainElement.offsetWidth,
    height: mapPinMainElement.offsetHeight,
    after: 19,
  };

  var locationXLimits = {
    MIN: 0,
    MAX: mapPinsElement.offsetWidth - mapPinMainElement.offsetWidth
  };

  var locationYLimits = {
    MIN: 130,
    MAX: 630
  };

  var locationYMapPinLimits = {
    MIN: locationYLimits.MIN,
    MAX: locationYLimits.MAX
  };

  var adFormElement = document.querySelector('.ad-form');

  var roomsSelectElement = adFormElement.querySelector('[name="rooms"]');
  var typeSelectElement = adFormElement.querySelector('[name="type"]');
  var timeInSelectElement = adFormElement.querySelector('[name="timein"]');
  var timeOutSelectElement = adFormElement.querySelector('[name="timeout"]');

  window.vars = {
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
    mapPinMainElement: mapPinMainElement,
    mapPinMainElementInitialCoords: mapPinMainElementInitialCoords,
    mapPinMainElementDimensions: mapPinMainElementDimensions,
    locationYLimits: locationYLimits,
    locationXLimits: locationXLimits,
    locationYMapPinLimits: locationYMapPinLimits,
    adFormElement: adFormElement,
    roomsSelectElement: roomsSelectElement,
    typeSelectElement: typeSelectElement,
    timeInSelectElement: timeInSelectElement,
    timeOutSelectElement: timeOutSelectElement,
  };
})();
