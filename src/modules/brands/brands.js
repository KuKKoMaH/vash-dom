import { BREAKPOINT_LG } from "src/js/breakpoints";
import initSlider        from "src/js/initSlider";

const $thumbs = $('.brands__logo');
const thumbActiveClass = 'brands__logo--active';

const thumbs = initSlider('.brands__slider--logos', ( $el ) => ({
  wrapperClass:        'brands__slides',
  slideClass:          'brands__logo',
  slidesPerView:       2,
  spaceBetween:        0,
  watchSlidesProgress: true,
  breakpoints:         {
    [BREAKPOINT_LG]: {
      slidesPerView: 5,
    },
  },
}));

const slider = initSlider('.brands__slider--texts', ( $el ) => ({
  wrapperClass:  'brands__slides',
  slideClass:    'brands__text',
  slidesPerView: 1,
  spaceBetween:  0,
  simulateTouch: false,
  autoHeight:    true,
  on:            {
    slideChange( swiper ) {
      const { activeIndex } = swiper;
      $thumbs
        .removeClass(thumbActiveClass)
        .eq(activeIndex)
        .addClass(thumbActiveClass);

      const thumbsInstance = thumbs.getInstance();
      thumbsInstance.slideTo(activeIndex);
    },
  },
}));

$('.brands__nav--prev').on('click', () => {
  const sliderInstance = slider.getInstance();
  sliderInstance.slidePrev();
});
$('.brands__nav--next').on('click', () => {
  const sliderInstance = slider.getInstance();
  sliderInstance.slideNext();
});

$thumbs.on('click', ( e ) => {
  const $el = $(e.delegateTarget);
  const index = $el.index();
  const sliderInstance = slider.getInstance();
  sliderInstance.slideTo(index);
});

