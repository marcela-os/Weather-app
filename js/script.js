
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
}