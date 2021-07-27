
function startApp(){
    console.log("window.onload is working");
    getLocation();
}
window.onload = startApp;


let lat;
let long;
const apiKey = config.API_KEY;


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            console.log("lat: " + lat, "long: " + long);

            getWeatherData();
        });
    } 
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url).then(function(response){
        response.json().then( function(data){
            console.log(data);

            updateWeatherData(data);
        });
    });
}

function updateWeatherData(data){
    const temp = data.main.temp;
    const humid = data.main.humidity;
    const pressure = data.main.pressure;
    const clouds = data.clouds.all;
    const wind = data.wind.speed;
    const city = data.name;
    const sunRise = new Date(data.sys.sunrise * 1000);
    const sunSet = new Date(data.sys.sunset * 1000);
    
    function convertTimeSunRise(){
        let hours = sunRise.getHours();
        let minutes = sunRise.getMinutes();

        hours = hours >=10 ? hours : "0" + hours.toString();
        minutes = minutes >=10 ? minutes : "0" + minutes.toString();
        
        return hours + ":" + minutes;
    }

    function convertTimeSunSet(){
        let hours = sunSet.getHours();
        let minutes = sunSet.getMinutes();

        hours = hours >=10 ? hours : "0" + hours.toString();
        minutes = minutes >=10 ? minutes : "0" + minutes.toString();
        
        return hours + ":" + minutes;
    }

    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById("humidity").innerHTML = humid + "%";
    document.getElementById("pressure").innerHTML = pressure + "hPa";
    document.getElementById("cloudsPerc").innerHTML = clouds + "%";
    document.getElementById("windSpeed").innerHTML = wind + "km/h";
    document.getElementById("sunRice").innerHTML = convertTimeSunRise();
    document.getElementById("sunSet").innerHTML = convertTimeSunSet();

    let imgUrl = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);

    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = city;
    locationLink.href = `http://openstreetmap.org/#map=15/${lat}/${long}`;

}