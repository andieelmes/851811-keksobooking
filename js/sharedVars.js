
'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');

  var mapPinMainElement = document.querySelector('.map__pin--main');

  var mapPinMainElementDimensions = {
    width: mapPinMainElement.offsetWidth,
    height: mapPinMainElement.offsetHeight,
    after: 19,
  };

  var listings = [];
  var filteredListings = [];

  var adFormElement = document.querySelector('.ad-form');

  var mapFormElement = document.querySelector('.map__filters');

  var avatarElement = document.querySelector('.ad-form-header__preview img');
  var photoElement = document.querySelector('.ad-form__photo');
  var photoElementTemplate = photoElement.cloneNode(true);
  var photoElementTemplateParentElement = photoElement.parentElement;

  var photoUploaded = false;

  window.vars = {
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
    mapPinMainElement: mapPinMainElement,
    mapPinMainElementDimensions: mapPinMainElementDimensions,
    listings: listings,
    filteredListings: filteredListings,
    adFormElement: adFormElement,
    mapFormElement: mapFormElement,
    avatarElement: avatarElement,
    photoElement: photoElement,
    photoElementTemplate: photoElementTemplate,
    photoElementTemplateParentElement: photoElementTemplateParentElement,
    photoUploaded: photoUploaded,
  };
})();
