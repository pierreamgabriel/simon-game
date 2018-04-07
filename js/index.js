/* Simon Game with an alternative style developed by Pierre Macedo */

const configs = {squares: ["s1", "s2", "s3", "s4" ], 
sequence: [], 
playersequence: [], 
count: 0,
sounds: {s1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
         s2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
         s3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
         s4: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')}};  

let isGameOn = false ;
let isStrictOn = false;

function onOff (){
  if (isGameOn === false){
    isGameOn = true;
    $('#off').addClass('off');
    $('#counter').html('ON');
  } else {
    isGameOn = false;
    isStrictOn = false;
    $('#on').addClass('off');
    $('#counter').empty();
    blocked = true;
    configs.sequence = [];
    configs.playersequence = [];
    configs.count = 0;
    
  }
}
function strictMode(){
  if (isGameOn === true){
  if (isStrictOn === false){
    isStrictOn = true;
    $('#counter').html('Strict mode is on');
} else {
  isStrictOn = false;
}
  }
}
function start (){
  if (isGameOn === true){
    configs.sequence = [];
    configs.playersequence = [];
    configs.count = 0;
    moves();
}
}

function moves (){
var counter = 1;
configs.sequence.push(configs.squares[(Math.floor(Math.random()*4))]);
configs.count = configs.count + counter; 
$('#counter').empty().html(configs.count);
showMoves();
}

function showMoves(){
  var i = 0;
  setInterval(function(){
    playGame(configs.sequence[i]);
    i++;
  }, 600);
  configs.playersequence = [];
}

function playGame(id) {
  $('#' + id).addClass('special');
  playSound(id);
  setTimeout(function(){
      $('#' + id).removeClass('special');
  }, 300); 
}
function playSound(id){
  switch(id) {
  case's1':
      configs.sounds.s1.play();
      break;
    case 's2':
      configs.sounds.s2.play();
      break;
    case 's3':
      configs.sounds.s3.play();
      break;
    case 's4':
      configs.sounds.s4.play();
      break;
  };
}
function playermoves (id){
  if (isGameOn === true){
 configs.playersequence.push(id);
 $('#' + id).addClass('special');
    playSound(id);
  setInterval(function(){
    $('#' + id).removeClass('special');
  }, 600);
  if (configs.playersequence[configs.playersequence.length - 1] !== configs.sequence[configs.playersequence.length - 1]){
    if(isStrictOn == true){
      $('#counter').empty().html('You failed!');
      setTimeout(function(){
      start();
        }, 600);
    } else {
    $('#counter').empty().html('Wrong move. Try again!');
      setTimeout(function(){
        showMoves();
      }, 300); }
  } else {
    var check = configs.playersequence.length === configs.sequence.length;
      if (check) {
        if(configs.count === 20){     $('#counter').empty().html('You won!');
        } else {
    newsequence();}}
}}}

function newsequence(){
  setTimeout(function(){
    moves();
  }, 600);
}