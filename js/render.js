
'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderMapPin = function (listing, element) {
    var mapCardElement = element.cloneNode(true);

    var x = listing.location.x - window.consts.MAP_PIN_ELEMENT_DIMENSIONS.width / 2;
    var y = listing.location.y - window.consts.MAP_PIN_ELEMENT_DIMENSIONS.height;

    mapCardElement.style = 'left: ' + x + 'px; top: ' + y + 'px';
    mapCardElement.querySelector('img').src = listing.author.avatar;
    mapCardElement.querySelector('img').alt = listing.offer.title;
    mapCardElement.setAttribute('data-address', listing.location.x.toString() + ', ' + listing.location.y.toString());

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

    cardElement.querySelector('.popup__title').textContent = listing.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = listing.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = listing.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.consts.TypesTranslation[listing.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + listing.offer.checkin + ', выезд до ' + listing.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = listing.offer.description;
    cardElement.querySelector('.popup__avatar').src = listing.author.avatar;


    if (listing.offer.features) {
      var featureElement = cardElement.querySelector('.popup__features');
      window.utils.populateDom(listing.offer.features, featureElement, cardElement, renderFeature, true);
    } else {
      cardElement.querySelector('.popup__features').remove();
    }
    if (listing.offer.photos) {
      var photoElement = cardElement.querySelector('.popup__photos');
      window.utils.populateDom(listing.offer.photos, photoElement, cardElement, renderPhoto, true);
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }
    return cardElement;
  };

  var renderPins = function () {
    window.vars.mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (window.vars.mapPinElements) {
      window.vars.mapPinElements.forEach(function (item) {
        item.remove();
      });
    }

    window.vars.filteredListings = window.vars.filteredListings.slice(0, window.consts.NUMBER_OF_LISTINGS);
    window.utils.populateDom(window.vars.filteredListings, window.vars.mapPinsElement, mapPinTemplate, window.render.renderMapPin);
  };

  window.render = {
    renderMapPin: renderMapPin,
    renderCardElement: renderCardElement,
    renderPins: renderPins,
  };
})();
