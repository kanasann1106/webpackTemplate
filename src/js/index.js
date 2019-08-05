import '../scss/style.scss';

var $ = require('jquery');

function opening() {
  setTimeout(function() {
    $('.js-opening').fadeOut();
    $('.js-contents').fadeIn();
  }, 10000);
}

$(window).on('load', () => {
  opening();
});
