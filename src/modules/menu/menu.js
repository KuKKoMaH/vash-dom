const $menu = $('.menu');
const $menuItems = $('.menu__items > ul > li');
const categoryClass = 'menu--category';
$('.menu__categories button').on('click', ( event ) => {
  const index = $(event.currentTarget).parents('li').index();
  $menu.addClass(categoryClass);
  $menuItems
    .hide()
    .eq(index)
    .show();
});

$('.menu__back').on('click', () => {
  $menu.removeClass(categoryClass);
});
