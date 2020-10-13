//Variables - the words user and player are used interchangeably for variables
var tokenColorLabel, userTile, num, text, offset, colorInput, rollButton, userPos, tile, winner,playerToken; 
var tokenColor2Label, user2Tile, num2, text2, offset2, colorInput2, rollButton2, user2Pos, tile2, winner2, player2Token; 
var snakeHead, snakeTail, ladderBase, ladderTop;
var gameBoard, numPlayers, playersInput, restart, yayImg, oopsImg, stars;
var diceThrowSound, dice2ThrowSound, tokenMoveSound, winnerSound;

//DOM Elements and sound objects
gameBoard = document.querySelector(".game-board");
playersInputLabel = document.getElementById("numP-label");
playersInput = document.getElementById("num-players");
tokenColorLabel = document.getElementById("token-color-label");
tokenColor2Label = document.getElementById("token-color2-label");
colorInput = document.getElementById("token-color-id");
colorInput2 = document.getElementById("token-color2-id");
rollButton = document.getElementById("roll-button");
text = document.getElementById("num-here");
rollButton2 = document.getElementById("roll-button2");
text2 = document.getElementById("num2-here");
restart = document.getElementById("restart");
userTile = document.getElementById("t1");
user2Tile = document.getElementById("t1");
yayImg = document.getElementById("yay");
oopsImg = document.getElementById("oops");
imagesDiv = document.getElementById("imagesdiv");
diceThrowSound = new sound("Sounds/dicethrow.mp3");
dice2ThrowSound = new sound("Sounds/dicethrow2.mp3");
tokenMoveSound = new sound("Sounds/tokenmove.mp3");
winnerSound =  new sound("Sounds/winnersound1.mp3");

//Event Listeners
playersInput.addEventListener("input", getNumOfPlayers);
colorInput.addEventListener("input", playerTokenColor);
colorInput2.addEventListener("input", player2TokenColor);
rollButton.addEventListener('click', renderPlayerToken);
rollButton2.addEventListener('click', renderPlayer2Token);
restart.addEventListener('click', restartFunction);
init();//Initializes the game for the first time


function restartFunction(){
  //Hide stars from previous winner's display
  if (document.querySelector('.winner')){{
    stars = document.querySelectorAll('.winner');
    }
    stars.forEach(function(star){
    star.style.visibility = 'hidden';
  })
  }
  //Clear tile token colors from previous game
  if(!winner){
    clearTokens();
  }
  init();
}


function init(){
  user2Pos = 0;
  userPos = 0;
  winner = false;
  text.innerText = '';
  text2.innerText = '';
  colorInput.value = '#d64161';
  colorInput2.value = '#ff7b25';
  playerToken = colorInput.value;
  player2Token = colorInput2.value;
  gameBoard.style.visibility = 'visible';
  playersInputLabel.style.visibility = 'visible';
  playersInput.style.visibility = 'visible';
  rollButton.disabled = false;
  rollButton2.disabled = true;
  playersInput.disabled =false;
  colorInput.disabled = false;
  colorInput2.disabled = false;
  hidePanel();
  renderSnakesAndLadders();
}

//Hides players' color inputs and dice(s) etc when the game starts
function hidePanel(){
  tokenColorLabel.style.visibility = "hidden";
  tokenColor2Label.style.visibility = "hidden";
  colorInput.style.visibility = "hidden";
  colorInput2.style.visibility = "hidden";
  rollButton.style.visibility = "hidden";
  text.style.visibility = "hidden";
  rollButton2.style.visibility = "hidden";
  text2.style.visibility = "hidden";
  yayImg.style.visibility = 'hidden';
  oopsImg.style.visibility = 'hidden';
}

