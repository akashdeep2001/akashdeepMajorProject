///TETRIS///
let canWidth;
let canHeight;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  canWidth = 300;
  canHeight = 600;
}

function draw(){

  rect(windowWidth/2-canWidth/2,windowHeight/2-canHeight/2,canWidth,canHeight);
  move();


}

function move(){
  let x = 20;
  let y = 40;
  rect(windowWidth/2, windowHeight/2, x,y);
  if(y<200){
    y = y+1;
  }
}
