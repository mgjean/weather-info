var latti,longi,api,weatherType,tempCacis,windSpeed,seaLevel,City,Country;

function getLocation(){
	var tempKelvin,image;
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			latti = position.coords.latitude;
			longi = position.coords.longitude;
			api = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1f6bc0b490002ecbd8c2042affa687c3/'+latti+','+longi;		
			$.getJSON(api,function(data){
			
			weatherType = data.weather[0].description;
			$("#weat").text(weatherType);
			
			weatherIcon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
			image = $(document.createElement("img"));
			image.attr('src',weatherIcon);
			image.css({"width":"40px","height":"40px"});
			$("#ico").html(image);
			
			tempKelvin = data.main.temp;
			tempCacis = (tempKelvin-273.15).toFixed(2)
			$("#temp").text(tempCacis + " C");
			
			windSpeed  = data.wind.speed;
			if (windSpeed >= 3 && windSpeed <= 5){
				$("#clr-wind").addClass("success")
			}
			if (windSpeed < 3){
				$("#clr-wind").addClass("info")
			}
			$("#windspd").text(windSpeed);
			


			City = data.name;
			Country = data.sys.country;
			$("#city").text(City +", "+Country);
		
			});

		});
	}
}	

function fahren(){
	var fah = (tempCacis * 9)/5 + 32;
	$("#temp").text( fah + " F");
}

function celsi(){
	$("#temp").text( tempCacis + " C");
}

