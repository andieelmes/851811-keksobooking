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

var AVATAR_LIMITS = {
  MIN: 1,
  MAX: 8
};
var PRICE_LIMITS = {
  MIN: 1000,
  MAX: 1000000
};
var ROOMS_LIMITS = {
  MIN: 1,
  MAX: 5
};
var LOCATION_Y_LIMITS = {
  MIN: 130,
  MAX: 630
};

var mapElement = document.querySelector('.map');
var filtersElement = document.querySelector('.map__filters-container');
var mapPinsElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var LOCATION_X_LIMITS = {
  MIN: 0,
  MAX: mapPinsElement.offsetWidth
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
    avatar: 'img/avatars/user0' + getRandomNumberFromLimit(AVATAR_LIMITS) + '.png'
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
    array.push(makeListing());
  }

  return array;
};

var renderMapPin = function (listing, element) {
  var mapCardElement = element.cloneNode(true);

  var x = listing.location.x + mapCardElement.offsetWidth / 2;
  var y = listing.location.y + mapCardElement.offsetHeight;

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
  mapElement.insertBefore(renderCardElement(listing), filtersElement);
};

var showMap = function () {
  mapElement.classList.remove('hidden');
};

var init = function () {
  var pins = generateListings();
  populateDom(pins, mapPinsElement, mapPinTemplate, renderMapPin);
  makeMapCardElement(pins[0]);
  showMap();
};

init();
