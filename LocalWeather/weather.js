function standby() {
    document.getElementById('img').src = 'https://cbsbaltimore.files.wordpress.com/2016/11/category_weather_500x500.png?w=310&h=310&crop=1'
}
var api =  "https://fcc-weather-api.glitch.me/api/current?"
$(document).ready(function(){
  var api =  "https://fcc-weather-api.glitch.me/api/current?"
  var lat;
  var lon;
  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(function(position){
      lat = "lat=" + position.coords.latitude;
      lon = "lon=" + position.coords.longitude;
      console.log(lat, lon);
    var url = api + lat + "&" + lon;
    $.getJSON(url, function(data){
      $("#city").html(data.name);
      $("#country").html(", " + data.sys.country);
      $("#temp").html(Math.round(data.main.temp));
      $("#situ").html(data.weather[0].description);
      $("#img").attr("src", (data.weather[0].icon));
   $("#tempunit").click(function (){
     var current = $("#tempunit").html()
     var temp = $("#temp").html()
        switch (current){
          case " C":
          $("#tempunit").html(" F");      
		  $("#temp").html(Math.round((1.8*temp) + 32));
            break;
          case " F":
          $("#tempunit").html(" C");
		  $("#temp").html(Math.round((temp - 32) / 1.8));
            break;

        }
      }

    )});

  })};
});
