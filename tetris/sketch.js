let player;
let groud = [];
let blocks = ["blue", "red, green", "brown", "yellow", "orange", "purple"]; // color of each array for the blocks

function setup(){
  createCanvas(240,400);
}

function draw(){
  background(150); // grey
}

function tile(type){  // get block array
  switch (type) {     //this function willl return the shape of the blocks
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

function keyPressed(){
  function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      player.x--;                         // move block left
    }
    else if (keyCode === RIGHT_ARROW) {
      player.x++;                         // move block left

    }
  }
}
