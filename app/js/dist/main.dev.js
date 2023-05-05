"use strict";

window.addEventListener('load', function () {
  burgerButton();
  activeButton();
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
        timer: 1500
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        showConfirmButton: false,
        timer: 1000
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