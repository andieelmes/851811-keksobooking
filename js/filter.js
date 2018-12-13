'use strict';

(function () {

  var filters = {
    type: '',
    price: '',
    rooms: '',
    guests: '',
    features: [],
  };

  var typeSelectElement = window.vars.mapFormElement.querySelector('[name="housing-type"]');
  var priceSelectElement = window.vars.mapFormElement.querySelector('[name="housing-price"]');
  var roomsSelectElement = window.vars.mapFormElement.querySelector('[name="housing-rooms"]');
  var guestsSelectElement = window.vars.mapFormElement.querySelector('[name="housing-guests"]');
  var featuresCheckboxElements = window.vars.mapFormElement.querySelectorAll('[name="features"]');

  var addChangeEvents = function (element) {
    var name = element.name.replace('housing-', '');
    return window.utils.debounce(function () {
      var value = element.value;
      if (name === 'features') {
        if (element.checked) {
          filters[name].push(value);
        } else {
          window.utils.removeArrayElement(filters[name], value);
        }
      } else {
        filters[name] = value;
      }
      window.filter.updateListings(value);
    });
  };

  var onTypeChange = addChangeEvents(typeSelectElement);
  var onPriceChange = addChangeEvents(priceSelectElement);
  var onRoomsChange = addChangeEvents(roomsSelectElement);
  var onGuestsChange = addChangeEvents(guestsSelectElement);

  typeSelectElement.addEventListener('change', onTypeChange);
  priceSelectElement.addEventListener('change', onPriceChange);
  roomsSelectElement.addEventListener('change', onRoomsChange);
  guestsSelectElement.addEventListener('change', onGuestsChange);

  featuresCheckboxElements.forEach(function (feature) {
    var onFeatureChange = addChangeEvents(feature);
    feature.addEventListener('change', onFeatureChange);
  });

  var checkPrice = function (listing, selectedValue) {
    return listing.offer.price > window.consts.PriceCategory[selectedValue].MIN && listing.offer.price < window.consts.PriceCategory[selectedValue].MAX;
  };

  var checkFeatures = function (listing) {
    var result = true;
    if (filters.features.length) {
      for (var i = 0; i < filters.features.length; i++) {
        var currentFeature = filters.features[i];
        if (listing.offer.features.indexOf(currentFeature) === -1) {
          result = false;
          break;
        }
      }
    }
    return result;
  };

  var filterListings = function (listings, selectedValue, name) {
    return listings.filter(function (listing) {
      var result;
      if (selectedValue === 'any') {
        result = listing.offer[name];
      } else {
        switch (name) {
          case 'type':
            result = listing.offer.type === selectedValue;
            break;
          case 'price':
            result = checkPrice(listing, selectedValue);
            break;
          case 'features':
            result = checkFeatures(listing);
            break;
          default:
            result = listing.offer[name] === +selectedValue;
        }
      }
      return result;
    });
  };

  var updateListings = function (value) {
    window.vars.filteredListings = window.vars.listings;
    if (value) {
      Object.keys(filters).forEach(function (filterKey) {
        var selectedValue = filters[filterKey];
        if (selectedValue !== '') {
          window.vars.filteredListings = filterListings(window.vars.filteredListings, selectedValue, filterKey);
        }
      });
      window.utils.removeCard();
    }
    window.render.renderPins();
    window.setup.showMapCardElement(window.vars.filteredListings);
  };

  window.filter = {
    updateListings: updateListings,
  };

})();
