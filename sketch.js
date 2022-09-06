
var trex ,trex_running;
var scoreCount=0
var PLAY=1
var END=0
var gameState=1

function preload(){
  trexRun=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png",)
  backgroundImage=loadImage("background.jpg")
  groundImage=loadImage("ground.jpg")
  spikeAnimation=loadAnimation("Spike1.png","Spike2.png","Spike3.png","Spike4.png","Spike5.png","Spike6.png","Spike7.png")
  gameOverImage=loadImage("gameOver.png")
  boyStop=loadAnimation("boy1.png")

}

function setup(){
  createCanvas(windowWidth,windowHeight)
  trex=createSprite(120,height-130,20,40)
  trex.addAnimation("joe",trexRun)
  trex.addAnimation("stop",boyStop)
  trex.scale=1.6
  trex.debug=false
  trex.setCollider("rectangle",0,0,40,80)
  ground=createSprite(840,height-10,1440,40)
  ground.addImage(groundImage)
  spikeGroup = createGroup()
  
  gameOver=createSprite(width/2,height/2)
  gameOver.addImage(gameOverImage)

}

function draw(){
  background(backgroundImage)
  drawSprites()
  trex.collide(ground)
  fill ("green")
  textSize(20)
  text("Score:"+scoreCount, width-150, 50)
  if (gameState===1){
    if (spikeGroup.isTouching(trex)){
      gameState=0
    }
    spawnObstacles()
    scoreCount=scoreCount+Math.round(getFrameRate()/60 )
    ground.velocityX=-(3+scoreCount/50)
    gameOver.visible=false
    if (ground.x<0) {
      ground.x=ground.width/2
    }
    if (keyDown("space")){
      trex.velocityY=-25
    }
    trex.velocityY+=1
  }
  if (gameState===0){
    trex.velocityY=0
    spikeGroup.setVelocityXEach(0)
    spikeGroup.setLifetimeEach(-2)
    ground.velocityX=0
    trex.changeAnimation("stop")
    gameOver.visible=true
    fill ("red")
    textSize(30)
    textAlign(CENTER)
    text("Press Enter to play again", width/2, 300)
    if (keyDown("enter")){
      gameState=1
      scoreCount=0
      spikeGroup.destroyEach()
      trex.changeAnimation("joe")
    }


  }


}

function spawnClouds(){
  if (frameCount%70===0){
    cloud=createSprite(width,25,50,20)
    cloud.scale=1.5
    cloud.addImage(cloudImage)
    cloud.velocityX=-(3+scoreCount/50)
    cloud.y=Math.round(random(20,200))
    trex.depth=cloud.depth
    trex.depth+=1
    cloud.lifetime=width/cloud.velocityX
    cloudGroup.add(cloud)
    restart.depth=cloud.depth
    gameOver.depth=cloud.depth
  }

}

function spawnObstacles(){
  if (frameCount%100===0){
    spike=createSprite(width,height-118,20,70)
    spike.velocityX=-(3+scoreCount/50)
    spike.addAnimation("spike", spikeAnimation)
    spike.scale=1.5
    spike.lifetime=width/spike.velocityX
    spikeGroup.add(spike)
    spike.debug=false
  }
}
