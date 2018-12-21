'use strict';
(function () {
  var avatarInputElement = document.querySelector('.ad-form__field input[type=file]');
  var avatarElement = document.querySelector('.ad-form-header__preview img');
  var photoInputElement = document.querySelector('.ad-form__upload input[type=file]');
  var photoElement = document.querySelector('.ad-form__photo');

  var subscribeToFileInputChangeEvent = function (input, preview, multiple) {
    if (multiple) {
      var uploaded = false;
      var previewTemplate = preview.cloneNode(true);
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
              var parent = preview.parentElement;
              var nextPreview = previewTemplate.cloneNode(true);
              nextPreview.appendChild(photo);
              parent.appendChild(nextPreview);
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

  subscribeToFileInputChangeEvent(avatarInputElement, avatarElement);
  subscribeToFileInputChangeEvent(photoInputElement, photoElement, true);

})();
