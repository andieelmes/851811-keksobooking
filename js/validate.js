
'use strict';

(function () {
  var capacitySelectElement = window.vars.adFormElement.querySelector('[name="capacity"]');
  var priceInputElement = window.vars.adFormElement.querySelector('[name="price"]');

  var setCapacity = function () {
    var rooms = window.vars.roomsSelectElement.value;
    var capacityOptions = capacitySelectElement.querySelectorAll('option');
    var capacity = window.consts.ROOMS_TO_CAPACITY[rooms];

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
    var type = window.vars.typeSelectElement.value;
    var price = window.consts.TYPE_TO_PRICE[type];

    priceInputElement.min = price;
    priceInputElement.placeholder = price;
  };

  var onChangeType = function () {
    setMinPrice();
  };

  var syncTime = function () {
    var currentSelect = window.vars.timeInSelectElement;
    var selectToChange = window.vars.timeOutSelectElement;
    var currentSelectValue = currentSelect.value;
    selectToChange.value = currentSelectValue;
  };

  var onChangeTime = function (e) {
    var currentSelect = e.target;
    var selectToChange = currentSelect === window.vars.timeInSelectElement ? window.vars.timeOutSelectElement : window.vars.timeInSelectElement;

    var currentSelectValue = currentSelect.value;
    selectToChange.value = currentSelectValue;
  };

  window.validate = {
    setCapacity: setCapacity,
    onChangeCapacity: onChangeCapacity,
    setMinPrice: setMinPrice,
    onChangeType: onChangeType,
    syncTime: syncTime,
    onChangeTime: onChangeTime,
  };
})();
