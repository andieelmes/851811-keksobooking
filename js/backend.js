'use strict';

(function () {
  var STATUS_OK = 200;
  var URL = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking',
  };

  var addXhrEvents = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
        window.dispatchEvent(new Event('listingLoad'));
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  };

  var makeXhr = function (type, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    addXhrEvents(xhr, onLoad, onError);
    xhr.open(type, url);

    return xhr;
  };

  var load = function (onLoad, onError) {
    var successHandler = function (data) {
      window.vars.listings = data;
      onLoad();
    };

    var xhr = makeXhr('GET', URL.LOAD, successHandler, onError);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = makeXhr('POST', URL.SAVE, onLoad, onError);
    xhr.send(data);
  };

  var onDefaultError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: load,
    save: save,
    onDefaultError: onDefaultError,
  };
})();
