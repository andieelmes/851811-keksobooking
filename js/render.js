
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
    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = listing.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = listing.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = listing.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.consts.TYPES_TRANSLATION[listing.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = listing.offer.description;
    cardElement.querySelector('.popup__photos').src = listing.author.avatar;

    var featureElement = cardElement.querySelector('.popup__features');
    window.helpers.populateDom(listing.offer.features, featureElement, cardElement, renderFeature, true);

    var photoElement = cardElement.querySelector('.popup__photos');
    window.helpers.populateDom(listing.offer.photos, photoElement, cardElement, renderPhoto, true);

    return cardElement;
  };

  window.render = {
    renderMapPin: renderMapPin,
    renderCardElement: renderCardElement,
  };
})();