class Box {
    constructor(x, y, w, h) {
      let options = {
        friction: 0.3,
        restitution: 0.6,
        isStatic: true,
      };
      this.body = Bodies.rectangle(x, y, w, h, options);
      this.w = w;
      this.h = h;
      Composite.add(world, this.body);
    }
  
    show() {
      let pos = this.body.position;
      let angle = this.body.angle;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      strokeWeight(1);
      noStroke();
      fill(255,0,0);
      rect(0, 0, this.w, this.h);
      pop();
    }
  }



