import IMask from 'imask';

$('.calculator').each(( i, el ) => {
  const $container = $(el);
  const $sSlider = $container.find('.calculator__sSlider');
  const sSlider = $sSlider[0];
  const $sInput = $container.find('.calculator__sInput');
  const sInput = $sInput[0];

  $sSlider.on('change', ( e ) => {
    sInput.value = e.target.value;
    mask.updateValue();
  });

  var mask = IMask(sInput, {
    mask: Number,
  });

  $sInput.on('input', ( e ) => {
    const value = +e.target.value.replace(/[^0-9]/g, '');
    if (!value) return;
    sSlider.value = e.target.value;
    sSlider.dispatchEvent(new Event('change'));
  });
});

