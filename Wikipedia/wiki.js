
$(document).ready(function(){

  $("#but").on('click', function go(){
    $("#box").removeClass("box");
    $("#box").addClass("box1");
    var input = $("#input").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+input+"&format=json&callback=?"
    $.getJSON(url, function(data){
      $("#out").html('');
      for(var i = 0;i<data[1].length; i++){
        $("#out").append("<li id='re'><a href="+data[3][i]+" target='_blank'>"+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
      };
    });

  });

});
