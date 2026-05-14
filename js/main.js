(function ($) {
  "use strict";

  /* ------------------------------------------------
     Preloader
  ------------------------------------------------ */
  $(window).on('load', function () {
    setTimeout(function () {
      $('#preloader').fadeOut(500, function () { $(this).remove(); });
    }, 350);
  });

  /* ------------------------------------------------
     Navbar: scroll class + active link
  ------------------------------------------------ */
  function updateNav() {
    if ($(window).scrollTop() > 60) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }

    if ($(window).scrollTop() > 280) {
      $('#backToTop').addClass('show');
    } else {
      $('#backToTop').removeClass('show');
    }
  }

  $(window).on('scroll', updateNav);
  updateNav();

  /* ------------------------------------------------
     Back to top
  ------------------------------------------------ */
  $('#backToTop').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 700, 'easeInOutExpo');
  });

  /* ------------------------------------------------
     Smooth scroll for all .js-scroll anchor links
  ------------------------------------------------ */
  $('a.js-scroll[href*="#"]:not([href="#"])').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          { scrollTop: target.offset().top - 75 },
          820,
          'easeInOutExpo'
        );
        return false;
      }
    }
  });

  /* Close mobile menu on nav click */
  $('.js-scroll').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  /* ------------------------------------------------
     Typed.js — hero subtitle
  ------------------------------------------------ */
  if ($('.text-slider').length === 1) {
    var typedStrings = $('.text-slider-items').text();
    new Typed('.text-slider', {
      strings:       typedStrings.split(','),
      typeSpeed:     68,
      backDelay:     1500,
      backSpeed:     32,
      loop:          true,
      smartBackspace: true
    });
  }

  /* ------------------------------------------------
     Scroll-reveal: IntersectionObserver for .aos-fade
  ------------------------------------------------ */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.aos-fade').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ------------------------------------------------
     Active nav link highlighting on scroll
  ------------------------------------------------ */
  $(window).on('scroll.spy', function () {
    var scrollPos = $(window).scrollTop() + 90;
    $('section[id], footer[id]').each(function () {
      var id        = $(this).attr('id');
      var offsetTop = $(this).offset().top;
      var height    = $(this).outerHeight();
      if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });

})(jQuery);
