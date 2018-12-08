
'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  var renderMapPin = function (listing, element) {
    var mapCardElement = element.cloneNode(true);

    var x = listing.location.x - window.consts.MAP_PIN_ELEMENT_DIMENSIONS.width / 2;
    var y = listing.location.y - window.consts.MAP_PIN_ELEMENT_DIMENSIONS.height;

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
    if (!listing.offer) {
      return false;
    }

    var cardElement = mapCardTemplate.cloneNode(true);
    var innerElements = window.vars.cardElementsClasses;

    for (var i = 0; i < innerElements.length; i++) {
      cardElement.querySelector(innerElements[i]).textContent = '';
    }

    if (listing.offer.title) {
      cardElement.querySelector('.popup__title').textContent = listing.offer.title;
    }
    if (listing.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = listing.offer.address;
    }
    if (listing.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = listing.offer.price + '₽/ночь';
    }
    if (window.consts.TYPES_TRANSLATION[listing.offer.type]) {
      cardElement.querySelector('.popup__type').textContent = window.consts.TYPES_TRANSLATION[listing.offer.type];
    }
    if (listing.offer.rooms && !listing.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты';
    }
    if (!listing.offer.rooms && listing.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = 'Для ' + listing.offer.guests + ' гостей';
    }
    if (listing.offer.rooms && listing.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';
    }
    if (listing.offer.checkin && !listing.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + listing.offer.checkin;
    }
    if (!listing.offer.checkin && listing.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Выезд до ' + listing.offer.checkout;
    }
    if (listing.offer.checkin && listing.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;
    }
    if (listing.offer.description) {
      cardElement.querySelector('.popup__description').textContent = listing.offer.description;
    }
    if (listing.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = listing.author.avatar;
    }
    if (listing.offer.features) {
      var featureElement = cardElement.querySelector('.popup__features');
      window.utils.populateDom(listing.offer.features, featureElement, cardElement, renderFeature, true);
    }
    if (listing.offer.photos) {
      var photoElement = cardElement.querySelector('.popup__photos');
      window.utils.populateDom(listing.offer.photos, photoElement, cardElement, renderPhoto, true);
    }
    return cardElement;
  };

  window.render = {
    renderMapPin: renderMapPin,
    renderCardElement: renderCardElement,
  };
})();
