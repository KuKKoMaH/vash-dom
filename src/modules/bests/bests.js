const $headers = $('.bests__head');
const $bodies = $('.bests__body');
const headerActiveClass = 'bests__head--active';
const bodyActiveClass = 'bests__body--active';

$headers.on('click', ( e ) => {
  const $el = $(e.delegateTarget);
  const index = $el.index();
  $headers.removeClass(headerActiveClass);
  $bodies.removeClass(bodyActiveClass);
  $el.addClass(headerActiveClass);
  $bodies.eq(index).addClass(bodyActiveClass);
});
