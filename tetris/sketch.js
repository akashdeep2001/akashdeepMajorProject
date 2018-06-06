const edge = 20;                            //edge of one rectangle of shape
let time;                                  //declare scope variable time
let groundArray = [];
let blockcolors = ["blue","red","green","brown","yellow","orange","purple"]; // Color array for each block
let player;

function createBlock(type) {                // get block array
  switch (type) {                         // this function will return the shape follow its type
  case 0:
    return [
      [1, 1],
      [1, 1],
    ];
  case 1:
    return [
      [2, 2, 0],
      [0, 2, 2],
      [0, 0, 0],
    ];
  case 2:
    return [
      [0, 3, 3],
      [3, 3, 0],
      [0, 0, 0],
    ];

  case 3:
    return [
      [0, 0, 0],
      [4, 4, 4],
      [0, 4, 0],
    ];

  case 4:
    return [
      [0, 5, 0],
      [0, 5, 0],
      [0, 5, 5],
    ];
  case 5:
    return [
      [0, 6, 0],
      [0, 6, 0],
      [6, 6, 0],
    ];

  case 6:
    return [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
    ];
  }
}

// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(240, 400);                 // create canvas object in HTML width 240 px, height 400 px
  player = new Player();                  // create player object
  player.reset();
  time = millis();                        // the number of milliseconds since starting the program.
  groundArray = new Array(height / edge);       // declare block area
  for (let i = 0; i < groundArray.length; i++){
    groundArray[i] = new Array(width / edge).fill(0);
  }
}

// The statements in draw() are executed until the program is stopped.
// Each statement is executed in sequence and after the last line is read, the first line is executed again.
function draw() {
  background(150);                        // set canvas background color as grey
  drawMatrix(groundArray, [0, 0]);              //
  drawMatrix(player.matrix, [player.x, player.y]); //
  if ((millis() - time) > 1000) {
    player.drop();                      //drop block after 1 second
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.x--;                         // move block left
    if (IsCollide(groundArray, player)) {
      player.x++;
    }
  }
  else if (keyCode === RIGHT_ARROW) {
    player.x++;                         // move block left
    if (IsCollide(groundArray, player)) {
      player.x--;
    }
  }
}

function drawMatrix(matrix, offset) {                                               // drawing 1 block to offset position
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== 0) {
        fill(blockcolors[matrix[y][x] - 1]);                                // fill color to each rectangle
        rect((x + offset[0]) * edge, (y + offset[1]) * edge, edge, edge);   //draw block to x, y position
      }
    }
  }
}

function IsCollide(groundArray, player) {                                           // check block Collideration
  for (let y = 0; y < player.matrix.length; y++) {                                // Collideration detected return true else return false
    for (let x = 0; x < player.matrix[0 ].length; x++) {
      if(player.matrix[y][x] !== 0 && (groundArray[y + player.y] && groundArray[y + player.y][x + player.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function Player() {
  this.x = 0;                                                 // initialize block position X
  this.y = 0;                                                 // initialize block position y
  this.matrix = 0;                                            // initialize matrix
  this.score = 0;                                             // initialize score as zero

  this.reset = function () {                                  // reset ground
    this.x = width / edge / 2 - 1;                        // set block position x center at the first time
    this.y = 0;                                             // set block position y as zero
    this.matrix = createBlock(Math.floor(Math.random() * 7));//create new block
    if (IsCollide(groundArray, player)) {                   // if detected collideration initialize groundarray as zero array
      for (let i = 0; i < groundArray.length; i++) {
        groundArray[i].fill(0);
      }
    }
    this.updateScore();                                     // update score
  };

  this.drop = function () {                                       //this function drops block
    this.y++;                                                   // increase value of y axis
    if (IsCollide(groundArray, this)) {                         // if collideration detected, recover the y axis value
      this.y--;                                               // recovery y axis value
      this.reset();                                           // reset ground
    }
    time = millis();
  };

  this.rotate = function () {                                     // this function is writen for rotate block it control the block matrix
    this.matrix.reverse();                                      //Reverses the order of matrix array
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = y + 1; x < this.matrix[y].length; x++) {
        [this.matrix[y][x], this.matrix[x][y]] = [this.matrix[x][y], this.matrix[y][x]];
      }
    }
  };

  this.updateScore = function () {
    document.getElementById("score").innerText = this.score;     // update score display
  };
}
