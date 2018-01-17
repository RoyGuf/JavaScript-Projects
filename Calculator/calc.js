$(document).ready(function() {
  var op = '';
  var ok = true;
  var disp = $('#disp');
  var res = 0;
  $('button').click(function(){
    var disptxt = $('#disp').text();
    var input = $(this).text();
    switch(input){
      case 'ac':
        ok = true;
        res = 0;
        disp.text('0');
        break;
      case 'c':
        ok = true;
        disp.text('0');
        break;
      case '+':
        domath(parseFloat(disptxt), '+');
        break;
      case '-':
        domath(parseFloat(disptxt), '-');
        break;
      case '*':
        domath(parseFloat(disptxt), '*');
        break;
      case '/':
        domath(parseFloat(disptxt), '/');
        break;
      case '%':
        domath(parseFloat(disptxt), '%');
        break;
      case '=':
        domath(parseFloat(disptxt), '=');
        break;
      default:
        if(ok) {
					disp.text(input);
					ok = false;
				}
				else {disp.text(disptxt + input);
        }}
    });
  function domath(num, opr){
      ok = true;
      switch(op){
        case '+':
          res += num;
          break;
        case '-':
          res -= num;
          break;
        case '*':
          res *= num;
          break;
        case '/':
          res /= num;
          break;
        case '%':
          res = num/100;
          break;
        default:
				  res = num == 0 ? res : num;
      }
      op = opr == "=" ? "" : opr;
      var disptxt = res;
      disp.text(disptxt.length > 15 ? disptxt.substr(0,15) : disptxt);
    };
});
