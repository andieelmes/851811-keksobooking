'use strict';

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

var mapElement = document.querySelector('.map');
var filtersElement = document.querySelector('.map__filters-container');
var mapPinsElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var adFormElement = document.querySelector('.ad-form');
var mapFormElement = document.querySelector('.map__filters');
var adFormInputElements = adFormElement.querySelectorAll('input, select');
var mapFormInputElements = mapFormElement.querySelectorAll('input, select');

var mapPinMainElement = document.querySelector('.map__pin--main');
var mapPinMainElementDimensions = {
  width: mapPinMainElement.offsetWidth,
  height: mapPinMainElement.offsetHeight,
  after: 19,
};

var addressInputElement = adFormElement.querySelector('[name="address"]');
var roomsSelectElement = adFormElement.querySelector('[name="rooms"]');
var capacitySelectElement = adFormElement.querySelector('[name="capacity"]');
var typeSelectElement = adFormElement.querySelector('[name="type"]');
var priceInputElement = adFormElement.querySelector('[name="price"]');
var timeInSelectElement = adFormElement.querySelector('[name="timein"]');
var timeOutSelectElement = adFormElement.querySelector('[name="timeout"]');

var avatarLimits = {
  MIN: 1,
  MAX: 8
};
var priceLimits = {
  MIN: 1000,
  MAX: 1000000
};
var roomsLimits = {
  MIN: 1,
  MAX: 5
};

var locationXLimits = {
  MIN: 0,
  MAX: mapPinsElement.offsetWidth - mapPinMainElement.offsetWidth
};

var locationYLimits = {
  MIN: 130,
  MAX: 630
};

var titlesLeft = TITLES.slice(0);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor((max - min) + 1) + min);
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomNumberFromLimit(obj) {
  return getRandomInt(obj.MIN, obj.MAX);
}

function getRandomElements(array, length) {
  var elements = [];
  var elementsLength = length;
  while (elements.length < elementsLength) {
    var randomArrayElementNumber = getRandomInt(0, array.length - 1);
    var randomArrayElement = array[randomArrayElementNumber];

    if (elements.indexOf(randomArrayElement) === -1) {
      elements.push(randomArrayElement);
    }
  }

  return elements;
}

function getRandomElementAndRemoveIt(array) {
  var index = getRandomInt(0, array.length - 1);
  var element = array[index];
  array = array.splice(index, 1);
  return element;
}

function makeListing() {
  var author = {
    avatar: 'img/avatars/user0' + getRandomNumberFromLimit(avatarLimits) + '.png'
  };

  var location = {
    x: getRandomNumberFromLimit(locationXLimits),
    y: getRandomNumberFromLimit(locationYLimits)
  };

  var offer = {
    title: getRandomElementAndRemoveIt(titlesLeft),
    address: location.x + ',' + location.y,
    price: getRandomNumberFromLimit(priceLimits),
    type: getRandomElement(TYPES),
    rooms: getRandomNumberFromLimit(roomsLimits),
    guests: getRandomInt(1, 20),
    checkin: getRandomElement(TIMES),
    checkout: getRandomElement(TIMES),
    features: getRandomElements(FEATURES, getRandomInt(1, FEATURES.length)),
    description: '',
    photos: getRandomElements(PHOTOS, PHOTOS.length)
  };

  var listing = {
    author: author,
    offer: offer,
    location: location
  };

  return listing;
}

var generateListings = function () {
  var array = [];

  for (var i = 0; i < NUMBER_OF_LISTINGS; i++) {
    array.push(makeListing());
  }

  return array;
};

var renderMapPin = function (listing, element) {
  var mapCardElement = element.cloneNode(true);

  var x = listing.location.x - MAP_PIN_ELEMENT_DIMENSIONS.width / 2;
  var y = listing.location.y - MAP_PIN_ELEMENT_DIMENSIONS.height;

  mapCardElement.style = 'left: ' + x + 'px; top: ' + y + 'px';
  mapCardElement.querySelector('img').src = listing.author.avatar;
  mapCardElement.querySelector('img').alt = listing.offer.title;

  return mapCardElement;
};

var renderFeature = function (feature, element) {
  var photoElement = element.querySelector('.popup__features .popup__feature--wifi').cloneNode(true);
  photoElement.classList.remove('popup__feature--wifi');
  photoElement.classList.add('popup__feature--' + feature);

  return photoElement;
};


var renderPhoto = function (photo, element) {
  var photoElement = element.querySelector('.popup__photos img').cloneNode(true);
  photoElement.src = photo;

  return photoElement;
};


var renderCardElement = function (listing) {
  var cardElement = mapCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = listing.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = listing.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = listing.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES_TRANSLATION[listing.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = listing.offer.description;
  cardElement.querySelector('.popup__photos').src = listing.author.avatar;

  var featureElement = cardElement.querySelector('.popup__features');
  populateDom(listing.offer.features, featureElement, cardElement, renderFeature, true);

  var photoElement = cardElement.querySelector('.popup__photos');
  populateDom(listing.offer.photos, photoElement, cardElement, renderPhoto, true);

  return cardElement;
};

var populateDom = function (array, newElement, templateElement, render, clear) {
  var fragment = document.createDocumentFragment();
  for (var y = 0; y < array.length; y++) {
    fragment.appendChild(render(array[y], templateElement));
  }

  if (clear) {
    newElement.innerHTML = '';
  }
  newElement.appendChild(fragment);
};

var makeMapCardElement = function (listing) {
  var cardElement = mapElement.querySelector(CARD_ELEMENT_CLASS);
  if (cardElement) {
    cardElement.remove();
  }
  var card = renderCardElement(listing);
  mapElement.insertBefore(card, filtersElement);

  var cardCloseElement = card.querySelector('.popup__close');

  var onPopupEscPress = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
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
    if (e.keyCode === ENTER_KEYCODE) {
      closePopup(card);
    }
  });
};

