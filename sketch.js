const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var floor;

var rope;
var fruit;

var stick;

var bunnySprite;

var backgroundImage, fruitImage, rabbitImage,buttonImage;

function preload(){
  backgroundImage = loadImage("./preload/background.png");
  fruitImage = loadImage("./preload/melon.png");
  rabbitImage = loadImage("./preload/Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  bunnySprite = createSprite(250,650,100,100);
  bunnySprite.scale = 0.2;
  bunnySprite.addImage(rabbitImage);
  buttonImage = createImg("./preload/cut_button.png");
  buttonImage.position(220,30);
  buttonImage.size(30,30);
  buttonImage.mouseClicked(cortar);
 
  floor = new Floor(200,690,600,20);
  rope = new Rope(6,{x:245,y:30});
  fruit = Bodies.circle(300,300,15);
  World.add(world,fruit);
  stick = new Connect(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImage, width/2, height/2, 500, 700);
  Engine.update(engine);
  image(fruitImage,fruit.position.x, fruit.position.y, 65,65);
  floor.show();
  rope.show();
  drawSprites();
}

function cortar(){
  rope.break();
  stick.noConnect();
  stick = null;
}


