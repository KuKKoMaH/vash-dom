const $body = $('body');
const $header = $('.header');
const searchClass = 'header--search';
const catalogClass = 'header--catalog';
const menuClass = 'header--menu';

const onClickOutside = ( event ) => {
  const $target = $(event.target);
  if (!$target.closest($header).length) {
    event.preventDefault();
    event.stopPropagation();
    closeSearch();
    closeCatalog();
    closeMenu();
  }
};

let isSearchOpen = false;
const openSearch = () => {
  isSearchOpen = true;
  $header.addClass(searchClass);
  closeMenu();
  closeCatalog();
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
