'use strict';

var NUMBER_OF_LISTINGS = 8;

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var AVATAR_LIMITS = [1, 8];
var PRICE_LIMITS = [1000, 1000000];
var ROOMS_LIMITS = [1, 5];
var LOCATION_Y_LIMITS = [130, 630];

var mapElement = document.querySelector('.map');
var filtersElement = document.querySelector('.map__filters-container');
var mapPinsElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var LOCATION_X_LIMITS = [0, mapPinsElement.offsetWidth];

var titlesLeft = TITLES;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor((max - min) + 1) + min);
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomNumberFromLimit(array) {
  return getRandomInt(array[0], array[1]);
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
    avatar: '0' + getRandomNumberFromLimit(AVATAR_LIMITS)
  };

  var location = {
    x: getRandomNumberFromLimit(LOCATION_X_LIMITS),
    y: getRandomNumberFromLimit(LOCATION_Y_LIMITS)
  };

  var offer = {
    title: getRandomElementAndRemoveIt(titlesLeft),
    address: location.x + ',' + location.y,
    price: getRandomNumberFromLimit(PRICE_LIMITS),
    type: getRandomElement(TYPES),
    rooms: getRandomNumberFromLimit(ROOMS_LIMITS),
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
    var newListing = makeListing();
    array.push(newListing);
  }

  return array;
};

var renderMapPin = function (listing) {
  var mapCardElement = mapPinTemplate.cloneNode(true);

  var x = listing.location.x + mapCardElement.offsetWidth / 2;
  var y = listing.location.y + mapCardElement.offsetHeight;

  mapCardElement.style = 'left: ' + x + 'px; top: ' + y + 'px';
  mapCardElement.src = listing.author.avatar;
  mapCardElement.alt = listing.offer.title;

  return mapCardElement;
};

var renderCardElement = function (listing) {
  var cardElement = mapCardTemplate.cloneNode(true);

  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getFeatures = function () {
    var featuresString = '';
    var features = listing.offer.features;
    for (var k = 0; k < features.length; k++) {
      featuresString += features[k];
      if (k !== features.length - 1) {
        featuresString += ', ';
      }
    }
    return featuresString;
  };

  var renderPhoto = function (photo) {
    var photoElement = cardElement.querySelector('.popup__photos img').cloneNode(true);
    photoElement.src = photo;

    return photoElement;
  };

  var makePhotos = function (array) {
    var fragment = document.createDocumentFragment();
    for (var y = 0; y < array.length; y++) {
      fragment.appendChild(renderPhoto(array[y]));
    }
    photoElement.innerHTML = '';
    photoElement.appendChild(fragment);
  };

  cardElement.querySelector('.popup__title').textContent = listing.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = listing.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = listing.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = types[listing.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = getFeatures();
  cardElement.querySelector('.popup__description').textContent = listing.offer.description;

  var photoElement = cardElement.querySelector('.popup__photos');
  makePhotos(listing.offer.photos);

  cardElement.querySelector('.popup__photos').src = listing.author.avatar;

  return cardElement;
};

var makeMapPinsElements = function (array) {
  var fragment = document.createDocumentFragment();
  for (var y = 0; y < array.length; y++) {
    fragment.appendChild(renderMapPin(array[y]));
  }
  mapPinsElement.appendChild(fragment);
};

var makeMapCardElement = function (listing) {
  mapElement.insertBefore(renderCardElement(listing), filtersElement);
};

var showMap = function () {
  mapElement.classList.remove('hidden');
};

var init = function () {
  var pins = generateListings();
  makeMapPinsElements(pins);
  makeMapCardElement(pins[0]);
  showMap();
};

init();
