
'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters-container');

  var showMap = function () {
    window.vars.mapElement.classList.remove('hidden');
  };

  var showMapCardElement = function (listings) {
    listings.forEach(function (listing) {
      var address = listing.location.x.toString() + ', ' + listing.location.y.toString();
      var pin = window.vars.mapPinsElement.querySelector('[data-address="' + address + '"]');
      pin.addEventListener('click', function () {
        makeMapCardElement(listing, pin);
        var previousActivePin = window.vars.mapPinsElement.querySelector('.' + window.consts.ACTIVE_PIN_CLASS);
        if (previousActivePin) {
          window.utils.removeActivePinClass(previousActivePin);
        }
        pin.classList.add(window.consts.ACTIVE_PIN_CLASS);
      });
    });
  };

  var makeMapCardElement = function (listing, pin) {
    var cardElement = window.vars.mapElement.querySelector(window.consts.CARD_ELEMENT_CLASS_SELECTOR);
    if (cardElement) {
      cardElement.remove();
    }
    var card = window.render.renderCardElement(listing);
    window.vars.mapElement.insertBefore(card, filtersElement);

    var cardCloseElement = card.querySelector('.popup__close');

    document.addEventListener('keydown', function (e) {
      window.utils.onPopupEscPress(e, card);
      window.utils.removeActivePinClass(pin);
    });

    cardCloseElement.addEventListener('click', function () {
      window.utils.closePopup(card);
      window.utils.removeActivePinClass(pin);
    });

    cardCloseElement.addEventListener('keydown', function (e) {
      if (e.keyCode === window.consts.ENTER_KEYCODE) {
        window.utils.closePopup(card);
        window.utils.removeActivePinClass(pin);
      }
    });
  };

  window.setup = {
    showMap: showMap,
    showMapCardElement: showMapCardElement,
  };
})();
