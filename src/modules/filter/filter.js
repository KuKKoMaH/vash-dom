import IMask from "imask";

const $priceSlider = $('.filter__priceSlider');
if ($priceSlider.length) {
  const priceSlider = $priceSlider[0].noUiSlider;

  priceSlider.on('change', ( values ) => {
    $from.val(+values[0] + '');
    $to.val(+values[1] + '');
    maskFrom.updateValue();
    maskTo.updateValue();
  });

  const $from = $('.filter__priceInput--from');
  const $to = $('.filter__priceInput--to');

  const maskFrom = IMask($from[0], { mask: Number });
  const maskTo = IMask($to[0], { mask: Number });

  // $sInput.on('input', ( e ) => {
  //   const value = +e.target.value.replace(/[^0-9]/g, '');
  //   if (!value) return;
  //   sSlider.value = e.target.value;
  //   sSlider.dispatchEvent(new Event('change'));
  // });
}

const activeClass = 'filter__checkboxes--active';
$('.filter__button').on('click', ( e ) => {
  const $el = $(e.delegateTarget);
  const $container = $el.parents('.filter__checkboxes');
  $container.toggleClass(activeClass);
});

$('.filter__title').on('click', function ( e ) {
  $(e.delegateTarget).parents('.filter__item').toggleClass('filter__item--collapsed');
});

$('.filter__close').on('click', () => {
  $('.filter').removeClass('filter--active');
});
