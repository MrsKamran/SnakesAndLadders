var token,tokenColorLabel, userTile, num, text, winnerText, offset, colorInput, rollButton, userPos, tile, winner,playerToken, playerText; 
var snakeHead, snakeTail, ladderBase, ladderTop;
var numPlayers, playersInput, restart, randN, randArray, min,max;
var token2,tokenColor2Label, user2Tile, num2, text2, winner2Text, offset2, colorInput2, rollButton2, user2Pos, tile2, winner2, player2Token, player2Text; 
var diceThrowSound, dice2ThrowSound, tokenMoveSound, winnerSound;

diceThrowSound = new sound("Sounds/dicethrow.mp3");
dice2ThrowSound = new sound("Sounds/dicethrow2.mp3");
tokenMoveSound = new sound("Sounds/tokenmove.mp3");
winnerSound =  new sound("Sounds/winnersound1.mp3")

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

playersInput=document.getElementById("num-players");
tokenColorLabel=document.getElementById("token-color-label");
tokenColor2Label=document.getElementById("token-color2-label");
colorInput=document.getElementById("token-color-id");
colorInput2=document.getElementById("token-color2-id");
rollButton = document.getElementById("roll-button");
text = document.getElementById("num-here");
playerText = document.getElementById("player-text");
rollButton2 = document.getElementById("roll-button2");
text2 = document.getElementById("num2-here");
player2Text = document.getElementById("player2-text");
winnerText=document.getElementById("winner-here");
restart = document.getElementById("restart");
userTile = document.getElementById("t1");
user2Tile = document.getElementById("t1");

playersInput.addEventListener("input", getNumOfPlayers);
colorInput.addEventListener("input", playerTokenColor);
colorInput2.addEventListener("input", player2TokenColor);
rollButton.addEventListener('click', movePlayerToken);
rollButton2.addEventListener('click', movePlayer2Token);
restart.addEventListener('click', restartFunction);
init();

function restartFunction(){
snakeHead.forEach(function(head){
  tile = document.getElementById("t"+`${head}`);
  tile.style.color="black";
});
snakeTail.forEach(function(tail){
  tile = document.getElementById("t"+`${tail}`);
  tile.style.color="black";
});
ladderBase.forEach(function(base){
  tile = document.getElementById("t"+`${base}`);
  tile.style.color="black";
});
ladderTop.forEach(function(top){
  tile = document.getElementById("t"+`${top}`);
  tile.style.color="black";
});
init();
}
function init(){
if((winner===false) || (winner==='undefined')){
    if(userPos!==0){
        if(userPos!=='undefined'){
        tile = document.getElementById("t"+`${userPos}`);
        tile.style.backgroundColor="#ffffff";
        console.log("inside winner false user1 "+userPos);
        }}
    if(user2Pos!==0){
        if(user2Pos!=='undefined'){
        tile = document.getElementById("t"+`${user2Pos}`);
        tile.style.backgroundColor="#ffffff";
        console.log("inside winner false user2 "+user2Pos);
    }}
}

user2Pos=0;
userPos=0;
winner = false;
randArray=[];
text.innerText='';
playerText.innerText='';
player2Text.innerText='';
winnerText.innerText='';
colorInput.value='#ffffff';
colorInput2.value='#ffffff';
tokenColorLabel.style.visibility= "hidden";
tokenColor2Label.style.visibility= "hidden";
colorInput.style.visibility= "hidden";
colorInput2.style.visibility= "hidden";
rollButton.style.visibility= "hidden";
text.style.visibility= "hidden";
playerText.style.visibility= "hidden";
rollButton2.style.visibility= "hidden";
text2.style.visibility= "hidden";
player2Text.style.visibility= "hidden";
rollButton.disabled = false;
rollButton2.disabled = false;
playersInput.disabled=false;

// snakeHead=[randNum('S'),randNum('S'),randNum('S'),randNum('S')];
// ladderBase=[randNum('L'),randNum('L'),randNum('L'),randNum('L')];
// snakeTail=[snakeHead[0]-15,snakeHead[1]-10,snakeHead[2]-18,snakeHead[3]-15];
// ladderTop=[ladderBase[0]+10,ladderBase[1]+15,ladderBase[2]+18,ladderBase[3]+10];

snakeHead=[98, 76, 50, 39,28, 82];
snakeTail=[57,47,32,18,6, 61];
ladderBase=[19, 4, 48, 70, 38, 53];
ladderTop=[41,56, 74,92,64,89];

snakeHead.forEach(function(head){
  tile = document.getElementById("t"+`${head}`);
  tile.style.color="red";
});
snakeTail.forEach(function(tail){
  tile = document.getElementById("t"+`${tail}`);
  tile.style.color="pink";
});
ladderBase.forEach(function(base){
  tile = document.getElementById("t"+`${base}`);
  tile.style.color="green";
});
ladderTop.forEach(function(top){
  tile = document.getElementById("t"+`${top}`);
  tile.style.color="lightGreen";
});
}
function randNum(ch){
  if(ch ==='S'){
    min=20;
    max=95;
  }
  else if(ch ==='L'){
    min=5;
    max=80;
  }  
  randN = Math.ceil(Math.random() * (max - min)) + min;
  if (randArray.includes(randN)){
    randNum(ch);
  }
  else{
  randArray.push(randN);
  }
  return randN;
}

