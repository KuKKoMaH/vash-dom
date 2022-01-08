$('.productBuy__blockTitle').on('click', ( e ) => {
  const $el = $(e.delegateTarget);
  const $block = $el.parents('.productBuy__block');
  const $content = $block.find('.productBuy__blockBody');
  $content.css('max-height', $content[0].scrollHeight);
  if ($block.hasClass('productBuy__block--active')) {
    requestAnimationFrame(() => {
      $content.css('max-height', '');
    });
  } else {
    $content.one('transitionend', () => {
      $content.css('max-height', '');
    });
  }
  $block.toggleClass('productBuy__block--active');
});


$('.productBuy__toggle').on('click', () => {
  $('.productBuy').toggleClass('productBuy--active')
})
