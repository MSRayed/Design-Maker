var sliders = {} // All the sliders will be stored in here

var shapes = [];
var rows;
var cols;
var row_size;
var col_size;

function setup() {
  cnv = createCanvas(800, 800);

  sliders = {
    "rows" : makeSlider(5, 30, 10, 1, initialize, "Number of rows"),
    "cols" : makeSlider(5, 30, 10, 1, initialize, "Number of columns"),
    "row_size" : makeSlider(20, 50, 10, 1, initialize, "Distance between Shapes (Vertical)"),
    "col_size" : makeSlider(20, 50, 10, 1, initialize, "Distance between Shapes (Horizontal)"),
    "radius" : makeSlider(10, 100, 20, 1, initialize, "Radius of shapes"),
    "sides" : makeSlider(3, 15, 6, 1, initialize, "Number of sides of the shape"),
    "hashes" : makeSlider(3, 25, 5, 1, initialize, "Number of hashes"),
  }

  setValuesFromSlider();
  initialize(); // Will initialize the shapes
}


function draw() {
  background(200);
  setValuesFromSlider(); // Sets the variable values to the slider value

  for (let row of shapes) {
    for (let shape of row) {
      shape.display();
    }
  }
}

function makeSlider(min, max, start, step, callback, title_text) { // To create the slider adding an input event to it
  slider = createSlider(min, max, start, step);
  slider.changed(callback);

  controlPanel = select(".control-panel");
  sliderContainer = createDiv();
  sliderContainer.addClass('slider-container');

  slider.parent(sliderContainer);
  title_p = createP(title_text);

  title_p.parent(sliderContainer);
  sliderContainer.parent(controlPanel);
  return slider;
}

function initialize() {
  shapes = [];
  offset = 0;

  for (let i = 1; i < rows-1; i++) {
    let y = i * row_size;
    let row = [];

    if (i % 2 != 0) { // Indenting the odd rows
      cols = cols - 1;
      offset = sliders['radius'].value();
    } else {
      cols = cols + 1;
      offset = 0;
    }

    for (let j = 1; j < cols-1; j++) {
      let x = (j * col_size) + offset;

      let shape = new Shape(x, y, sliders['sides'].value(), sliders['radius'].value(), sliders['hashes'].value());
      row.push(shape);
    }
    shapes.push(row);
  }
}

function setValuesFromSlider() {
  rows = sliders['rows'].value();
  cols = sliders['cols'].value();

  row_size = sliders['row_size'].value();
  col_size = sliders['col_size'].value();
}

function saveSVG() {
  save('design.svg');
}
