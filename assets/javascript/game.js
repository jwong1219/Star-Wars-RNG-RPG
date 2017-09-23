$(document).ready(function() {

//Global variables declared here
var charSelect = false;
var oppSelect = false;
var gameOver = false;
var opponentsDefeated = 0;
var player;
var opponent;
var characters = [];

//Sounds declared and sourced here

//Global functions declared here
function gameReset() {
  charSelect = false;
  oppSelect = false;
  gameOver = false;
  console.log("Game reset");
  console.log({charSelect}, {oppSelect}, {gameOver});
}

//Character object constructor declared here
function Character(name, alive, life, base, side) {
  this.name = name;
  this.alive = alive;
  this.life = life;
  this.basePower = base;
  this.power = base;
  this.side = side; //light or dark
  // this.attackSound = attackSound;
  // this.deathSound = deathSound;

  this.attack = function (enemy) {
    this.attackSound.play();
    enemy.life -= this.power;
    this.power += this.basePower;
    console.log(enemy.life, this.power);
  };

  this.ctrAttack = function (enemy) {
    this.attackSound.play();
    enemy.life -= this.basePower;
    console.log(enemy.life);
  };

  this.death = function () {
    this.deathSound.play();
    this.alive = false;
    console.log(this.alive);
  };
}

function createChar(name) {
  switch (name) {
    case "luke" :
      var luke = new Character("Luke", true, 100, 9, "light");
      console.log(luke);
      charSelect = true;
      return luke;
      break;
    case "han" :
      var han = new Character("Han Solo", true, 120, 7, "light");
      console.log(han);
      charSelect = true;
      return han;
      break;
    case "leia" :
      var leia = new Character("Leia", true, 100, 6, "light");
      console.log(leia);
      charSelect = true;
      return leia;
      break;
    case "chewy" :
      var chewy = new Character("Chewbacca", true, 150, 8, "light");
      console.log(chewy);
      charSelect = true;
      return chewy;
      break;
  }
}


function game() {
  console.log("game started");
  //alert player to pick a character
  $("#alert").html("Please select a character");
  //listen for button click on a character
  $(".btn").on("click", function() {
    var key = $(this).attr("value");
    console.log({key});
    console.log({gameOver});
    console.log({charSelect});
    //process character pick
    if(gameOver) return;

    if(charSelect && oppSelect) {
      $("#alert").html("You cannot select a character at this time");
      return;
    }

    //build character object
    //assign player to created object
    if(charSelect === false) {
      player = createChar(key);
      console.log(player);
      $("#player").html(player.name);
    }
  
   
  //generate character image
  });

  //alert player to pick an opponent
  //listen for button click on a character
  //process opponent pick
    //build character object
    //assign opponent to created object
  //generate oponent image

  //player attacks opponent
    //if opponent dies
      //update opponents defeated
      //if there are more opponents left
        //player must pick new opponent
      //if there are no more opponents left
        //alert that player has won, and prompt for reset

  //opponent counterattacks player
    //if player dies
    //game over & prompt for reset


}

game();








}); //End of the entire script, beginning with the document.ready
