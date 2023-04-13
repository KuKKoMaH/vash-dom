import IMask from "imask";

window.initPriceFilter = () => {
  const $priceSlider = $('.filter__priceSlider');
  if ($priceSlider.length) {
    const priceSlider = $priceSlider[0];
    if (priceSlider.dataset.inited) return;
    const slider = priceSlider.noUiSlider;

    slider.on('change', (values) => {
      $from.val(+values[0] + '');
      $to.val(+values[1] + '');
      $from.trigger('change');
      maskFrom.updateValue();
      maskTo.updateValue();
    });

    const $from = $('.filter__priceInput--from');
    const $to = $('.filter__priceInput--to');

    const maskFrom = IMask($from[0], { mask: Number });
    const maskTo = IMask($to[0], { mask: Number });
    priceSlider.dataset.inited = '1';

    // $sInput.on('input', ( e ) => {
    //   const value = +e.target.value.replace(/[^0-9]/g, '');
    //   if (!value) return;
    //   sSlider.value = e.target.value;
    //   sSlider.dispatchEvent(new Event('change'));
    // });
  }
}
initPriceFilter();

const activeClass = 'filter__checkboxes--active';
window.toggleFilter = (e) => {
  const $el = $(e.currentTarget);
  const $container = $el.parents('.filter__checkboxes');
  $container.toggleClass(activeClass);
}

window.collapseFilter = (e) => {
  $(e.currentTarget).parents('.filter__item').toggleClass('filter__item--collapsed');
}

window.closeFilter = () => $('.filter').removeClass('filter--active');