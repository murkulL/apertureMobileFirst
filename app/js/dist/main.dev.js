"use strict";

document.addEventListener('DOMContentLoaded', function (event) {
  setTimeout(function () {
    document.querySelector('.loading').classList.remove('loading');
    document.querySelector('.lds-ellipsis').classList.remove('lds-ellipsis');
  });
});
window.addEventListener('load', function () {
  burgerButton();
  activeButton();
  buttonWhatWeDo();
  loading();
});
var button = document.querySelector('.footer__subscribe-button');
var input = document.querySelector('.footer__subscribe-input');
var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

function activeButton() {
  button.addEventListener('mouseenter', function () {
    button.classList.add('footer__subscribe-button--active');
    input.classList.add('footer__subscribe-input--active');
    input.disabled = false;
  });
  button.addEventListener('click', function (event) {
    var value = input.value.trim();

    if (pattern.test(value)) {
      button.classList.remove('footer__subscribe-button--active');
      input.classList.remove('footer__subscribe-input--active');
      input.disabled = true;
      input.form.reset();
      event.preventDefault();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully',
        showConfirmButton: false,
        timer: 1500,
        scrollbarPadding: false
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        showConfirmButton: false,
        timer: 1000,
        scrollbarPadding: false,
        allowOutsideClick: false
      });
      input.form.reset();
    }
  });
}

function burgerButton() {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.header__menu-list');
  var link = document.querySelectorAll('.header__munu-link');
  burger.addEventListener('click', function () {
    menu.classList.toggle('header__menu-list--active');
    burger.classList.toggle('burger--active');
  });
  link.forEach(function (item) {
    item.addEventListener('click', function () {
      if (menu) {
        menu.classList.remove('header__menu-list--active');
        burger.classList.remove('burger--active');
      }
    });
  });
}

function buttonWhatWeDo() {
  var buttons = document.querySelectorAll('.whatwedo__link');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.number;

      switch (value) {
        case '1':
          Swal.fire({
            title: 'Product Photography',
            html: 'Cras commodo consequat orci, in convallis risus egestas non. Nulla efficitur auctor hendrerit. Etiam ut orci varius, faucibus libero ac, cursus quam.<br><br><a href="https://example.com" target="_blank" class="whatwedo__link-modal">Link</a>',
            imageUrl: '../app/images/whatwedo-img1.jpg',
            imageWidth: 300,
            imageHeight: 300,
            background: 'black',
            color: 'white',
            confirmButtonColor: 'gray',
            scrollbarPadding: false,
            allowOutsideClick: false
          });
          break;

        case '2':
          Swal.fire({
            title: 'Architecture Photography',
            html: 'Aenean porta neque eget consequat fringilla. Vestibulum ultrices, orci nec egestas pharetra, ligula est semper enim, nec auctor sapien leo nec purus. Fusce tincidunt aliquet sapien, sit amet rhoncus leo imperdiet nec.<br><br><a href="https://example.com" target="_blank" class="whatwedo__link-modal">Link</a>',
            imageUrl: '../app/images/whatwedo-img2.jpg',
            imageWidth: 300,
            imageHeight: 300,
            background: 'black',
            color: 'white',
            confirmButtonColor: 'gray',
            scrollbarPadding: false,
            allowOutsideClick: false
          });
          break;

        case '3':
          Swal.fire({
            title: 'Drone Photography',
            html: 'Mauris euismod elit et nisi ultrices, ut faucibus orci tincidunt. Duis tristique sed lorem a vestibulum. Cras commodo consequat orci, in convallis risus egestas non. Nulla efficitur auctor hendrerit. Etiam ut orci varius, faucibus libero ac, cursus quam.<br><br><a href="https://example.com" target="_blank" class="whatwedo__link-modal">Link</a>',
            imageUrl: '../app/images/whatwedo-img3.jpg',
            imageWidth: 300,
            imageHeight: 300,
            background: 'black',
            color: 'white',
            confirmButtonColor: 'gray',
            scrollbarPadding: false,
            allowOutsideClick: false
          });
          break;

        case '4':
          Swal.fire({
            title: 'WILDLIFE PHOTOGRAPHY',
            html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula. Vestibulum sit amet urna turpis.<br><br><a href="https://example.com" target="_blank" class="whatwedo__link-modal">Link</a>',
            imageUrl: '../app/images/whatwedo-img4.jpg',
            imageWidth: 300,
            imageHeight: 300,
            background: 'black',
            color: 'white',
            confirmButtonColor: 'gray',
            scrollbarPadding: false,
            allowOutsideClick: false
          });
          break;

        default:
          break;
      }
    });
  });
}

var anchors = document.querySelectorAll('a[href*="#"]');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var anchor = _step.value;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var blockID = anchor.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  for (var _iterator = anchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}