function renderSnakesAndLadders(){
  snakeHead=[98, 76, 50, 39,33, 82];
  snakeTail=[57,47,32,18,15, 61];
  ladderBase=[19, 4, 48, 51, 38, 53];
  ladderTop=[41,56, 74,92,64,89];

  snakeHead.forEach(function(head){
    tile = document.getElementById("t"+`${head}`);
    tile.style.color = "red";
  });
  snakeTail.forEach(function(tail){
    tile = document.getElementById("t"+`${tail}`);
    tile.style.color = "lightpink";
  });
  ladderBase.forEach(function(base){
    tile = document.getElementById("t"+`${base}`);
    tile.style.color = "green";
  });
  ladderTop.forEach(function(top){
    tile = document.getElementById("t"+`${top}`);
    tile.style.color = "lightGreen";
  });
}

function playerTokenColor(){
  playerToken = colorInput.value;
  }
  function player2TokenColor(){
    if(numPlayers === '2'){
      player2Token = colorInput2.value;
    }
    else if(numPlayers === '3'){//Generate random color for PC
      player2Token = "#"+(Math.floor(Math.random()*16777215).toString(16));
    }
}

function getNumOfPlayers(e){
  numPlayers = playersInput.value;
  playersInput.disabled = true;
  showPanel();
}

function showPanel(){
  if(numPlayers === '1'){
    tokenColorLabel.style.visibility = "visible";
    colorInput.style.visibility = "visible";
    rollButton.style.visibility = "visible";
    text.style.visibility = "visible";
  }
  else if(numPlayers === '2'){
    tokenColorLabel.style.visibility = "visible";
    tokenColor2Label.style.visibility = "visible";
    colorInput.style.visibility = "visible";
    colorInput2.style.visibility = "visible";
    rollButton.style.visibility = "visible";
    rollButton2.style.visibility = "visible";
    text.style.visibility = "visible";
    text2.style.visibility = "visible";
    colorInput.disabled = false;
    colorInput2.disabled = false;
  }
  else if(numPlayers === '3'){
    tokenColorLabel.style.visibility = "visible";
    colorInput.style.visibility = "visible";
    rollButton.style.visibility = "visible";
    text.style.visibility = "visible";
  }
}

function getDiceNumber(){
  diceThrowSound.play();
  text = document.getElementById("num-here");
  num = Math.ceil(Math.random() * 6);
  setTimeout(() => {
    text.innerText = num;
    text.style.color = playerToken;
  },1000)
  if((numPlayers === '3') && (!winner)){//For option 3, PC takes turn after player 1
    pcsTurn();
  }
  return num;
}

function pcsTurn(){
  if(!winner){//If player 1 wins, PC should not take turn
  if(user2Pos === 0){
    player2TokenColor();
  }
  renderPlayer2Token();
}
}

function getDice2Number(){//Fot option 3, PC uses most of the functions from player 2
  if(numPlayers !== 3){
      dice2ThrowSound.play();
  }
  text2 = document.getElementById("num2-here");
  num2 = Math.ceil(Math.random() * 6);
  setTimeout(() => {
    text2.innerText = num2;
    text2.style.color = player2Token;
  },1000)
  return num2;
}

function checkForLadderOrSnake(userPos){
  if(snakeHead.includes(userPos)){
    userPos = snakeTail[`${snakeHead.indexOf(userPos)}`];
    oopsImg.style.top = document.getElementById("t"+`${userPos}`).offsetTop+"px";
    oopsImg.style.left = document.getElementById("t"+`${userPos}`).offsetLeft+"px";
    oopsImg.style.visibility = 'visible'; 
  }
  else{
    oopsImg.style.visibility = 'hidden';
  }
  if(ladderBase.includes(userPos)){
    userPos = ladderTop[`${ladderBase.indexOf(userPos)}`];
    yayImg.style.top = document.getElementById("t"+`${userPos}`).offsetTop+"px";
    yayImg.style.left = document.getElementById("t"+`${userPos}`).offsetLeft+"px";
    yayImg.style.visibility = 'visible';
  }
  else{
    yayImg.style.visibility = 'hidden';
  }
  return userPos;
 }

