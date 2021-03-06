
'use strict';

(function () {
  var NUMBER_OF_LISTINGS = 5;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var CARD_ELEMENT_CLASS_SELECTOR = '.map__card';
  var ACTIVE_PIN_CLASS = 'map__pin--active';
  var DEBOUNCE_INTERVAL = 500; // ms

  var MAP_PIN_ELEMENT_DIMENSIONS = {
    width: 50,
    height: 70,
  };

  var DEFAULT_AVATAR_SRC = '';

  var TypesTranslation = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var RoomsToCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var TypeToPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var PriceCategory = {
    low: {
      MIN: 0,
      MAX: 10000,
    },
    middle: {
      MIN: 10000,
      MAX: 50000,
    },
    high: {
      MIN: 50000,
      MAX: Infinity,
    },
  };


  window.consts = {
    NUMBER_OF_LISTINGS: NUMBER_OF_LISTINGS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    CARD_ELEMENT_CLASS_SELECTOR: CARD_ELEMENT_CLASS_SELECTOR,
    ACTIVE_PIN_CLASS: ACTIVE_PIN_CLASS,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MAP_PIN_ELEMENT_DIMENSIONS: MAP_PIN_ELEMENT_DIMENSIONS,
    DEFAULT_AVATAR_SRC: DEFAULT_AVATAR_SRC,
    TypesTranslation: TypesTranslation,
    RoomsToCapacity: RoomsToCapacity,
    TypeToPrice: TypeToPrice,
    PriceCategory: PriceCategory,
  };
})();
