import initSlider from "src/js/initSlider";
import initTabs from "src/js/initTabs";

const thumbActiveClass = 'product__thumb--active';

const slider = initSlider('.product__slider', ($el) => {
  const $gallery = $el.parents('.product__gallery');
  const $thumbs = $gallery.find('.product__thumb');
  return ({
    wrapperClass:  'product__slides',
    slideClass:    'product__slide',
    slidesPerView: 1,
    spaceBetween:  0,
    on:            {
      slideChange(swiper) {
        const { activeIndex } = swiper;
        $thumbs
          .removeClass(thumbActiveClass)
          .eq(activeIndex)
          .addClass(thumbActiveClass);
      },
    },
  })
});

$('.product__thumb').on('click', (e) => {
  const $el = $(e.delegateTarget);
  const $gallery = $el.parents('.product__gallery');
  const index = $el.index();
  const sliderInstance = $gallery.find('.product__slider')[0].swiper;
  sliderInstance.slideTo(index);
});


const $info = $('.product__info');
const $infoRest = $('.product__infoRest');
const infoActiveClass = 'product__info--active';
let collapsed = false;
const updateHeight = () => {

};
updateHeight();
// $(window).on('resize', updateHeight);

$('.product__infoButton').on('click', () => {
  $infoRest.css('max-height', $infoRest[0].scrollHeight);
  if (collapsed) {
    requestAnimationFrame(() => {
      $infoRest.css('max-height', '');
    });
  } else {
    $infoRest.one('transitionend', () => {
      $infoRest.css('max-height', '');
    });
  }
  $info.toggleClass(infoActiveClass);
  collapsed = !collapsed;
});

$('.product__toggle').on('click', (e) => {
  const $el = $(e.delegateTarget);
  const $block = $el.parents('.product__block');
  $block.toggleClass('product__block--active');
});

initTabs({
  $headers:          $('.product__header'),
  $bodies:           $('.product__body'),
  headerActiveClass: 'product__header--active',
  bodyActiveClass:   'product__body--active',
});

// $('.product__blockCollapse, .product__blockTitle').on('click', ( e ) => {
//   const $el = $(e.delegateTarget);
//   const $block = $el.parents('.product__block');
//   const $content = $block.find('.product__blockContent');
//   $content.css('max-height', $content[0].scrollHeight);
//   if ($block.hasClass('product__block--active')) {
//     requestAnimationFrame(() => {
//       $content.css('max-height', '');
//     });
//   } else {
//     $content.one('transitionend', () => {
//       $content.css('max-height', '');
//     });
//   }
//   $block.toggleClass('product__block--active');
// });
