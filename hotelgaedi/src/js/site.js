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
});
