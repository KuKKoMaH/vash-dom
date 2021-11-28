import 'jquery';
// import 'selectize';
import 'jquery.maskedinput/src/jquery.maskedinput';
import noUiSlider from 'nouislider';

import './breakpoints';
// import './initMap';
import './initPopups';
// import initGallery from "src/js/initGallery";

// const initGalleries = () => {
//   $('.gallery').each(( i, el ) => {
//     initGallery({ $items: $(el).find('.gallery__item') });
//   });
// };
// initGalleries();
// window.INIT_GALLERIES = initGalleries;

// const $share = $('.share');
// if ($share.length) {
//   scriptLoader('https://yastatic.net/share2/share.js', () => {
//     Ya.share2('share', {
//       theme: {
//         bare: true,
//       },
//     });
//   });
// }

$('input[type="tel"]').mask("+7 (999) 999-99-99");

// $('.select').selectize();

$('.toTop').on('click', () => {
  $("html, body").animate({ scrollTop: 0 }, "slow");

});

$('.slider').each(( i, el ) => {
  const { value, min, max } = el;

  const $el = $(el);
  $el.hide();
  const $slider = $('<div class="slider"/>');
  $el.after($slider);
  const slider = $slider[0];

  noUiSlider.create(slider, {
    connect: [true, false],
    // tooltips: true,
    start: +value,
    range: {
      'min': +min,
      'max': +max,
    },
    step:  1,
    // pips:     {
    //   mode:    'values',
    //   values:  [+min, +max],
    //   format:  {
    //     from: ( value ) => value + ' м',
    //     to:   ( value ) => value + ' м',
    //     // from: ( value ) => value + ' м<sup>2</sup>',
    //     // to:   ( value ) => value + ' м<sup>2</sup>',
    //   },
    //   density: 100,
    // },
    // pips:     {
    //   mode:   'count',
    //   values: 2,
    // },
  });
  $el.on('change', ( e ) => {
    requestAnimationFrame(() => {
      const value = +slider.noUiSlider.get() + '';
      const newValue = e.target.value;
      if (value === newValue) return;
      slider.noUiSlider.set(newValue);
    });
  });
  slider.noUiSlider.on('update', function ( values, handle ) {
    const value = +values[0] + '';
    if (el.value === value) return;
    el.value = value;
    el.dispatchEvent(new Event('change'));
  });
});
