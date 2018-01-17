var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function(){
    function getChannelInfo(){
  channels.forEach(function(channel){
    function makeUrl(type, chan){
      return "https://wind-bow.gomix.me/twitch-api/"+type+"/"+chan+'?callback=?';
    }
  $.getJSON(makeUrl("streams",channel),function(data){
      var status, game;
    if(data.stream === null){
      game = "offline";
      status = "offline";
    }else if (data.stream === undefined){
        game = "Account Closed";
        status = "offline";
    }else{
      game = data.stream.game;
      status = "online";
    };
  $.getJSON(makeUrl("channels",channel),function(data){
    var logo, name, discription;
    logo = data.logo;
    if(logo === null){
      logo = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    }
    name = data.display_name;
    discription = status;
    if(status == "online"){
      discription = ": "+data.status+"";
    }
        html = '<li class="' + status + '"><div class="text-left"><img src="' +logo+'" class="logo"></img><a href="'+data.url+'"target="_blank class="lnk" >  '+name+'</a></div><p>'+game+'<span> '+discription+'</span></p></li></>';
    $("#li").append(html);
     });
    });
   });

  };
     getChannelInfo()

});
