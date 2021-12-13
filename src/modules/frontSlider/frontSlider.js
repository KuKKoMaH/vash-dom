import initSlider from "src/js/initSlider";

require.context('./img/', true, /\.sprite.svg$/);

initSlider('.frontSlider__slider', ( $el ) => ({
  wrapperClass: 'frontSlider__slides',
  slideClass:   'frontSlider__slide',
  navigation:   {
    prevEl: $el.parents('.frontSlider').find('.frontSlider__nav--prev')[0],
    nextEl: $el.parents('.frontSlider').find('.frontSlider__nav--next')[0],
  },
  // pagination:      {
  //   el:        $el.parents('.spare').find('.pagination')[0],
  //   clickable: true,
  // },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
}));
