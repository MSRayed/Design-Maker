function Shape(x, y, sides, rad, hashes) {
  this.pos = createVector(x, y);
  this.rad = rad;
  this.sides = sides;
  this.hashes = hashes;

  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(2);
    noFill();
    this.polygon(); // Draws the polygon
    this.drawHashes();
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

  this.drawHashes = function() {
    let inc = this.rad / this.hashes;
    let x = 0;
    let angle = TWO_PI / this.sides;

    translate(this.pos.x, this.pos.y);
    for (let i = 0; i < this.hashes; i++) {
      push();
      translate(x, 0);
      rotate(-angle/2);
      line(0, 0, 0, this.rad);
      x -= inc;
      pop();
    }
  }
}
