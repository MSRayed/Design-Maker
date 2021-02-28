var sliders = {} // All the sliders will be stored in here

var shapes = [];
var rows;
var cols;
var row_size;
var col_size;

function setup() {
  createCanvas(500, 700);

  rect(200, 300, 200, 100);
  // sliders = {
  //   "rows" : makeSlider(5, 30, 10, 1, initialize, "Number of rows"),
  //   "cols" : makeSlider(5, 30, 10, 1, initialize, "Number of columns"),
  //   "row_size" : makeSlider(20, 50, 10, 1, initialize, "Distance between Shapes (Vertical)"),
  //   "col_size" : makeSlider(20, 50, 10, 1, initialize, "Distance between Shapes (Horizontal)"),
  //   "radius" : makeSlider(10, 100, 20, 1, initialize, "Radius of shapes"),
  //   "sides" : makeSlider(3, 15, 6, 1, initialize, "Number of sides of the shape"),
  //   "hashes" : makeSlider(3, 25, 5, 1, initialize, "Number of hashes"),

  //   "window_width": makeSlider(200, 1200, 600, 50, window_resize, "Width of the canvas"),
  //   "window_height": makeSlider(200, 1200, 600, 50, window_resize, "Height of the canvas")
  // }

  // setValuesFromSlider();
  // initialize(); // Will initialize the shapes
}


function draw() {
  // background(240);

  // for (let row of shapes) {
  //   for (let shape of row) {
  //     shape.display();
  //   }
  // }
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

  setValuesFromSlider(); // Sets the variable values to the slider value

  for (let i = 1; i < rows; i++) {
    let y = i * row_size;
    let row = [];
    for (let j = 1 + i % 2; j < (cols - 1) - i % 2; j++) { //Altering the number of the columns
      let x = j * col_size;

      let shape = new Shape(x, y, sliders['sides'].value(), // Getting the values from sliders
      											sliders['radius'].value(), 
      											sliders['hashes'].value());
      row.push(shape);
    }
    shapes.push(row);
  }
}

function window_resize() {
	w = sliders['window_width'].value();
	h = sliders['window_height'].value();
	console.log(w, h);

	resizeCanvas(w, h);
}

function setValuesFromSlider() {
  rows = sliders['rows'].value();
  cols = sliders['cols'].value();

  row_size = sliders['row_size'].value();
  col_size = sliders['col_size'].value();
}

function download(canvas, filename) {
  canvas = document.getElementsByTagName("canvas");
  filename = "design.svg"
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas[0].toDataURL("image/svg;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}