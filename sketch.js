var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;
var zombieGroup;
var gameState = 0;

var loseSound;
var lose;
var explosion;




function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  loseSound = loadSound("./assets/lose.mp3")

  explosion = loadSound("./assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false;
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false;
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.visible = true;
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
  background(0); 
 if(gameState === 0){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(life === 2){
  heart3.visible = false;
  heart2.visible = true;
}

if(life === 1){
  heart2.visible = false;
  heart1.visible = true;
}

if(life === 0)
{
  heart1.visible = false;
  gameState = 1;
  
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
  
 life = life - 1;
  
 console.log(life);

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       explosion.play();
       zombieGroup[i].destroy()
       
       } 
       
 }
}

//calling the function to spawn zombies
enemy();
 }


drawSprites();
if(gameState === 1){
  background("black");
  textSize(42);
  text("game over",windowWidth/2-100,windowHeight/2);
 
}
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    var x = random(300,1200);
    var y = random(300,520);
    
    zombie = createSprite(x,y,40,40)
  
   
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
