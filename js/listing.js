
'use strict';

(function () {
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

  var titlesLeft = window.consts.TITLES.slice(0);

  function makeListing() {
    var author = {
      avatar: 'img/avatars/user0' + window.utils.getRandomNumberFromLimit(avatarLimits) + '.png'
    };

    var location = {
      x: window.utils.getRandomNumberFromLimit(window.vars.locationXLimits),
      y: window.utils.getRandomNumberFromLimit(window.vars.locationYLimits)
    };

    var offer = {
      title: window.utils.getRandomElementAndRemoveIt(titlesLeft),
      address: location.x + ',' + location.y,
      price: window.utils.getRandomNumberFromLimit(priceLimits),
      type: window.utils.getRandomElement(window.consts.TYPES),
      rooms: window.utils.getRandomNumberFromLimit(roomsLimits),
      guests: window.utils.getRandomInt(1, 20),
      checkin: window.utils.getRandomElement(window.consts.TIMES),
      checkout: window.utils.getRandomElement(window.consts.TIMES),
      features: window.utils.getRandomElements(window.consts.FEATURES, window.utils.getRandomInt(1, window.consts.FEATURES.length)),
      description: '',
      photos: window.utils.getRandomElements(window.consts.PHOTOS, window.consts.PHOTOS.length)
    };

    var listing = {
      author: author,
      offer: offer,
      location: location
    };

    return listing;
  }

  window.generateListings = function () {
    var array = [];

    for (var i = 0; i < window.consts.NUMBER_OF_LISTINGS; i++) {
      array.push(makeListing());
    }

    return array;
  };
})();
