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

  $.fn.postTypeCategoriesNavigation();

  $('a.nav-link.dropdown-toggle').click(function () {
    location.href = this.href;
  });
});

$.fn.teasersCarousel = function () {
  const carousels = document.querySelectorAll('.carousel');
  for (const carousel of carousels.values()) {
    let items = document.querySelectorAll(
      '#' + carousel.id + ' .carousel-item'
    );

    let minPerSlide = document.querySelector('#' + carousel.id).dataset
      .perslideitems;

    let translateX = 100 / minPerSlide;

    document
      .querySelector('#' + carousel.id + ' .carousel-inner')
      .classList.add(carousel.id);

    let style = document.createElement('style');
    style.innerHTML =
      `
    @media screen and (min-width: 576px) {
      .` +
      carousel.id +
      ` .carousel-item-end.active { transform: translateX(` +
      translateX +
      `%);}
      .` +
      carousel.id +
      ` .carousel-item-next { transform: translateX(` +
      translateX +
      `%);}
      .` +
      carousel.id +
      ` .carousel-item-start.active { transform: translateX(-` +
      translateX +
      `%);}
      .` +
      carousel.id +
      ` .carousel-item-prev { transform: translateX(-` +
      translateX +
      `%);}
    }
      `;
    document.body.appendChild(style);

    items.forEach((el) => {
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
  }
};

$.fn.postTypeCategoriesNavigation = function () {
  $('.wp-block-categories .cat-item a').click(function (e) {
    e.preventDefault();
    let category = $(this).text().toLowerCase();
    $('.wp-block-categories .cat-item a').removeClass('active');
    $(this).addClass('active');

    $(this)
      .parents(2)
      .next()
      .find('li.wp-block-post:not(.category-' + category + ')')
      .hide();

    $(this)
      .parents(2)
      .next()
      .find('li.wp-block-post.category-' + category)
      .show();
  });
};