var showMap = function () {
  mapElement.classList.remove('hidden');
};

var setAddress = function (height) {
  var addressX = +mapPinMainElement.style.left.replace('px', '') + mapPinMainElementDimensions.width / 2;
  var addressY = +mapPinMainElement.style.top.replace('px', '') + height;
  addressInputElement.value = addressX + ', ' + addressY;
};

var setState = function (state) {
  mapElement.classList[state.classAction]('map--faded');

  setAddress(state.mapPinHeight);

  adFormElement.classList[state.classAction]('ad-form--disabled');
  for (var i = 0; i < adFormInputElements.length; i++) {
    adFormInputElements[i].disabled = state.inputDisableAction;
  }
  mapFormElement.classList[state.classAction]('map-form--disabled');
  for (var j = 0; j < mapFormInputElements.length; j++) {
    mapFormInputElements[j].disabled = state.inputDisableAction;
  }

};

var showMapCardElement = function (listings, mapPins) {
  listings.forEach(function (listing, i) {
    mapPins[i].addEventListener('click', function () {
      makeMapCardElement(listing);
    });
  });
};

var setCapacity = function () {
  var rooms = roomsSelectElement.value;
  var capacityOptions = capacitySelectElement.querySelectorAll('option');
  var capacity = ROOMS_TO_CAPACITY[rooms];

  capacityOptions.forEach(function (option) {
    option.disabled = true;
  });

  capacity.forEach(function (guests) {
    capacitySelectElement.querySelector('[value="' + guests + '"]').disabled = false;
    var firstValidOption = capacitySelectElement.querySelector('option:not(:disabled)').value;
    capacitySelectElement.value = firstValidOption;
  });
};

var onChangeCapacity = function () {
  setCapacity();
};

var setMinPrice = function () {
  var type = typeSelectElement.value;
  var price = TYPE_TO_PRICE[type];

  priceInputElement.min = price;
  priceInputElement.placeholder = price;
};

var onChangeType = function () {
  setMinPrice();
};

var syncTime = function () {
  var currentSelect = timeInSelectElement;
  var selectToChange = timeOutSelectElement;
  var currentSelectValue = currentSelect.value;
  selectToChange.value = currentSelectValue;
};

var onChangeTime = function (e) {
  var currentSelect = e.target;
  var selectToChange = currentSelect === timeInSelectElement ? timeOutSelectElement : timeInSelectElement;

  var currentSelectValue = currentSelect.value;
  selectToChange.value = currentSelectValue;
};

var getCoords = function (coord, limits) {
  return Math.min(Math.max(coord, limits.MIN), limits.MAX);
};

var setCoords = function (startCoords, event) {
  var shift = {
    x: startCoords.x - event.clientX,
    y: startCoords.y - event.clientY
  };

  startCoords = {
    x: event.clientX,
    y: event.clientY
  };

  var calcMapPintop = mapPinMainElement.offsetTop - shift.y;
  var calcMapPinLeft = mapPinMainElement.offsetLeft - shift.x;

  var mapPintop = getCoords(calcMapPintop, locationYLimits);
  var mapPinLeft = getCoords(calcMapPinLeft, locationXLimits);

  mapPinMainElement.style.top = mapPintop + 'px';
  mapPinMainElement.style.left = mapPinLeft + 'px';

  return startCoords;
};

var init = function () {
  setState({
    classAction: 'add',
    inputDisableAction: true,
    mapPinHeight: mapPinMainElementDimensions.height / 2,
  });

  var activated = false;

  mapPinMainElement.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var currentMapPinHeight = activated ? mapPinMainElementDimensions.height + mapPinMainElementDimensions.after : mapPinMainElementDimensions.height / 2;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      startCoords = setCoords(startCoords, moveEvt);

      setAddress(currentMapPinHeight);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      startCoords = setCoords(startCoords, upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!activated) {
        activate();
        activated = true;
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

};

var activate = function () {
  var pins = generateListings();

  populateDom(pins, mapPinsElement, mapPinTemplate, renderMapPin);
  var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  showMapCardElement(pins, mapPinElements);
  showMap();

  setState({
    classAction: 'remove',
    inputDisableAction: false,
    mapPinHeight: mapPinMainElementDimensions.height + mapPinMainElementDimensions.after,
  });

  roomsSelectElement.addEventListener('change', onChangeCapacity);
  setCapacity();

  typeSelectElement.addEventListener('change', onChangeType);
  setMinPrice();

  timeInSelectElement.addEventListener('change', onChangeTime);
  timeOutSelectElement.addEventListener('change', onChangeTime);
  syncTime();
};

init();