function renderPlayerToken(){   
  offset = getDiceNumber();
  setTimeout(() => {
    if((userPos !== 0) && (winner !== true)){
      userTile = document.getElementById("t"+`${userPos}`);
      if(userPos === user2Pos){//If player 1 was overlapping with player 2, keep player 2 on that tile otherwise clear that tile.
      userTile.style.backgroundColor = player2Token;
      }
      else{
      userTile.style.backgroundColor = '#ffffff';
      }
    }
    userPos = userPos + offset;
    userPos = checkForLadderOrSnake(userPos);
    checkForWinner();
    if(!winner){
    if (numPlayers === '2'){//toggle in case of two players
    rollButton.disabled = true;
    rollButton2.disabled = false;
    }
    setTimeout(() => {
        tokenMoveSound.play();
  },100)
  userTile = document.getElementById("t"+`${userPos}`);
  userTile.style.backgroundColor = playerToken;//token moved
  }
},1000);
}

function renderPlayer2Token(){
  offset2 = getDice2Number();
  setTimeout(() => {
  if((user2Pos !== 0) && (winner!== true)){
    user2Tile = document.getElementById("t"+`${user2Pos}`);
    if(userPos === user2Pos){ //If player 2 was overlapping with player 1, keep player 1 on that tile otherwise clear that tile.
      user2Tile.style.backgroundColor = playerToken;
    }
    else{
      user2Tile.style.backgroundColor = '#ffffff';
    }
  }
  user2Pos = user2Pos + offset2;
  user2Pos = checkForLadderOrSnake(user2Pos);
  checkForWinner();
  if(!winner){
    rollButton.disabled = false;//toggle 
    rollButton2.disabled = true;
  setTimeout(() => {
        tokenMoveSound.play();
  },100)
  user2Tile = document.getElementById("t"+`${user2Pos}`);
  user2Tile.style.backgroundColor= player2Token;//token moved
  }
},1000);
}

function checkForWinner(){
  if((userPos > 100) || (user2Pos>100)){
    if(userPos > 100){
      displayWinner('P1');
      winnerSound.play();
    }
    if(user2Pos > 100){
      if(numPlayers === '2'){
        displayWinner('P2');
        winnerSound.play();
      }
      else if (numPlayers === '3'){
        displayWinner('PC');
        winnerSound.play();
      }
    }
  //clear player tokens
  clearTokens();
  winner = true;
  hidePanel();
  }
}

function clearTokens(){
  if((userPos > 0) && (userPos <= 100)){
    userTile = document.getElementById("t"+`${userPos}`);
    userTile.style.backgroundColor= '#ffffff';
  }
  if((user2Pos > 0) && (user2Pos <= 100)){
    user2Tile = document.getElementById("t"+`${user2Pos}`);
    user2Tile.style.backgroundColor= '#ffffff';
  }
}

function displayWinner(pid){
  //hide players input and expression images
  playersInputLabel.style.visibility = 'hidden';
  playersInput.style.visibility = 'hidden';
  yayImg.style.visibility = 'hidden';
  oopsImg.style.visibility = 'hidden';
  //place stars and winner's image
  for(let i = 0; i < 125; i++){
    star = document.createElement("img");
    star.src ='Images/star.png';
    star.className = 'winner'
    if(i === 124){
      if(pid === 'P1'){
        star.src = 'Images/p1wins.png';
      }
      else if((pid === 'P2') && (numPlayers === '2')){
        star.src = 'Images/p2wins.png';
      } 
      else {
        star.src = 'Images/pcwins.png';
      }
      star.className = 'winner'
      star.style.top = 25 + 'px';
      star.style.left = 380 +'px';
      star.style.visibility = 'visible';
      star.style.width = 30 + '%';
      star.style.height = 'auto';
    }
    else{
      star.style.top = Math.ceil(Math.random() * 220) + 'px';
      star.style.left = Math.ceil(Math.random() * 1150) +'px';
      star.style.visibility = 'visible';
      star.style.width = 1.5 + '%';
      star.style.height = 'auto';
    }
  imagesDiv = document.getElementById("imagesdiv");
  document.querySelector(".game-board").style.visibility = 'hidden';
  imagesDiv.appendChild(star);
  }
}
  
  //For sounds --- I found this function before Audios were taught in class, so will keep it just as different way of implementation
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
} 
    





  