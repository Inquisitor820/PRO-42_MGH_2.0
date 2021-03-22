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
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg")
 
}



function setup() 
{ 
  createCanvas(displayWidth,displayHeight);
  
  bg = createSprite(displayWidth-500,400,displayWidth,displayHeight)
  bg.addImage("bg",bgImage);
  bg.scale = displayWidth*1.29 / displayHeight*1.29
  
  monkey = createSprite(displayWidth-1700,displayHeight-350);
  monkey.addAnimation("runnning" , monkey_running);
  monkey.scale = 1/2;
   
  ground = createSprite(300 , displayHeight-180 ,displayWidth, 10 );
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
  if(keyDown("space") && monkey.y >= 400) 
  {
    monkey.velocityY = -25;
  }
    monkey.velocityY = monkey.velocityY + 0.9;
  
//groundscroll  
  ground.velocityX = -4
  if (ground.x < 0)
  {
     ground.x = ground.width/2;
  }
  
  bg.velocityX= -5
  if(bg.x < 400)
    {
      bg.x = bg.width/1.5
  }

  
  //collision
  monkey.collide(ground);
  obstacleGroup.collide(monkey)
 
 
  //consoles
  console.log("Frame Count = " + frameCount);
 // console.log("Frame Rate = " + frameRate());
 // console.log("Monkey Scale = " + monkey.scale);
 // console.log("GameState = " + gameState);
  console.log("y: "+ (displayHeight-mouseY))
 // console.log("x: "+ (displayHeight-mouseX))

    
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
         textSize(120);
         textFont("impact");
         text("Uh-Oh!" , (displayWidth/2)-250,displayHeight/2);
      
         fill("black");
         textSize(60);
         textFont("impact");
         text("Restart using 'r'" ,(displayWidth/2)-260,(displayHeight/2)+80);
       
         if(keyDown("r"))
         {
           reset();    
         }
    }
  
  //scorefont
  fill("white");
  textFont("courier");
  textSize(70);
  stroke("black");
  strokeWeight(7)
  text("Score : " + score , displayWidth-1900  , displayHeight-1000 );
  
  //lifetimefont
  fill("white");
  textFont("courier");
  textSize(55);
  survivaltime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivaltime ,displayWidth-600 , displayHeight-1010);

}

function food()
{
  if (frameCount%150 == 0)
  {
    var banana = createSprite(displayWidth+10,displayWidth-250);
    banana.y = Math.round(random(displayHeight-250,displayHeight-550));
    banana.addImage(bananaImage);
    banana.scale = 1/5;
    banana.velocityX = -10;  
    banana.lifetime = 300;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

function obstacles()
{ if (frameCount%250 === 0)
  {  
     obstacle = createSprite(displayWidth+10,displayHeight-280);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 1/2
     obstacle.lifetime = 400;
     obstacle.velocityX = -5;
    
    obstacleGroup.add(obstacle);
  }
}

function increaseH()
{
  var increase = Math.round(score)
 switch (increase) 
 {
   case 10 : monkey.scale = 1
            break;
            
   case 20 : monkey.scale = 1/2
            break;  
            
   case 30 : monkey.scale = 2
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

