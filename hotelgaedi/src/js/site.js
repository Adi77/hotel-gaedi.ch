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
  $('.dropdownToggleMobile').click(function () {
    $('.dropdownToggleMobile').not(this).removeClass('show');
    $('.dropdownToggleMobile').not(this).prev().removeClass('show');
    $('.dropdownToggleMobile').not(this).next().removeClass('show');

    $('.dropdownToggleMobile')
      .not(this)
      .prev()
      .attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true';
      });

    $(this).toggleClass('show');
    $(this).prev().toggleClass('show');
    $(this)
      .prev()
      .attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true';
      });
    $(this).next().toggleClass('show');
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

    let navigation = document.createElement('div');

    navigation.innerHTML =
      `
      <a class="carousel-control-prev bg-transparent w-aut" href="#` +
      carousel.id +
      `" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a class="carousel-control-next bg-transparent w-aut" href="#` +
      carousel.id +
      `" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
      `;

    document.getElementById(carousel.id).appendChild(navigation);

    let style = document.createElement('style');
    style.innerHTML =
      `
 
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
      .` +
      carousel.id +
      ` .carousel-item .wp-block-group { width: ` +
      translateX +
      `%}
    
    html,
    body {
    overflow-x: hidden;
    } `;

    document.body.appendChild(style);

    items.forEach((el) => {
      let next = el.nextElementSibling;
      items[0].classList.add('active');
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
