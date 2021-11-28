import Breakpoints       from "breakpoints-js";
import { BREAKPOINT_LG } from "src/js/breakpoints";
import initSlider        from "src/js/initSlider";

const interpolate = ( x, x1, x2, y1, y2 ) => y1 + ((x - x1) / (x2 - x1) * (y2 - y1));

let isSm = false;
Breakpoints.on('sm', 'enter', () => {
  isSm = true;
});
Breakpoints.on('lg', 'enter', () => {
  isSm = false;
});

initSlider('.testimonials__slider', ( $el ) => ({
  wrapperClass:        'testimonials__slides',
  slideClass:          'testimonials__slide',
  navigation:          {
    prevEl: $el.parents('.testimonials').find('.testimonials__nav--prev')[0],
    nextEl: $el.parents('.testimonials').find('.testimonials__nav--next')[0],
  },
  slidesPerView:       1,
  spaceBetween:        0,
  centeredSlides:      true,
  loop:                true,
  watchSlidesProgress: true,
  breakpoints:         {
    [BREAKPOINT_LG]: {
      slidesPerView: 3,
    },
  },
  on:                  {
    progress:      function ( a, b ) {
      var swiper = this;

      for (var i = 0; i < swiper.slides.length; i++) {
        let blur = 0;
        if (isSm) {
        } else {
          var slideProgress = swiper.slides[i].progress;
          const progress = Math.abs(slideProgress);
          if (progress >= 1) {
            blur = 4;
          } else {
            blur = interpolate(progress, 0, 1, 0, 4);
          }
        }
        swiper.slides[i].style.filter = `blur(${blur}px)`;
      }
    },
    touchStart:    function () {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        // swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function ( speed ) {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        // swiper.slides[i].querySelector('.about__label').style.transition = speed + "ms";
        // swiper.slides[i].querySelector('.about__link').style.transition  = speed + "ms";
      }
    },
  },
}));
