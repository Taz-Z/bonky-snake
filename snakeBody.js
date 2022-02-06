class SnakeBody {
  constructor(x, y, type) {
    const options = {
      density: 100,
      friction: 1,
      restitution: 0,
      label: type,
    };
    this.r = 20;
    this.body = Bodies.circle(x, y, this.r, options);
    Composite.add(world, this.body);
  }

  isHead() {
    return this.body.label === "head";
  }

  show() {
    const bodyPos = this.body.position;
    let angle = this.body.angle;

    if (this.isHead()) {
      let pos = { x: 0, y: 0 };
      if (keyIsDown(LEFT_ARROW)) pos.x = -5;
      else if (keyIsDown(RIGHT_ARROW)) pos.x = 5;
      else if (keyIsDown(UP_ARROW)) pos.y = -5;
      else if (keyIsDown(DOWN_ARROW)) pos.y = 5;
      Body.setVelocity(this.body, pos);
    }

    push();
    translate(bodyPos.x, bodyPos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(this.isHead() ? 'rgb(0,255,0)': 123);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
