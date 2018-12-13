
'use strict';

(function () {
  var NUMBER_OF_LISTINGS = 5;

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var CARD_ELEMENT_CLASS = '.map__card';
  var DEBOUNCE_INTERVAL = 500; // ms

  var MAP_PIN_ELEMENT_DIMENSIONS = {
    width: 50,
    height: 70,
  };

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
    TITLES: TITLES,
    TYPES: TYPES,
    TIMES: TIMES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    CARD_ELEMENT_CLASS: CARD_ELEMENT_CLASS,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MAP_PIN_ELEMENT_DIMENSIONS: MAP_PIN_ELEMENT_DIMENSIONS,
    TypesTranslation: TypesTranslation,
    RoomsToCapacity: RoomsToCapacity,
    TypeToPrice: TypeToPrice,
    PriceCategory: PriceCategory,
  };
})();
