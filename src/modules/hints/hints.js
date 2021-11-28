import initSlider from "src/js/initSlider";

initSlider('.hints__slider', ( $el ) => ({
  wrapperClass: 'hints__slides',
  slideClass:   'hints__slide',
  navigation:   {
    prevEl: $el.parents('.hints').find('.hints__nav--prev')[0],
    nextEl: $el.parents('.hints').find('.hints__nav--next')[0],
  },
  // pagination:      {
  //   el:        $el.parents('.spare').find('.pagination')[0],
  //   clickable: true,
  // },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
  autoHeight:    true,
}));
