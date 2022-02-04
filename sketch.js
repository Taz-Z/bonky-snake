const {
  Engine,
  Render,
  Runner,
  Bodies,
  Collision,
  Composite,
  Constraint,
  Composites,
} = Matter;

let canvas;
let snake = [];
let snakeParticle;
let engine;
let world;
let runner;
let didCollide;
let snakeComp;

function setup() {
  canvas = createCanvas(500, 500);
  frameRate(30);

  engine = Engine.create();
  world = engine.world;
  engine.gravity.scale = 0;
  runner = Runner.create();
  snake.push(new SnakeBody(100, 100, "head"));
  snakeParticle = new SnakeBody(200, 300, "body");
  Runner.run(runner, engine);
}

function draw() {
  background(0);

  // snakeParticle.show();
  // snake.forEach(s => s.show())
  // didCollide = Collision.collides(snakeParticle.body, snake[0].body);
  // console.log(didCollide);
}
