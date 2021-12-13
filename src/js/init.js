import 'jquery';
import 'selectize';
import noUiSlider from 'nouislider';
import IMask      from 'imask';

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

document.querySelectorAll('input[type="tel"]').forEach(el => {
  IMask(
    el,
    {
      mask: '+{7} (000) 000-00-00',
    },
  );
});


// $('input[type="tel"]').mask("+7 (999) 999-99-99");

$('.select').selectize();

$('.toTop').on('click', () => {
  $("html, body").animate({ scrollTop: 0 }, "slow");

});

$('.slider').each(( i, el ) => {
  const isInput = el.tagName === 'INPUT';
  let { value, min, max } = isInput ? el : el.dataset;
  value = JSON.parse(value);

  const $el = $(el);
  let slider;
  if (isInput) {
    const $slider = $('<div class="slider"/>');
    slider = $slider[0];
    $el.hide();
    $el.after($slider);
  } else {
    slider = el;
  }

  noUiSlider.create(slider, {
    connect: Array.isArray(value) ? true : 'lower',
    start:   value,
    range:   {
      'min': +min,
      'max': +max,
    },
    step:    1,
  });
  if (isInput) {
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
  }
});
