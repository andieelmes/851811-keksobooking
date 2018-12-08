
'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters-container');

  var showMap = function () {
    window.vars.mapElement.classList.remove('hidden');
  };

  var showMapCardElement = function (listings, mapPins) {
    listings.forEach(function (listing, i) {
      mapPins[i].addEventListener('click', function () {
        makeMapCardElement(listing);
      });
    });
  };

  var makeMapCardElement = function (listing) {
    var cardElement = window.vars.mapElement.querySelector(window.consts.CARD_ELEMENT_CLASS);
    if (cardElement) {
      cardElement.remove();
    }
    var card = window.render.renderCardElement(listing);
    window.vars.mapElement.insertBefore(card, filtersElement);

    var cardCloseElement = card.querySelector('.popup__close');

    document.addEventListener('keydown', function (e) {
      window.utils.onPopupEscPress(e, card);
    });

    cardCloseElement.addEventListener('click', function () {
      window.utils.closePopup(card);
    });

    cardCloseElement.addEventListener('keydown', function (e) {
      if (e.keyCode === window.consts.ENTER_KEYCODE) {
        window.utils.closePopup(card);
      }
    });
  };

  window.setup = {
    showMap: showMap,
    showMapCardElement: showMapCardElement,
  };
})();
