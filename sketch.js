var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var bg
var bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score = 0;
var survivaltime = 0

function preload()
{
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg")
 
}



function setup() 
{ 
  createCanvas(600,400);
  
  bg = createSprite(300,200,600,400)
  bg.addImage("bg",bgImage);
  bg.x = bg.width/2;
  
  monkey = createSprite(50,360,15,15);
  monkey.addAnimation("runnning" , monkey_running);
  monkey.scale = 0.10;
   
  ground = createSprite(300 , 380 , 600 , 10 );
  ground.x = ground.width/2;
  ground.visible = false;


  
  foodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() 
{
  background("lightyellow")
  drawSprites();
//GAMESTATE = PLAY
  if(gameState===PLAY)
  { 
    //functions
    food();
    obstacles();
    increaseH();
//score
  if(foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
      score = score + 2;
      
    }
  if(obstacleGroup.isTouching(monkey))
    {
      monkey.scale = 0.10;
      gameState = END;
    }
//monkey control
  if(keyDown("space") && monkey.y >= 120) 
  {
    monkey.velocityY = -15;
  }
    monkey.velocityY = monkey.velocityY + 0.9;
  
//groundscroll  
  ground.velocityX = -4
  if (ground.x < 0)
  {
     ground.x = ground.width/2;
  }
  
  bg.velocityX= -5
  if(bg.x < 97)
    {
      bg.x = bg.width/2
  }

  
  //collision
  monkey.collide(ground);
  obstacleGroup.collide(monkey)
 
 
  //consoles
  console.log("Frame Count = " + frameCount);
  console.log("Frame Rate = " + frameRate());
  console.log("Monkey Scale = " + monkey.scale);
  console.log("GameState = " + gameState);
    
  }
  else if(gameState === END)
    {
         bg.velocityX = 0;
         ground.velocityX = 0;
         monkey.velocityY = 0;
         foodGroup.setVelocityXEach(0);
         obstacleGroup.setVelocityXEach(0);

         obstacleGroup.setLifetimeEach(-1);
         foodGroup.setLifetimeEach(-1);

//the player becomes invisible because there isn't any animations for collision      
         monkey.visible = false
        
         fill("red");
         textSize(60);
         textFont("impact");
         text("Uh-Oh!" , 225,200);
      
         fill("black");
         textSize(30);
         textFont("impact");
         text("Restart using 'r'" , 215,240);
       
         if(keyDown("r"))
         {
           reset();    
         }
    }
  
  //scorefont
  fill("black");
  textFont("impact");
  textSize(20);
  text("Score : " + score , 450 , 35 );
  
  //lifetimefont
  fill("black");
  textFont("impact");
  textSize(20);
  survivaltime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivaltime , 15 , 35);

}

function food()
{
  if (frameCount%80 == 0)
  {
    var banana = createSprite(600,240,40,10);
    banana.y = Math.round(random(100,250));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -7;  
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

function obstacles()
{ if (frameCount%300 === 0)
  {  
     obstacle = createSprite(600 , 359 , 30 , 30);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.lifetime = 220;
     obstacle.velocityX = -5;
    
    obstacleGroup.add(obstacle);
  }
}

function increaseH()
{
  var increase = Math.round(score)
 switch (increase) 
 {
   case 10 : monkey.scale = 0.12
            break;
            
   case 20 : monkey.scale = 0.14
            break;  
            
   case 30 : monkey.scale = 0.16
            break;
            
   case 40 : monkey.scale = 0.18
            break;
            
   case 50 : monkey.scale = 0.20
            break;  
            default:break;
 }
}

function reset()
{
  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score = 0;
  monkey.visible = true;
  survivaltime = 0;
  frameCount = 0;
}


