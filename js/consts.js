
'use strict';

(function () {
  var NUMBER_OF_LISTINGS = 8;

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TypesTranslation = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var CARD_ELEMENT_CLASS = '.map__card';

  var RoomsToCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var TypeToPrice = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };

  var MAP_PIN_ELEMENT_DIMENSIONS = {
    width: 50,
    height: 70,
  };

  window.consts = {
    NUMBER_OF_LISTINGS: NUMBER_OF_LISTINGS,
    TITLES: TITLES,
    TYPES: TYPES,
    TypesTranslation: TypesTranslation,
    TIMES: TIMES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    CARD_ELEMENT_CLASS: CARD_ELEMENT_CLASS,
    RoomsToCapacity: RoomsToCapacity,
    TypeToPrice: TypeToPrice,
    MAP_PIN_ELEMENT_DIMENSIONS: MAP_PIN_ELEMENT_DIMENSIONS,
  };
})();
