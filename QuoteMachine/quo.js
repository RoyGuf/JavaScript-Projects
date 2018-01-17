$(document).ready(function(){

  function getQuote(){
   try {
    var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
   // throw(new Error());
    $.getJSON(url, function(data){
      $("#quote").text(data.quoteText);
      $("#author").html("-" + data.quoteAuthor);
    });
   }
    catch (e) {
      console.log('error on getting quoute', e);
    }
  };

  $("#nextQ").on('click', function(){
    getQuote();
  });

  $("#tweetB").on('click', function(){
    window.open("https://twitter.com/intent/tweet?text=" + $("#quote").html() + " " + $("#author").html());;
  });

getQuote();
});
