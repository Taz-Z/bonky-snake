class SnakeBody {
  constructor(x, y, type) {
    const options = {
      density: 0.1,
      restitution: 1,
    };
    this.x = x;
    this.y = y;
    this.body = Bodies.circle(x, y, 20, options);
    this.type = type;
    Composite.add(world, [this.body]);
  }

  isHead() {
    return this.type === "head";
  }

  isTail() {
    return this.type === "tail";
  }

  isBody() {
    return this.type === "body";
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
    circle(
      this.x,
      this.y,
      this.body.circleRadius * 2
    );
    pop();
  }
}
