'use strict';

(function () {
  var init = function () {
    window.state.setState({
      classAction: 'add',
      inputDisableAction: true,
      mapPinHeight: window.vars.mapPinMainElementDimensions.height / 2,
    });
    window.drag();
  };

  init();
})();
