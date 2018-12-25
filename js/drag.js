'use strict';

(function () {
  var locationXLimits = {
    MIN: 0,
    MAX: window.vars.mapPinsElement.offsetWidth - window.vars.mapPinMainElement.offsetWidth
  };

  var locationYLimits = {
    MIN: 130,
    MAX: 630
  };

  var locationYMapPinLimits = {
    MIN: locationYLimits.MIN,
    MAX: locationYLimits.MAX
  };

  var getCoords = function (coord, limits) {
    return Math.min(Math.max(coord, limits.MIN), limits.MAX);
  };

  var setLocationYMapPinLimit = function (height) {
    locationYMapPinLimits = {
      MIN: locationYLimits.MIN - height,
      MAX: locationYLimits.MAX - height
    };
  };

  var setCoords = function (startCoords, event, currentMapPinHeight) {
    var shift = {
      x: startCoords.x - event.clientX,
      y: startCoords.y - event.clientY
    };

    startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var calcMapPintop = window.vars.mapPinMainElement.offsetTop - shift.y;
    var calcMapPinLeft = window.vars.mapPinMainElement.offsetLeft - shift.x;

    setLocationYMapPinLimit(currentMapPinHeight);

    var mapPintop = getCoords(calcMapPintop, locationYMapPinLimits);
    var mapPinLeft = getCoords(calcMapPinLeft, locationXLimits);

    window.vars.mapPinMainElement.style.top = mapPintop + 'px';
    window.vars.mapPinMainElement.style.left = mapPinLeft + 'px';

    return startCoords;
  };

  window.drag = function () {
    var activated = false;

    window.vars.mapPinMainElement.addEventListener('mousedown', function (e) {
      e.preventDefault();

      var startCoords = {
        x: e.clientX,
        y: e.clientY
      };

      var currentMapPinHeight = activated ? window.vars.mapPinMainElementDimensions.height + window.vars.mapPinMainElementDimensions.after : window.vars.mapPinMainElementDimensions.height / 2;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        startCoords = setCoords(startCoords, moveEvt, currentMapPinHeight);
        window.utils.setAddress(currentMapPinHeight);

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        startCoords = setCoords(startCoords, upEvt, currentMapPinHeight);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (!activated) {
          window.state.activate();
          activated = true;
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

})();
