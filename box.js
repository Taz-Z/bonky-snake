class Box {
  constructor(x, y, h, w) {
    const options = {
      density: 1000,
      friction: 1,
      restitution: 0,
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, h, w, options);
    Composite.add(world, this.body);
    rectMode(CENTER);
    rect(x, y, h, w);
  }
}
