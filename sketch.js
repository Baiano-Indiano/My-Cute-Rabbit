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

var blink, eating, sad;

function preload(){
  backgroundImage = loadImage("./preload/background.png");
  fruitImage = loadImage("./preload/melon.png");
  rabbitImage = loadImage("./preload/Rabbit-01.png");
  blink = loadAnimation("./preload/blink_1.png","./preload/blink_2.png","./preload/blink_3.png");
  eating = loadAnimation("./preload/eat_0.png","./preload/eat_1.png","./preload/eat_2.png","./preload/eat_3.png","./preload/eat_4.png");
  sad = loadAnimation("./preload/sad_1.png","./preload/sad_2.png","./preload/sad_3.png");

  blink.playing = true;
  eating.playing = true;
  sad.playing = true;

  eating.looping = false;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  bunnySprite = createSprite(270,620,100,100);
  bunnySprite.scale = 0.2;
  bunnySprite.addImage(rabbitImage);
  bunnySprite.addAnimation("blink", blink);
  bunnySprite.addAnimation("eating", eating);
  bunnySprite.addAnimation("sad", sad);

  bunnySprite.changeAnimation("blink");

  buttonImage = createImg("./preload/cut_button.png");
  buttonImage.position(220,30);
  buttonImage.size(30,30);
  buttonImage.mouseClicked(cortar);
 
  floor = new Floor(200,690,600,20);
  rope = new Rope(6,{x:245,y:30});
  fruit = Bodies.circle(300,300,15);
  World.add(world,fruit);
  stick = new Connect(rope,fruit);

  blink.frameDelay = 30;
  eating.frameDelay = 20;

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

  if(fruit !== null){
    image(fruitImage,fruit.position.x, fruit.position.y, 65,65);
  }
 
  floor.show();
  rope.show();
  if(collision(fruit,bunnySprite) === true){
    bunnySprite.changeAnimation("eating");
  }
  if(fruit !== null && fruit.position.y >= 650){
    bunnySprite.changeAnimation("sad");
    fruit = null;
  }
  drawSprites();
}

function cortar(){
  rope.break();
  stick.noConnect();
  stick = null;
}

function collision(corpo_1,sprite_1){
  if(corpo_1 !== null){
    var meters = dist(corpo_1.position.x, corpo_1.position.y, sprite_1.position.x, sprite_1.position.y);
    if(meters <= 80 ){
      World.remove(world,fruit);
      fruit = null;
      return true; 
    } else{
      return false;
    }
  }
}
