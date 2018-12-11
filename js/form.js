
'use strict';

(function () {
  var onSubmitForm = function (e) {
    window.backend.save(new FormData(window.vars.adFormElement), window.messages.onLoad, window.messages.onError);
    e.preventDefault();
  };

  window.vars.adFormElement.addEventListener('submit', onSubmitForm);
})();
