const {
  Engine,
  Runner,
  Bodies,
  Collision,
  Composite,
  Constraint,
  Composites,
  Body,
  Events,
} = Matter;

const GAME_OVER = "YOU DIED, PRESS ENTER TO RESTART";
let canvas;
let snake;
let snakeParticle;
let engine;
let world;
let runner;
let snakeComp;
let isAlive;

const onCollision = ({ pairs }) => {
  const { bodyA, bodyB } = pairs[0];
  if (
    !(
      (bodyA.label === "head" && bodyB.label === "particle") ||
      (bodyB.label === "head" && bodyA.label === "particle")
    )
  ) {
    isAlive = false;
    return;
  }
  Composite.remove(world, snakeParticle.body);

  const { x, y } = snake.at(-1).body.position;

  const newSnakeBody = new SnakeBody(x, y + 50, `body-${snake.length}`);
  const options = {
    bodyA: snake.at(-1).body,
    bodyB: newSnakeBody.body,
    stiffness: 1,
  };
  snake.push(newSnakeBody);
  const constraint = new Constraint.create(options);

  Composite.add(world, constraint);
  snakeParticle = new SnakeBody(
    random(40, width) - 40,
    random(40, height) - 40,
    "particle"
  );
};

function setup() {
  canvas = createCanvas(window.screen.width / 6, window.screen.height / 6);
  frameRate(30);
  engine = Engine.create();
  world = engine.world;
  engine.gravity.scale = 0;
  runner = Runner.create();
  isAlive = true;
  snake = [];
  new Box(100, 100
    
    , 100, 100)
  snake.push(new SnakeBody(100, 100, "head"));
  snakeParticle = new SnakeBody(
    random(40, width) - 40,
    random(40, height) - 40,
    "particle"
  );

  Runner.run(runner, engine);

  // Events.on(engine, "collisionStart", onCollision);
}

function keyPressed() {
  if (keyCode === ENTER) {
    Composite.clear(world);
    Engine.clear(engine);
    Runner.stop(runner);
    console.log("reset clicked");
    setup();
  }
}

function draw() {
  background(0);

  if (!isAlive) {
    fill("red");
    text(GAME_OVER, 0, 50);
    return;
  }

  // snake.forEach((s) => s.show());
  // snakeParticle.show();
}
