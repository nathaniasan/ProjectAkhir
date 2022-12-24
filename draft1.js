
let asteroids=[]
let musuhImg;
function preload(){
  musuhImg=loadImage("R.png")
}

// let height = 350;
function setup() {
  createCanvas(400,400)
  player= new Hero(20, 200, 360,color(700,0,0),0);
  musuh= new Monster(mouseX,350,height,1);
  musuh.setup()
  
  level = new Level();
  level.setLevel(1);
  
}

function draw() {
  background(0);
  player.show();
  player.move()
  rectMode(CENTER)
  player.showPeluru()
  //entitas.attack();
  musuh.show()
  player.kena()
  musuh.addMusuh();
  level.getCurentLevel();
  player.setsaveScore(score);
  
  text ("Lvl " + level.getCurentLevel(), 15, 15);
  text ("Score " + player.getsaveScore(score), 15, 20);
  
}
//segala class
class Entity {
  constructor (x,y, h, w){
    this.x = x;
    this.y = y ;
    this.height = h;
    this.width = w;

  }
  attack(){
    if(mousePressed){
    let bullet={
      x:mouseX,
      y:heigth
      }
    bullets.push(bullet)
  }}

  moveRight(){
    if(this.x < 600){    
      this.x += 3;
    }
  }
  moveLeft(){
    if(this.x > 0){
      this.x -= 3;
    }
  }
  moveDown(){
    if(this.y < 400){
      this.y += 3;
    }
  }
  moveUp(){
    if(this.y > 0){
      this.y -= 3;
    }
  }

}
class Hero extends Entity{
  constructor(ukuran, x, y, warna, speed) {
    super(x, y);
    this.warna=warna;
    this.kecepatan=speed;
    this.ukuran=ukuran;
    this.life = 100;
    this.score = 0;
    
  }
  
  show(){
     background(100,27,900);
     fill(this.warna);
     circle(this.x, this.y, this.ukuran);
  }

  increaseScore(){
  score = this.score;
  score+=1;
  }
  calculateLife(){
  }

  saveScore(){

  }

}

class Peluru extends Hero{
  constructor(ukuran, x, y, warna, speed){
    super( x, y );
    this.warna=warna;
    this.kecepatan=speed;
    this.ukuran=ukuran;
    
  }
  show(){
     fill(this.warna);
     noStroke()
     for (let bullet of bullets){
     circle(bullet.x,bullet.y,this.ukuran)
     bullet.y -= this.kecepatan;
       
     }
  }
}


class Monster extends Entity{
  //asteroidnya
  constructor(x, y, w, h) {
    super(x, y, w, h);
    let asteroid = [];
    this.life;
    this.color;
    this.effect;
    this.type;

  }

  setup(){
    let asteroid={
      x:random(0,width),
      y:random(-800,0)
    }
     asteroids.push(asteroid)
  } 

show(){
  fill(this.warna);
  noStroke()
  for(let asteroid of asteroids){
    rect(asteroid.x,asteroid.y,this.ukuran) 
    asteroid.y += this.kecepatan
    if(asteroid.y>heigth){
      color(255,255,255)
      text("You lose!",heigth-175,width/2)
      noLoop()
    }
  }
}
  moveRandom(){

  }
  saveScore(){

  }
}

class Map{
  constructor(w,h){
    this.width= w;
    this.height= h;
  }
  init(){
    for(let asteroid of asteroids){
      for(let bullet of bullets){
        if(dist (asteroid.x,asteroid.y,bullet.x,bullet.y)<10){
          asteroids.splice(asteroids.indexOf(asteroid),1)
          bullets.splice(bullets.indexOf(bullet),1)
          this.setup()
          score+=1
        }
      }
    }  
  }
  move(){}
}


class Level{
  constructor() {
    this.currentLevel = 0;
    this.latestLevel = 0;
    this.maxLevel = 0;
  }
  setLevel(level){
    this.currentLevel = level;
  } 
  getCurentLevel(){
    return this.currentLevel;
  }
}

