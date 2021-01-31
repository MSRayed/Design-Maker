function Shape(x, y, sides, rad) {
  this.pos = createVector(x, y);
  this.rad = rad;
  this.sides = sides;

  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(2);
    noFill();
    this.polygon(); // Draws the polygon
    pop();
  }

  this.polygon = function() {
    angle = TWO_PI / this.sides;

    beginShape();
    for (a = 0; a < TWO_PI; a += angle) {
      sx = this.pos.x + cos(a) * this.rad;
      sy = this.pos.y + sin(a) * this.rad;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
