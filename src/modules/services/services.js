import initSlider from "src/js/initSlider";

// initSlider('.services__slider', ( $el ) => ({
//   wrapperClass: 'services__slides',
//   slideClass:   'services__slide',
//   // navigation:   {
//   //   prevEl: $el.parents('.history').find('.history__button--prev')[0],
//   //   nextEl: $el.parents('.history').find('.history__button--next')[0],
//   // },
//   // pagination:      {
//   //   el:        $el.parents('.spare').find('.pagination')[0],
//   //   clickable: true,
//   // },
//   // touchEventsTarget: 'wrapper',
//   slidesPerView: 1,
//   spaceBetween:  0,
//   direction:     'vertical',
//   // autoHeight:    true,
//   on: {
//     slideChange( swiper ) {
//       const { activeIndex, slides } = swiper;
//       console.log(swiper);
//       console.log(swiper.activeIndex);
//       updateHeight(slides[activeIndex]);
//     },
//   },
// }));
//
// const sliderEl = $('.services__slider')[0];
// const updateHeight = ( activeSlideEl ) => sliderEl.style.height = activeSlideEl.clientHeight + 'px';
// updateHeight($('.services__slide')[0]);

const $slider = $('.services__slider');
const $wrapper = $('.services__slides');
const $heads = $('.services__head');
const $slides = $('.services__slide');
const $pointer = $('.services__pointer');
if ($slider.length) {
  const activeHeadClass = 'services__head--active';
  const activeSlideClass = 'services__slide--active';

  let slidesHeight = null;
  let slidesHeightDeprecated = false;
  const getSlidesHeight = () => {
    if (!slidesHeight || slidesHeightDeprecated) {
      slidesHeight = $slides.map(( i, el ) => el.clientHeight);
      slidesHeightDeprecated = false;
    }
    return slidesHeight;
  };

  const updateHeight = ( el ) => {
    $slider.height(el.clientHeight);
  };

  $heads.on('click', ( e ) => {
    const $el = $(e.delegateTarget);
    const index = $el.index();
    const slidesHeight = getSlidesHeight();
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += slidesHeight[i];
    }
    updateHeight($slides[index]);

    $slides
      .removeClass(activeSlideClass)
      .eq(index)
      .addClass(activeSlideClass);
    $wrapper.css('transform', `translateY(-${offset}px)`);

    $heads
      .removeClass(activeHeadClass)
      .eq(index)
      .addClass(activeHeadClass);
    $pointer.css('transform', `translateY(${$el[0].offsetTop}px)`);
  });

  window.addEventListener("load", () => {
    updateHeight($slides[0]);
    $('.services').addClass('services--init');
  });
  window.addEventListener("resize", () => {
    slidesHeightDeprecated = true;
    requestAnimationFrame(() => {
      updateHeight($('.' + activeSlideClass)[0]);
    });
  });
}