function playerTokenColor(){
playerToken=colorInput.value;
}
function player2TokenColor(){
  if(numPlayers=== '2'){
    player2Token=colorInput2.value;
  }
  else if(numPlayers === '3'){
    player2Token= "#"+(Math.floor(Math.random()*16777215).toString(16));
  }
}

function getNumOfPlayers(e){
  numPlayers = playersInput.value;
  playersInput.disabled=true;
  if(numPlayers === '1'){
    tokenColorLabel.style.visibility= "visible";
    colorInput.style.visibility= "visible";
    rollButton.style.visibility= "visible";
    text.style.visibility= "visible";
    playerText.style.visibility= "visible";
  }
  else if(numPlayers === '2'){
    tokenColorLabel.style.visibility= "visible";
    tokenColor2Label.style.visibility= "visible";
    colorInput.style.visibility= "visible";
    colorInput2.style.visibility= "visible";
    rollButton.style.visibility= "visible";
    text.style.visibility= "visible";
    playerText.style.visibility= "visible";
    rollButton2.style.visibility= "visible";
    text2.style.visibility= "visible";
    player2Text.style.visibility= "visible";
  }
  else if(numPlayers === '3'){
    tokenColorLabel.style.visibility= "visible";
    colorInput.style.visibility= "visible";
    rollButton.style.visibility= "visible";
    text.style.visibility= "visible";
    playerText.style.visibility= "visible";
  }
}
function getDiceNumber(){
    diceThrowSound.play();
    text = document.getElementById("num-here");
    num = Math.ceil(Math.random() * 6);
    setTimeout(()=>{
        text.innerText=num;
    text.style.color=playerToken;
    },1000)
    // text.innerText=num;
    // text.style.color=playerToken;
    if(numPlayers === '3' && user2Pos===0){
      player2TokenColor();
    }
    if(numPlayers === '3'){
      movePlayer2Token();
    }
    return num;
}
function getDice2Number(){
    if(numPlayers!==3){
        dice2ThrowSound.play();
    }
    text2 = document.getElementById("num2-here");
    num2 = Math.ceil(Math.random() * 6);
    setTimeout(()=>{
    text2.innerText=num2;
    text2.style.color= player2Token;
    },1000)
    // text2.innerText=num2;
    // text2.style.color= player2Token;
    return num2;
}
function checkForLadderOrSnake(userPos,pNum){
  if(snakeHead.includes(userPos)){
    userPos=snakeTail[`${snakeHead.indexOf(userPos)}`];
    console.log("snake head touched");
    if(pNum==='P1'){
      playerText.innerText="Snake";
      playerText.style.color="#FF0000";
    }
    if(pNum==='P2'){
      player2Text.innerText="Snake";
      player2Text.style.color="#FF0000";
    }
  }
  if(ladderBase.includes(userPos)){
    userPos=ladderTop[`${ladderBase.indexOf(userPos)}`];
    console.log("ladder base reached");
    if(pNum==='P1'){
    playerText.innerText="Ladder";
    playerText.style.color="#008000"
    }
    if(pNum==='P2'){
    player2Text.innerText="Ladder";
    player2Text.style.color="#008000"
    }
  }
  return userPos;
}
function movePlayerToken(){   
offset = getDiceNumber();

setTimeout(()=>{
console.log(offset);
  if(userPos !== 0 && winner!== true){
    userTile = document.getElementById("t"+`${userPos}`);
    if(userPos === user2Pos){
    userTile.style.backgroundColor=player2Token;
    }
    else{
    userTile.style.backgroundColor='#ffffff';
    }
    winnerText.innerText='';
    playerText.innerText='';
  }
  userPos = userPos + offset;
  userPos = checkForLadderOrSnake(userPos,'P1');
  if(userPos > 100 || user2Pos>100){
    winnerText.style.color="#FF00FF"
    if(userPos>100){
      console.log("Player 1 wins :)");
      winnerText.innerText="P1 wins !";
      winnerSound.play();
      if(numPlayers === '2' || numPlayers === '3'){
        userTile = document.getElementById("t"+`${user2Pos}`);
        userTile.style.backgroundColor='#ffffff';
      }
    }
    if(user2Pos>100){
      if(numPlayers === '2'){
        console.log("Player 2 wins :)");
        winnerText.innerText="P2 wins !";
        winnerSound.play();
      }
      else if (numPlayers === '3'){
      console.log("PC wins :)");
      winnerText.innerText="PC wins !";
      winnerSound.play();
      }
      userTile = document.getElementById("t"+`${userPos}`);
      userTile.style.backgroundColor='#ffffff';
    }
    text.innerText='';
    text2.innerText='';
    playerText.innerText='';
    player2Text.innerText='';
    winner = true;
    rollButton.disabled = true;
    colorInput.value='#ffffff';
    rollButton2.disabled = true;
    colorInput2.value='#ffffff';
    
  }
  else{
    setTimeout(()=>{
        tokenMoveSound.play();
  },100)
  userTile = document.getElementById("t"+`${userPos}`);
  userTile.style.backgroundColor=playerToken;
  }
},1000);
}

