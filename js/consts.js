
'use strict';

(function () {
  var NUMBER_OF_LISTINGS = 8;

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TYPES_TRANSLATION = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var CARD_ELEMENT_CLASS = '.map__card';

  var ROOMS_TO_CAPACITY = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var TYPE_TO_PRICE = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var MAP_PIN_ELEMENT_DIMENSIONS = {
    width: 50,
    height: 70,
  };

  window.consts = {
    NUMBER_OF_LISTINGS: NUMBER_OF_LISTINGS,
    TITLES: TITLES,
    TYPES: TYPES,
    TYPES_TRANSLATION: TYPES_TRANSLATION,
    TIMES: TIMES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    CARD_ELEMENT_CLASS: CARD_ELEMENT_CLASS,
    ROOMS_TO_CAPACITY: ROOMS_TO_CAPACITY,
    TYPE_TO_PRICE: TYPE_TO_PRICE,
    MAP_PIN_ELEMENT_DIMENSIONS: MAP_PIN_ELEMENT_DIMENSIONS,
  };
})();
