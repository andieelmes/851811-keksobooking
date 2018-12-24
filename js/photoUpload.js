'use strict';
(function () {
  var avatarInputElement = document.querySelector('.ad-form__field input[type=file]');
  var photoInputElement = document.querySelector('.ad-form__upload input[type=file]');

  var addInputStyling = function (input) {
    var parentElement = input.parentElement;
    parentElement.style.position = 'relative';
    input.classList.remove('visually-hidden');
    Object.assign(input.style, {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
    });
  };

  addInputStyling(avatarInputElement);
  addInputStyling(photoInputElement);

  window.consts.DEFAULT_AVATAR_SRC = window.vars.avatarElement.src;

  var subscribeToFileInputChangeEvent = function (input, preview, multiple) {
    if (multiple) {
      var uploaded = false;
    }

    var onFileInputChange = function () {
      Array.prototype.forEach.call(input.files, function (file) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (multiple) {
            var photo = document.createElement('img');
            photo.src = reader.result;
            photo.style.maxWidth = '100%';
            photo.style.display = 'block';

            if (uploaded) {
              var parentElement = preview.parentElement;
              var nextPreviewElement = window.vars.photoElementTemplate.cloneNode(true);
              nextPreviewElement.appendChild(photo);
              parentElement.appendChild(nextPreviewElement);
            } else {
              preview.appendChild(photo);
              uploaded = true;
            }
          } else {
            preview.src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      });
    };

    input.addEventListener('change', onFileInputChange);
  };

  subscribeToFileInputChangeEvent(avatarInputElement, window.vars.avatarElement);
  subscribeToFileInputChangeEvent(photoInputElement, window.vars.photoElement, true);

  var onDefaultDragEvent = function (e) {
    if (e.target.getAttribute('type') !== 'file') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  window.addEventListener('dragover', onDefaultDragEvent);
  window.addEventListener('drop', onDefaultDragEvent);

})();