function movePlayer2Token(){
  offset2 = getDice2Number();

  setTimeout(()=>{
  if(user2Pos !== 0 && winner!== true){
    user2Tile = document.getElementById("t"+`${user2Pos}`);
    if(userPos === user2Pos){
    user2Tile.style.backgroundColor=playerToken;
    }
    else{
    user2Tile.style.backgroundColor='#ffffff';
    }
    
    winnerText.innerText='';
    player2Text.innerText='';
  }
  user2Pos = user2Pos + offset2;
  user2Pos = checkForLadderOrSnake(user2Pos,'P2');
  if((userPos > 100) || (user2Pos > 100)){
    winnerText.style.color="#FF00FF";
    if(userPos>100){
      console.log("Player 1 wins :)");
      winnerText.innerText="P1 wins !";
      winnerSound.play();
    }
    if(user2Pos>100){
      console.log("Player 2 wins :)");
      winnerText.innerText="P2 wins !";
      winnerSound.play();
       if( numPlayers === '3' || numPlayers === '2'){
        userTile = document.getElementById("t"+`${userPos}`);
        userTile.style.backgroundColor='#ffffff';
      }
    }
    text.innerText='';
    text2.innerText='';
    playerText.innerText='';
    player2Text.innerText='';
    winner = true;
    rollButton.disabled = true;
    colorInput.value='#ffffff';
    rollButton2.disabled = true;
    colorInput2.value='#ffffff';
  }
  else{
  setTimeout(()=>{
        tokenMoveSound.play();
  },100)
  user2Tile = document.getElementById("t"+`${user2Pos}`);
  user2Tile.style.backgroundColor= player2Token;
  }
},1000);
}


  