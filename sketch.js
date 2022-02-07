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
let snakeHead;
let borders = [];


const getMinMaxPosition = () => {
  let maxX = 0;
  let maxY = 0;
  let minX = Infinity;
  let minY = Infinity;
  for (const snakeBody of snake) {
    const {x, y} = snakeBody.body.position;
    if(x > maxX) maxX = x;
    if(x < minX) minX = x;
    if(y < minY) minY = y;
    if(y > maxY) maxY = y;
  }
  console.log(maxX, maxY, minX, minY)
  return [minX, maxX, minY, maxY];
}
const onCollision = ({ pairs }) => {
  const { bodyA, bodyB } = pairs[0];
  console.log(bodyA.label, bodyB.label)
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
  const [minX, maxX, minY, maxY] = getMinMaxPosition();
  let randx = 0;
  let randy = 0;

  do {

    randx = random(71, width-140);
    randy = random(71, height-140);
    console.log(randx, randy)

  } while((randx < minX - 20 || randx > maxX + 20) && (randy > maxY + 20 || randy < minY - 20 ))


  snakeParticle = new SnakeBody(
    randx,
    randy,
    "particle"
  );
};


function setup() {
  canvas = createCanvas(window.screen.width / 2, window.screen.height / 2);
  frameRate(30);
  engine = Engine.create();
  world = engine.world;
  engine.gravity.scale = 0;
  runner = Runner.create();
  isAlive = true;
  snake = [];
  borders.push(new Box(0, 0, 100, height * 2));
  borders.push(new Box(0, 0, width*2 , 100));
  borders.push(new Box(0, height,  width*2, 100, false));
  borders.push(new Box(width, 0,  100, height*2, false));
  snakeHead = new SnakeBody(100, 100, "head")
  snake.push(snakeHead);

  snakeParticle = new SnakeBody(
    random(71, width - 140),
    random(71, height - 140),
    "particle"
  );

  Runner.run(runner, engine);

  Events.on(engine, "collisionStart", onCollision);
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
  
  borders.forEach((s) => s.show());

  snake.forEach((s) => s.show());
  snakeParticle.show();
  // console.log(snakeParticle.body.position)
}
