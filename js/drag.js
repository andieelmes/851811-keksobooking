'use strict';

(function () {
  var getCoords = function (coord, limits) {
    return Math.min(Math.max(coord, limits.MIN), limits.MAX);
  };

  var setLocationYMapPinLimit = function (height) {
    window.vars.locationYMapPinLimits = {
      MIN: window.vars.locationYLimits.MIN - height,
      MAX: window.vars.locationYLimits.MAX - height
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

    var mapPintop = getCoords(calcMapPintop, window.vars.locationYMapPinLimits);
    var mapPinLeft = getCoords(calcMapPinLeft, window.vars.locationXLimits);

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
        window.helpers.setAddress(currentMapPinHeight);

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
