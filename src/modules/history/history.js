import initSlider from "src/js/initSlider";

initSlider('.history__slider', ( $el ) => ({
  wrapperClass: 'history__slides',
  slideClass:   'history__slide',
  navigation:   {
    prevEl: $el.parents('.history').find('.history__button--prev')[0],
    nextEl: $el.parents('.history').find('.history__button--next')[0],
  },
  // pagination:      {
  //   el:        $el.parents('.spare').find('.pagination')[0],
  //   clickable: true,
  // },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
  loop:          true,
}));
