import $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

import './../scss/style.scss';
import { TempusDominus } from '@eonasdan/tempus-dominus';

$(document).ready(function ($) {
  $('.navbar-toggler').on('click', function () {
    $('.animated-icon').toggleClass('open');
  });

  $('.meta-menu .menu-item:not(.current-menu-item) a').hover(function () {
    $(this).parent().prev().toggleClass('hidePipe');
  });

  $('.meta-menu .menu-item.current-menu-item a')
    .parent()
    .prev()
    .toggleClass('hidePipe');

  $.fn.teasersCarousel();

  $.fn.postTypeCategoriesNavigation();

  /*
   * Show Navigation on Scroll up
   */
  $.fn.showNavOnScrollUp();

  /*
   * Menu Dropdown toggle on mobile
   */
  $.fn.mobileDropdownToggle();

  /*
   * datepicker
   */
  $.fn.datePicker();

  /*
   * Modal Teaser show on pageload
   *
   */
  $.fn.teaserModalBox();
});

$.fn.teaserModalBox = function () {
  let myModal = new Modal(document.getElementById('teasermodalbox'));
  //myModal.show();

  let is_modal_show = sessionStorage.getItem('alreadyShow');
  if (is_modal_show != 'alredy shown') {
    myModal.show();
    sessionStorage.setItem('alreadyShow', 'alredy shown');
  }
};

$.fn.mobileDropdownToggle = function () {
  if (
    $('.dropdown .dropdown-menu .menu-item').hasClass('current-menu-item') &&
    $('.navbar-toggler').css('display') != 'none'
  ) {
    let activeDropdownMenuItem = $(
      '.dropdown .dropdown-menu .menu-item.current-menu-item'
    );
    $(activeDropdownMenuItem).parent().addClass('show').prev().addClass('show');
  }

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
};

$.fn.datePicker = function () {
  if ($('.datepicker').length > 0) {
    var date = new Date();
    new TempusDominus(document.getElementById('datepicker-anreise'), {
      //put your config here
      restrictions: {
        minDate: date,
      },
      display: {
        components: {
          clock: false,
        },
      },
    });
    new TempusDominus(document.getElementById('datepicker-abreise'), {
      //put your config here
      restrictions: {
        minDate: date,
      },
      display: {
        components: {
          clock: false,
        },
      },
    });
  }
};

$.fn.teasersCarousel = function () {
  const pathname = $(location).attr('pathname');

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

    /*
     * Arrow Navigation
     */

    let arrowNav = document.createElement('div');
    arrowNav.classList.add('carousel-nav');

    arrowNav.innerHTML =
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

    document
      .getElementById(carousel.id)
      .closest('.wp-block-group')
      .prepend(arrowNav);

    /*
     * Dots Navigation
     */

    let itemsLength = items.length,
      dotsNavButtons = '<div class="carousel-indicators">';

    for (var i = 0; i < itemsLength; i++) {
      if (i === 0) {
        dotsNavButtons +=
          `<button type="button" data-bs-target="#` +
          carousel.id +
          `" data-bs-slide-to="0" aria-label="Slide 1" aria-current="true" class="active"></button>`;
      } else {
        dotsNavButtons +=
          `<button type="button" data-bs-target="#` +
          carousel.id +
          `" data-bs-slide-to="` +
          i +
          `" aria-label="Slide ` +
          (i + 1) +
          `" ></button>`;
      }
    }

    dotsNavButtons += '</div>';

    let dotsNav = document.createElement('div');
    dotsNav.classList.add('carousel-dotsNav');
    dotsNav.innerHTML = dotsNavButtons;

    document.getElementById(carousel.id).appendChild(dotsNav);

    /*
     * CSS
     */

    let style = document.createElement('style');
    style.innerHTML =
      `.` +
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
  $('.wp-block-categories .cat-item:first-child a').addClass('active');
  $('.wp-block-categories .cat-item a').click(function (e) {
    e.preventDefault();

    let category = $(this).attr('data-roomfilter');

    $('.wp-block-categories .cat-item a').removeClass('active');
    $(this).addClass('active');
    if (category === 'alle') {
      $(this).parents(2).next().find('li.wp-block-post').show();
    } else {
      $(this)
        .parents(2)
        .next()
        .find('li.wp-block-post:not([class*="category-' + category + '"])')
        .hide();

      $(this)
        .parents(2)
        .next()
        .find('[class*="category-' + category + '"]')
        .show();
    }
  });
};

$.fn.showNavOnScrollUp = function () {
  var lastScrollTop; // This Varibale will store the top position
  var navbar = document.getElementById('gaedi-header'); // Get The NavBar
  var body = document.getElementsByTagName('body')[0];
  var navbarCollapse = document.getElementById('navbarCollapse');
  var toTopLink = document.getElementById('toTopLink');

  var scrollTopOnLoad =
    window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener('scroll', function () {
    //on every scroll this funtion will be called
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < 300) {
      body.classList.remove('fixedNav');
    } else {
      body.classList.add('fixedNav');
    }
    if (scrollTop > 600) {
      toTopLink.classList.add('show');
    } else {
      toTopLink.classList.remove('show');
    }
    //This line will get the location on scroll
    if (scrollTop > lastScrollTop && scrollTop > 300) {
      //if it will be greater than the previous
      if (navbarCollapse.classList.contains('show') === false) {
        navbar.style.top = '-100px';
      }

      //set the value to the negative of height of navbar
    } else {
      if (scrollTop < 600) {
        if (navbarCollapse.classList.contains('show') === false) {
          navbar.style.top = '-100px';
        }
      } else {
        navbar.style.top = '0';
      }
    }
    lastScrollTop = scrollTop; //New Position Stored
  });
};
