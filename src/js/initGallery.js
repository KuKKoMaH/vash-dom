import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css'

const lightbox = new PhotoSwipeLightbox({
  gallery:               '.gallery',
  children:              '.gallery__item',
  showHideAnimationType: 'zoom',
  pswpModule:            () => import('photoswipe')
});
lightbox.init();

lightbox.on('uiRegister', function (e) {
  lightbox.pswp.ui.registerElement({
    name:      'bulletsIndicator',
    className: 'pswp__bullets-indicator',
    appendTo:  'wrapper',
    onInit:    (el, pswp) => {
      const $el = $(el);
      let html = '';
      let prevIndex = -1;

      for (let i = 0; i < pswp.getNumItems(); i++) {
        const thumbnail = pswp.getItemData(i).element.dataset.thumbnail;
        if (!thumbnail) continue;
        html += `<div class="pswp__bullet"><img src="${thumbnail}"/></div>`;
      }
      if (!html) return;
      $el.append(html);
      $el.find('.pswp__bullet').on('click', (e) => {
        const $bullet = $(e.currentTarget);
        pswp.goTo($bullet.index());
      })

      pswp.on('change', (a,) => {
        if (prevIndex >= 0) {
          $el.find('.pswp__bullet--active').removeClass('pswp__bullet--active');
        }
        $el.find('.pswp__bullet').eq(pswp.currIndex).addClass('pswp__bullet--active')
        prevIndex = pswp.currIndex;
      });
    }
  });
});
lightbox.init();