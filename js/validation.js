
'use strict';

(function () {
  var capacitySelectElement = window.vars.adFormElement.querySelector('[name="capacity"]');
  var roomsSelectElement = window.vars.adFormElement.querySelector('[name="rooms"]');
  var priceInputElement = window.vars.adFormElement.querySelector('[name="price"]');
  var typeSelectElement = window.vars.adFormElement.querySelector('[name="type"]');
  var timeInSelectElement = window.vars.adFormElement.querySelector('[name="timein"]');
  var timeOutSelectElement = window.vars.adFormElement.querySelector('[name="timeout"]');


  var setCapacity = function () {
    var rooms = roomsSelectElement.value;
    var capacityOptions = capacitySelectElement.querySelectorAll('option');
    var capacity = window.consts.RoomsToCapacity[rooms];

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
    var price = window.consts.TypeToPrice[type];

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

  window.synchronizeFields = function () {
    roomsSelectElement.addEventListener('change', onChangeCapacity);
    setCapacity();

    typeSelectElement.addEventListener('change', onChangeType);
    setMinPrice();

    timeInSelectElement.addEventListener('change', onChangeTime);
    timeOutSelectElement.addEventListener('change', onChangeTime);
    syncTime();
  };
})();
