
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

    var onPopupEscPress = function (e) {
      if (e.keyCode === window.consts.ESC_KEYCODE) {
        closePopup(card);
      }
    };

    document.addEventListener('keydown', onPopupEscPress);

    var closePopup = function () {
      card.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    cardCloseElement.addEventListener('click', function () {
      closePopup(card);
    });

    cardCloseElement.addEventListener('keydown', function (e) {
      if (e.keyCode === window.consts.ENTER_KEYCODE) {
        closePopup(card);
      }
    });
  };

  window.setup = {
    showMap: showMap,
    showMapCardElement: showMapCardElement,
  };
})();
