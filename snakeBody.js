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
  isBody() {
    return this.body.label === "body";
  }

  isParticle() {
    return this.body.label === "particle";
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
    fill(255);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
