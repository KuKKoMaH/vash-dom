const $container = $('.catalog__menu');
const $headers = $('.catalog__category');
const $body = $('.catalog__subcategories');
const containerClass = 'catalog__menu';
const activeClass = 'catalog__menu--active';

const setHeight = ( height ) => $body.css('max-height', height);

// $headers.on('click', function ( e ) {
//   $(e.delegateTarget).parents('.' + containerClass).toggleClass(activeClass);
//   // if ($container.hasClass(inactiveClass)) {
//   //   $body.one('transitionend', () => {
//   //     setHeight('');
//   //   });
//   //   setHeight($body[0].scrollHeight);
//   // } else {
//   //   $container.addClass(inactiveClass);
//   //   setHeight($body[0].scrollHeight);
//   //   requestAnimationFrame(() => {
//   //     setHeight(0);
//   //   });
//   // }
// });

$('.catalog__filterButton').on('click', () => {
  $('.filter').toggleClass('filter--active');
});
