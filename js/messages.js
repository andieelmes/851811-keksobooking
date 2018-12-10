
'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var subscribeToEvents = function (popup) {
    document.addEventListener('keydown', function (e) {
      window.utils.onPopupEscPress(e, popup);
    });

    document.addEventListener('click', function () {
      window.utils.closePopup(popup);
    });
  };

  var onLoad = function () {
    var successElement = successTemplate.cloneNode(true);
    mainElement.appendChild(successElement);

    subscribeToEvents(successElement);
    window.vars.adFormElement.reset();
    window.validate();
    window.utils.resetMapPin();
    window.utils.setAddress(window.vars.mapPinMainElementDimensions.height + window.vars.mapPinMainElementDimensions.after);
    window.utils.removeCard();
  };

  var onError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    mainElement.appendChild(errorElement);

    var resetBtnElement = errorElement.querySelector('.error__button');

    subscribeToEvents(errorElement);
    resetBtnElement.addEventListener('click', function () {
      window.vars.adFormElement.reset();
      window.utils.closePopup(errorElement);
      window.state.deactivate();
    });
  };

  window.messages = {
    onLoad: onLoad,
    onError: onError,
  };
})();
