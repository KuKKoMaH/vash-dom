const $body = $('body');
const $header = $('.header');
const searchClass = 'header--search';
const catalogClass = 'header--catalog';
const menuClass = 'header--menu';
const cartClass = 'header--cart';

const onClickOutside = ( event ) => {
  const $target = $(event.target);
  if (!$target.closest($header).length) {
    event.preventDefault();
    event.stopPropagation();
    closeSearch();
    closeCatalog();
    closeMenu();
    closeCart();
  }
};

let isSearchOpen = false;
const openSearch = () => {
  isSearchOpen = true;
  $header.addClass(searchClass);
  closeMenu();
  closeCatalog();
  closeCart();
  $body.on('click', onClickOutside);
  setTimeout(() => $('.header__search input').focus(), 100);
};
const closeSearch = () => {
  isSearchOpen = false;
  $header.removeClass(searchClass);
  $body.off('click', onClickOutside);
};

let isCatalogOpen = false;
const openCatalog = () => {
  isCatalogOpen = true;
  $header.addClass(catalogClass);
  closeSearch();
  closeMenu();
  closeCart();
  $body.on('click', onClickOutside);
};
const closeCatalog = () => {
  isCatalogOpen = false;
  $header.removeClass(catalogClass);
  $body.off('click', onClickOutside);
};

let isMenuOpen = false;
const openMenu = () => {
  isMenuOpen = true;
  $header.addClass(menuClass);
  closeSearch();
  closeCatalog();
  closeCart();
  $body.on('click', onClickOutside);
};
const closeMenu = () => {
  isMenuOpen = false;
  $header.removeClass(menuClass);
  $body.off('click', onClickOutside);
};

$('.header__searchButton').on('click', () => {
  isSearchOpen
    ? closeSearch()
    : openSearch();
});

$('.header__catalogButton').on('click', () => {
  isCatalogOpen
    ? closeCatalog()
    : openCatalog();
});

$('.header__menuButton').on('click', () => {
  isMenuOpen
    ? closeMenu()
    : openMenu();
});

$('.search__close').on('click', closeSearch);

let isCartOpen = false;
const openCart = () => {
  isCartOpen = true;
  $header.addClass(cartClass);
  closeSearch();
  closeMenu();
  closeCatalog();
  $body.on('click', onClickOutside);
};
const closeCart = () => {
  isCartOpen = false;
  $header.removeClass(cartClass);
  $body.off('click', onClickOutside);
};
$('.header__cart--top').on('click', ( e ) => {
  e.preventDefault();
  isCartOpen
    ? closeCart()
    : openCart();
});
