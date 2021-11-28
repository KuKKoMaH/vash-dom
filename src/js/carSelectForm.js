import MicroModal from 'micromodal';

if (!window.CATALOG_URL) throw new Error('CATALOG_URL not found.');

var parentage = {
  brand: 'model',
  model: 'generation',
};

var selectizeConfig = {
  allowEmptyOption: true,
  labelField:       'title',
  valueField:       'title',
  searchField:      ['title'],
  sortField:        'title',
  onChange:         function ( title ) {
    var type = this.$input.data('type');
    var child = parentage[type];
    if (!child) return;

    var form = this.$wrapper.parents('form');
    var $child = form.find('[data-type="' + child + '"]');
    if (!$child.length) return;

    if (!title) $child[0].selectize.disable();
    clearChilds(form, type);

    var value = this.options[title];
    if (!value) return;

    $child[0].selectize.load(function ( cb ) {
      $.get(CATALOG_URL[child], { parent: value.id }, function ( res ) {
        $child[0].selectize.clearOptions();
        cb(res);
      });
    });
    $child[0].selectize.enable();
  },
};

$('.form--car').on('submit', function () {
  var $form = $(this);
  var $popup = $('#order-popup');
  var fields = getForm($form);
  $popup.find('.form__order').text(formatText(fields));
  for (var key in fields) {
    $popup.find('[name="' + key + '"]').val(fields[key]);
  }
  MicroModal.show('order-popup');
  return false;
});

$('.form--car select').selectize(selectizeConfig);

$.get(CATALOG_URL.brand, function ( res ) {
  $('[data-type="brand"]').each(function () {
    this.selectize.load(function ( cb ) {
      cb(res);
    });
    this.selectize.enable();
  });
});

$.get(CATALOG_URL.body, function ( res ) {
  $('[data-type="body"]').each(function () {
    this.selectize.load(function ( cb ) {
      cb(res);
    });
    this.selectize.enable();
  });
});

function getForm( $form ) {
  var fields = $form.serializeArray();
  var res = {};
  for (var i = 0; i < fields.length; i++) {
    res[fields[i].name] = fields[i].value;
  }
  return res;
}

function formatText( form ) {
  if ($.isEmptyObject(form)) return '';
  var text = 'Вы выбрали: ';
  if (form.count) text += form.count;
  if (form.brand || form.model || form.generation || form.body) text += ' на ';
  if (form.brand) text += form.brand + ' ';
  if (form.model && !form.generation) text += form.model + ' ';
  if (form.generation) text += form.generation + ' ';
  if (form.body) text += form.body;
  return text;
}

function clearChilds( form, type ) {
  var child = type;
  while (child = parentage[child]) {
    var $child = form.find('[data-type="' + child + '"]');
    $child[0].selectize.setValue();
  }
}
