$(document).ready(function(){
  var box = $('.box');
  var clk = Array.prototype.slice.call(document.getElementsByClassName('r'));
  var content = {player1 : "", player2: ""};
  var main = $('.container');
  var msg = $('.new');
  var choose;
  var btn = $('.btn');
  var btn1 = $('.btn').text();
  var turn = 2;
  var board = new Array(9);
  var x = 'x';
  var o = 'o';
  var used = 0;
  var play = false;
  var winCombo = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
  ]
  var you = 0;
  var comp = 0;
  var current = currentCon();

  $('.res').click(function(){
    resetGame()
  })
  $('.pl').click(function(){
    if($(this).text() == '1 player'){
      play = true;
    }else{
      play = false;
    }
    $('.first').addClass('hide');
    $('.new').addClass('show');
    $('.first').removeClass('show');
    $('.new').removeClass('hide');
    if(!play){
      $('.1p').text("First player: ");
      $('.2p').text('Second player: ')
    }
  })

  $('.btn').click(function(){
    choose = $(this).text();
    console.log(choose);
    if(choose == x){
      content.player1 = x;
      content.player2 = o;
    }else{
      content.player1 = o;
      content.player2 = x;
    }
    $('.container').addClass('show');
    $('.container').addClass('text-center');
    $('.container').removeClass('hide');
    $('.new').addClass('hide');
    $('.new').removeClass('show');

  });
  function currentCon(){
    if(turn % 2 == 0){
      return content.player1;
    }else{
      return content.player2;
    }
  }

  function comMove(){
    var option =[], random, opti =[];
    clk.forEach(function(cell){
        option.push(cell);
     });

    for(var i =0; i < option.length; i++){
      if(option[i].innerHTML !== 'x' && option[i].innerHTML !=='o'){
        opti.push(option[i]);
      }
    }

    random = Math.ceil(Math.random() * opti.length-1);
    $(opti[random]).trigger('click');

  }
  $('.r').click(function(){
    used++;
    if(currentCon() == x){
       $(this).text('x').addClass('x');
    }else{
      $(this).text('o').addClass('o');
    }
    $(this).addClass(currentCon());
    var pos = $(this).data('id');
    board[pos] = currentCon() == x ? 1:0;
    if(checkWin()){
      gameWon();
      return;
    }
    if(used === 9){
      draw();
      return;
    }
    turn++;
    if(play){
    if(turn % 2 !== 0){
      return comMove();
    }}
  });

  function checkWin(){
    var row1 = board[0]+board[1]+board[2];
    var row2 = board[3]+board[4]+board[5];
    var row3 = board[6]+board[7]+board[8];
    var column1 = board[0]+board[3]+board[6];
    var column2 = board[1]+board[4]+board[7];
    var column3 = board[2]+board[5]+board[8];
    var slash1 = board[0]+board[4]+board[8];
    var slash2 = board[2]+board[4]+board[6];

   if(row1 == 0 || row1 == 3 || row2 == 0 || row2 == 3 || row3 == 0 || row3 == 3
     || column1 == 0 || column1 == 3 || column2 == 0 || column2 == 3 || column3 == 0 || column3 == 3
     || slash1 == 0 || slash2 == 0 || slash1 == 3 || slash2 == 3){
      return true;
    }

  }
  function gameWon(){
    var current = currentCon();
    if(!play){
      if(current == content.player1){
      alert('Player 1 Won!');
    }else{
      alert('Player 2 Won!');
    }
    }else{
    if(current == content.player1){
      alert('You won!!');
    }else{
      alert('You lost..');
    }
    }
    if(currentCon() == content.player1){
       you += 1;
    }else{
      comp +=1;
    }
    $('.1').text(you);
    $('.2').text(comp);
    resetGame();
  }
  function draw(){
    alert("I'ts a draw, play again..");
    resetGame();

  }

  function resetGame(){
    $('.r').text('').removeClass('o').removeClass('x');
    used = 0;
    board = new Array(9);
    turn = 2;
    }

});
