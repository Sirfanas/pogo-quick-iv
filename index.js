// Made by Sirfanas


let StatBar = class StatBar {
  static fromId(id) {
    var statbar = new StatBar(id);
    var content = statbar.render();
    return statbar;
  }

  constructor(id) {
    this.element = $('#' + id);
    this.size = parseInt(this.element.attr('size'));
    this.value = parseInt(this.element.attr('value'));
    this.color = this.element.attr('color');
    this.title = this.element.attr('title');
    this.id = id;
  }

  render() {
    var self = this;
    var content = this._render();

    content.find('.progress').click(function (e) {
      console.log(this);
      console.log($(this));
      var barWidth = $(this).width();
      var mouseX = e.offsetX;

      self.setValue(Math.round(mouseX * self.size / barWidth));
    });

    this.element.html(content);
    compute_global_iv();
    return content;
  }

  _render() {
    var self = this;
    var currentValuePercent = this.value * 100 / this.size;
    var row = $('<div>').attr('class', 'row').append(
      // Add title
      $('<div>').attr('class', 'col-12').append(
        $('<h3>').text(this.title).attr({
          'class': 'text-center text-' + this.color,
        })
      ),
      // Add the current value
      $('<div>').attr('class', 'col-1').append(
        $('<p>').attr({
          'class': 'text-' + this.color,
          'style': 'font-weight: 700; font-size: 1.5rem',
        }).text(this.value)
      ),
      // Add button less
      $('<div>').attr('class', 'col-1').append(
        $('<button>').attr({
            'type': 'button',
            'class': 'btn btn-secondary',
        }).click(function() {self.decrease()}).append('<p>').attr({
          'style': 'font-weight: 700',
        }).text('-')
      ),
      // Add col with progressbar
      $('<div>').attr('class', 'col-8').append(
        // Create and add progress div
        $('<div>').attr('class','progress mt-2').append(
          // Create and add visual progressbar
          $('<div>').attr({
              class: 'progress-bar bg-' + this.color,
              role: 'progressbar',
              style: 'width: ' + currentValuePercent + '%',
            })
        )
      ),
      // Add button plus
      $('<div>').attr('class', 'col-1').append(
        $('<button>').attr({
            'type': 'button',
            'class': 'btn btn-secondary',
        }).click(function() {self.increase()}).append('<p>').attr({
          'style': 'font-weight: 700',
        }).text('+')
      ),
    );
    return row
  }

  increase() {
    if (this.value != this.size)
      this.setValue(this.value + 1);
  }

  decrease() {
    if (this.value != 0)
      this.setValue(this.value - 1);
  }

  setValue(value) {
    this.element.attr('value', value);
    this.value = value;
    this.render();
  }
}

function compute_global_iv() {
  var iv = 0;
  var n = 0

  $('div.statbar').each(function() {
    n += 1;
    var value = parseInt($(this).attr('value'));

    iv += value * 100 / 15;
  });

  iv = Math.round(((iv / n) + Number.EPSILON) * 100) / 100;

  var colors = '';
  if (iv == 100)
    colors = 'bg-success text-warning';
  else if (iv >= 90)
    colors = 'bg-success text-white';
  else if (iv >= 75)
    colors = 'bg-primary text-white';
  else if (iv >= 50)
    colors = 'bg-warning text-dark';
  else
    colors = 'bg-dark text-white';



  $('#IV').attr({
    'class': 'border p-2 ' + colors,
    'style': 'border-radius: .5rem'
  }).text(iv + '%');
}

$(document).ready(function() {
  progress_bars = [];
  $('div.statbar').each(function() {
      e = StatBar.fromId(this.id);
  });
});
