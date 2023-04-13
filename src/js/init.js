import noUiSlider from 'nouislider';
import IMask from 'imask';

// import './initMap';
import './initPopups';
import "src/js/initGallery";


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

$('.select').selectize({
  render: {
    item:   function (data, escape) {
      const field_label = this.settings.labelField;
      let content = escape(data[field_label]);
      if (data.color) content += `&nbsp;<span class="color" style="color: ${data.color}"></span>`;
      return '<div class="item">' + content + '</div>';
    },
    option: function (data, escape) {
      const field_label = this.settings.labelField;
      const field_value = this.settings.valueField;
      let content = escape(data[field_label]);
      if (data.color) content += `<span class="color" style="color: ${data.color}"></span>`;
      return '<div class="option ' + (data[field_value] === '' ? 'selectize-dropdown-emptyoptionlabel' : '') + '">' + content + '</div>';
    },
  },
});

$('.toTop').on('click', () => {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});


window.initSliders = () => {
  $('.slider').each((i, el) => {
    if (el.noUiSlider) return;
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
      $el.on('change', (e) => {
        requestAnimationFrame(() => {
          const value = +slider.noUiSlider.get() + '';
          const newValue = e.target.value;
          if (value === newValue) return;
          slider.noUiSlider.set(newValue);
        });
      });
      slider.noUiSlider.on('update', function (values, handle) {
        const value = +values[0] + '';
        if (el.value === value) return;
        el.value = value;
        el.dispatchEvent(new Event('change'));
      });
    }
  });
}
initSliders();

$('.file').each((i, el) => {
  const $el = $(el);
  const $name = $el.find('.file__name');
  const originalText = $name.text();
  $el.find('input[type="file"]').on('change', function () {
    const files = $(this)[0].files;
    $name.text(files.length ? files[0].name : originalText);
  });
});

const updateCounterValue = (e, change) => {
  const updateValue = (v) => {
    let value = +v;
    if (Number.isNaN(value)) value = 0;
    value += change;
    if (value < 0) value = 0;
    return value;
  };
  e.preventDefault();
  e.stopPropagation();
  const $counter = $(e.target).parents('.counter');
  const $value = $counter.find('.counter__value');
  const valueEl = $value[0];
  if (valueEl.tagName === 'INPUT') {
    valueEl.value = updateValue(valueEl.value);
  } else {
    valueEl.innerText = updateValue(valueEl.innerText);
  }
};
window.updateCounterValue = updateCounterValue;

// $('.counter__button--minus').on('click', (e) => updateCounterValue(e, -1));
// $('.counter__button--plus').on('click', (e) => updateCounterValue(e, 1));
