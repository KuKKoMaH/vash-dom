const $aside = $('.checkout__aside');
const $info = $('.checkout__info');
const $items = $('.checkout__items');
const activeClass = 'checkout__aside--active';

$('.checkout__showInfo').on('click', () => {
  $info.css('max-height', $info[0].scrollHeight);
  $items.css('max-height', $items[0].scrollHeight);
  if ($aside.hasClass(activeClass)) {
    requestAnimationFrame(() => {
      $info.css('max-height', '');
      $items.css('max-height', '');
    });
  } else {
    $info.one('transitionend', () => $info.css('max-height', ''));
    $items.one('transitionend', () => $items.css('max-height', ''));
  }
  $aside.toggleClass(activeClass);
});
