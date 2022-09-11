import $ from 'jquery';
import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './../scss/style.scss';

$(document).ready(function ($) {
  $('.navbar-toggler').on('click', function () {
    $('.animated-icon').toggleClass('open');
  });

  $('.meta-menu .menu-item a').hover(function () {
    $(this).parent().prev().toggleClass('hidePipe');
  });

  $.fn.teasersCarousel();

  $('.carousel').carousel({
    interval: false,
  });
});

$.fn.teasersCarousel = function () {
  let items = document.querySelectorAll('.carousel .carousel-item');

  if (items.length != 0) {
    $('html, body').css('overflow-x', 'hidden');
  }
  items.forEach((el) => {
    const minPerSlide = 5;
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        // wrap carousel by using first child
        next = items[0];
      }
      let cloneChild = next.cloneNode(true);
      el.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });
};
