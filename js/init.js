'use strict';

(function () {
  window.init = function () {
    window.state.setState({
      classAction: 'add',
      inputDisableAction: true,
      mapPinHeight: window.vars.mapPinMainElementDimensions.height / 2,
    });
    window.drag();
  };
})();
