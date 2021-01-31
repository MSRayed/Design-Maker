var sliders = {} // All the sliders will be stored in here


var shapes = [];
var rows;
var cols;
var row_size;
var col_size;

function setup() {
  createCanvas(800, 800);

  sliders = {
    "rows" : makeSlider(5, 30, 10, 1, initialize),
    "cols" : makeSlider(5, 30, 10, 1, initialize),
    "row_size" : makeSlider(20, 50, 10, 1, initialize),
    "col_size" : makeSlider(20, 50, 10, 1, initialize),
    "radius" : makeSlider(10, 100, 20, 1, initialize),
    "sides" : makeSlider(3, 15, 6, 1, initialize)
  }

  setValuesFromSlider();
  initialize(); // Will initialize the shapes
}


function draw() {
  background(0);
  setValuesFromSlider(); // Sets the variable values to the slider value

  for (let row of shapes) {
    for (let shape of row) {
      shape.display();
    }
  }
}

function makeSlider(min, max, start, step, callback) { // To create the slider adding an input event to it
  slider = createSlider(min, max, start, step);
  slider.input(callback);
  return slider;
}

function initialize() {
  shapes = [];
  for (let i = 1; i < rows-1; i++) {
    let y = i * row_size;
    let row = [];
    for (let j = 1; j < cols-1; j++) {
      let x = j * col_size;

      let shape = new Shape(x, y, sliders['sides'].value(), sliders['radius'].value());
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
