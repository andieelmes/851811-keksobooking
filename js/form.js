
'use strict';

(function () {
  var resetBtnElement = window.vars.adFormElement.querySelector('.ad-form__reset');

  resetBtnElement.addEventListener('click', window.utils.resetListingFormWithAButton);

  var onSubmitForm = function (e) {
    window.backend.save(new FormData(window.vars.adFormElement), window.messages.onLoad, window.messages.onError);
    e.preventDefault();
  };

  window.vars.adFormElement.addEventListener('submit', onSubmitForm);
})();
