import initSlider from "src/js/initSlider";

require.context('./img/', true, /\.sprite.svg$/);

initSlider('.manufacture__gallery', ( $el ) => ({
  wrapperClass: 'manufacture__imgs',
  slideClass:   'manufacture__img',
  // navigation:   {
  //   prevEl: $el.parents('.history').find('.history__button--prev')[0],
  //   nextEl: $el.parents('.history').find('.history__button--next')[0],
  // },
  // pagination:      {
  //   el:        $el.parents('.spare').find('.pagination')[0],
  //   clickable: true,
  // },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  0,
  loop:          true,
}));
