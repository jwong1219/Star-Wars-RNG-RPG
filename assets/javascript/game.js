$(document).ready(function() {

//Global variables declared here
var charSelect = false;
var oppSelect = false;
var gameOver = false;
var opponentsDefeated = 0;
var player;
var opponent;
var characters = [];
var idLight = ["#luke", "#han", "#leia", "#chewy"];
var idDark = ["#stormtrooper", "#boba", "#vader", "#emperor"];

//Sounds declared and sourced here

//Global functions declared here
function gameOver() {
  gameOver = true;
  //prompt for reset
};

function gameReset() {
  charSelect = false;
  oppSelect = false;
  gameOver = false;
  //make all character buttons active again and remove previous character avatars from arena
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
  // this.playerAvatar = playerAvatar;
  // this.oppAvatat = oppAvatar;
  // this.attackSound = attackSound;
  // this.deathSound = deathSound;

  this.attack = function (enemy) {
    //this.attackSound.play();
    enemy.life -= this.power;
    $("#alert").html("You have attacked " + opponent.name + " for " + this.power + " damage!");
    this.power += this.basePower;
    //update enemy life html;
    console.log(enemy.life, this.power);
  };

  this.ctrAttack = function (enemy) {
    //this.attackSound.play();
    enemy.life -= this.basePower;
    $("#alert").html(opponent.name + " has attacked you for " + this.basePower + " damage!");
    //update enemy life html;
    console.log(enemy.life);
  };

  this.death = function () {
    //this.deathSound.play();
    this.alive = false;
    console.log(this.alive);
    // $("#alert").html("You have defeated " + this.name + "! Please select another opponent");
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
    case "stormtrooper" :
      var stormy = new Character("Stormtrooper", true, 90, 6, "dark");
      console.log(stormy);
      charSelect = true;
      return stormy;
      break;
    case "boba" :
      var boba = new Character("Boba Fett", true, 110, 8, "dark");
      console.log(boba);
      charSelect = true;
      return boba;
      break;
    case "vader" :
      var vader = new Character("Darth Vader", true, 120, 8, "dark");
      console.log(vader);
      charSelect = true;
      return vader;
      break;
    case "emperor" :
      var palps = new Character("Emperor Palpatine", true, 80, 10, "dark");
      console.log(palps);
      charSelect = true;
      return palps;
      break;

  }
}


function game() {
  console.log("game started");
  //alert player to pick a character
  $("#alert").html("Please select a character.");
  
  //listen for button click on a character
  $(".select").on("click", function() {
    var key = $(this).attr("value");
    console.log({key});
    console.log({gameOver});
    console.log({charSelect});
    console.log({oppSelect});
    //process character pick
    if (gameOver) {
      $("#alert").html("The game is over. Please click the reset button to restart the game.");
      return;
    } 

    if (charSelect && oppSelect) {
      $("#alert").html("You cannot select a character at this time.");
      return;
    }

    //build character object
    //assign player to created object
    if (charSelect === false) { //set the player's character
      player = createChar(key);
      $("#player-avatar").html("<h3>"+player.name+"</h3>");//generate player avatar in arena
      console.log(player);
      charSelect = true;
      //console.log($(this).attr("id"));
      if (player.side === "light") {
        for (var i=0; i<idLight.length; i++) {
          //console.log(idLight[i]);
          if ("#" + ($(this).attr("id")) !== idLight[i]) {
            $(idLight[i]).parent().addClass("invisible");
          }
          else if ("#" + ($(this).attr("id")) === idLight[i]) {
            $(idLight[i]).addClass("disabled");
            $(idLight[i]).click(false);//doesn't work
          }
        }
      }

      //make the buttons for the rest of the players on the same side inactive... can't choose a character from the same side as an opponent;

      $("#player").html(player.name);
      //generate player character image in arena;

      //the player has chosen a character, so now they must choose an opponent... alert player to pick an opponent
      $("#alert").html("Please select an opponent.");
      //alert player to pick an opponent
    }

    else if (charSelect && !oppSelect) {//if the player has chosen a character but no opponent
      console.log(key, player.name);
      if(key === player.name) {//not working, values are not equivalent
        $("#alert").html("You cannot fight yourself.");
      }
      else {
        //process opponent pick
          //build character object
          //assign opponent to created object
        opponent = createChar(key);
        $("#opp-avatar").html("<h3>"+opponent.name+"</h3>");
        console.log(opponent);
        oppSelect = true;
        console.log({oppSelect});

        $("#opponent").html(opponent.name);
        //generate opponent character image in arena;

        //make the attack button visible;
        $("#alert").html("Press the attack button to attack your opponent!");
      }
    }
  });

  $("#attack").on("click", function() {
    if (gameOver) {//if the game is over, this button should be hidden & inactive, but just in case...
      $("#alert").html("The game is over. Please click the reset button to restart the game.");
    }
    else if (!charSelect) { //If the player has not chosen a character or...
      $("#alert").html("You must select a character first!");
    }
    else if (!oppSelect) { //If the player has not chosen and opponent, this button should be hidden or inactive, but just in case...
      $("#alert").html("You must select an opponent first!");
    }
    else {
      console.log("player attacks!");
      //player attacks opponent
      player.attack(opponent);
      //if opponent dies
      if (opponent.life <= 0) {
        opponent.death();
        oppSelect = false;
        //update opponents defeated
        opponentsDefeated++;
        $("#defeated").html(opponentsDefeated);
        // opponent.alive = false;
        console.log(opponent.alive);
        $("#alert").html("You have defeated " + opponent.name + "!");
        console.log("You have defeated " + opponent.name + "!");
        //remove opponent avatar from arena;
      }
      else if(opponent.alive) {
        //opponent counterattacks player
        console.log("opponent counters!")
        opponent.ctrAttack(player);
        //if player dies
        if (player.life <= 0) {
          player.death();
          charSelect = false;
          // player.alive = false;
          console.log(player.alive);
          $("#alert").html("You have been defeated! <br> Game Over!");
          console.log("You have been defeated! <br> Game Over!");
          //remove player avatar from arena;
          //gameOver();
        }
      }
    }
  });


      //if there are more opponents left
        //player must pick new opponent
      //if there are no more opponents left
        //alert that player has won, and prompt for reset
}

game();

}); //End of the entire script, beginning with the document.ready
