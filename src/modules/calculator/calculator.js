import IMask from 'imask';
import { CountUp } from 'countup.js';
import _debounce from 'lodash/debounce'

require.context('./img/', true, /\.sprite.svg$/);

const config = window.PRICES_CALCULATOR_CONFIG;
if (config) {
  const prices = {};
  for (let key in config.prices) {
    const price = config.prices[key];
    const tempPrices = [];
    for (let amount in price) {
      const a = price[amount];
      tempPrices.push([+amount, a[0], a[1]]);
    }
    prices[key] = tempPrices.sort((a, b) => a[0] === b[0] ? 0 : a[0] > b[0] ? 1 : -1);
  }

  const getPrice = (category, value) => {
    for (let i = 0; i < category.length; i++) {
      const cat = category[i];
      if (value < cat[0]) return category[i - 1];
    }
    return category[category.length - 1];
  }

  const countUpConfig = { duration: .5, separator: ' ', suffix: ' руб.' };

  $('.calculator').each((i, el) => {
    const $container = $(el);
    const $sSlider = $container.find('.calculator__sSlider');
    const sSlider = $sSlider[0];
    const $sInput = $container.find('.calculator__sInput');
    const sInput = $sInput[0];

    const $basePrice = $container.find('.calculator__sum--base');
    const $complectPrice = $container.find('.calculator__sum--complect');
    const $totalPrice = $container.find('.calculator__sum--total');

    const basePriceAnim = new CountUp($basePrice[0], 0, countUpConfig);
    const complectPriceAnim = new CountUp($complectPrice[0], 0, countUpConfig);
    const totalPriceAnim = new CountUp($totalPrice[0], 0, countUpConfig);

    let type = +el.type.value || null;
    let coating = +el.coating.value || null;
    let s = +sInput.value.replace(/[^0-9]/g, '');

    const updatePrice = () => {
      const category = prices[type + '-' + coating];
      if (!category) return;
      const price = getPrice(category, s);

      const basePrice = price[1] * s;
      const totalPrice = price[2] * s;
      const complectPrice = totalPrice - basePrice;

      basePriceAnim.update(basePrice);
      complectPriceAnim.update(complectPrice);
      totalPriceAnim.update(totalPrice);
    };
    const updatePriceFromSlider = _debounce(updatePrice, 100);

    $container.find('.calculator__forms input').on('change', (e) => {
      type = +el.type.value;
      updatePrice();
    })

    $container.find('.calculator__covers input').on('change', (e) => {
      coating = +el.coating.value;
      updatePrice();
    })

    $sSlider.on('change', (e) => {
      sInput.value = e.target.value;
      mask.updateValue();
      s = +sInput.value;
      updatePriceFromSlider();
    });

    var mask = IMask(sInput, {
      mask: Number,
    });

    $sInput.on('input', (e) => {
      const value = +e.target.value.replace(/[^0-9]/g, '');
      if (!value) return;
      sSlider.value = e.target.value;
      sSlider.dispatchEvent(new Event('change'));
      s = value;
      updatePrice();
    });

    updatePrice();
  });
}