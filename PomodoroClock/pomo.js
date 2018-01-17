$(document).ready(function(){
  var int;
  var cl = false
  var b = $('#BL');
  var BL = $('#BL').text();
  var sl = $('#SL');
  var SL = $('#SL').text();
  var t = parseFloat(SL);
  var timer= $('#time');
  var title = $('#title');
  var time = $('#time');
  time.text(t);
  var sec = $('#sec');
  sec.text('00');
  var s = parseFloat($('#sec').text());
  title.text('Session')
  $("#BLminus").click(function(){
    if(parseFloat(BL) > 0){
    b.text(parseFloat(BL)-1);
    BL = $('#BL').text();
    };
  });
  $(".BLpluse").click(function(){
    b.text(parseFloat(BL)+1);
    BL = $('#BL').text();
  });
  $(".SLminus").click(function(){
    clearInterval(int);
    s = 00;
    sec.text(s);
    if(parseFloat(SL) > 0){
    sl.text(parseFloat(SL)-1);
    SL = $('#SL').text();
    t = parseFloat(SL);
    time.text(t);
    }
  });
  $(".SLpluse").click(function(){
    clearInterval(int);
    s= '00';
    sec.text(s);
    sl.text(parseFloat(SL)+1);
    SL = $('#SL').text();
    t = parseFloat(SL);
    time.text(t);
  });
  $('.clock').click(function(){
    if (int) {
      clearInterval(int);
      int = undefined;}
    else{
      s == 00 ? 00:s;
      time.text(t);
      sec.text(s);
      int = setInterval(function(){clock(cl)}, 1000);
    }
  });
  function clock(cl){
    var session = true;
    var clk = $('.clock');
    if(!cl){
    if(t>=0){
       if(s>0){
         s -= 1;
         sec.text(s);
       }else if(s==0 && t!=0){
         t -= 1;
         time.text(t);
         s = 59;
         sec.text(s);
       }
    else if(t==0 && s==0 && ($('#title').text() == 'Session')){
      t = parseFloat(BL);
      if(t>=0){
      title.text('Break!');
      time.text(t);
      }
    }else if(t==0 && s==0 && ($('#title').text() == 'Break!')){
      title.text('Session');
      t = parseFloat(SL);
      time.text(t);
      clearInterval(int);
     }}}};
});
