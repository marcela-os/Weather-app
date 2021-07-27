
function startApp(){
    console.log("window.onload is working");
    getLocation();
}
window.onload = startApp;

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            console.log("lat: " + lat, "long: " + long);
        });
    } 
}