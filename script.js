var appkey = '14c203985535363483dc6e984fdf3c1b';
// var cityInput = document.getElementById($('#citySearched').val());
var city = 'charlotte';
console.log('city');
// var city = cityInput.value;
var unit = 'imperial';
var lat = 'response.city.coord.lat';
var lon = 'response.city.coord.lon';

var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appkey + '&units=' + unit;
var uvIndexUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + appkey;

fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var cityEl = document.querySelector('#cityName');
        console.log(cityEl);
        cityEl.textContent = city;
        var tempEl = document.querySelector('#temp');
        console.log(tempEl);
        tempEl.textContent = 'Temperature: ' + parseInt(data.main.temp) + '°F';
        var humidityEl = document.querySelector('#humidity');
        console.log(humidityEl);
        humidityEl.textContent = 'Humidity: ' + parseInt(data.main.humidity) + '%';
        var windEl = document.querySelector('#windspeed');
        console.log(windEl);
        windEl.textContent = 'Wind Speed: ' + parseInt(data.wind.speed) + ' MPH';
        // var uvIndexEl = document.querySelector('#uvindex');
        // console.log(uvIndexEl);
        // uvIndexEl.textContent = 'UV Index: ' + parseInt(data.wind.Speed) + 'MPH';
    })
fetch(uvIndexUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var uvIndexEl = document.querySelector('#uvindex');
        console.log(uvIndexEl);
        // uvIndexEl.textContent = 'UV Index: ' + parseInt(data.wind.Speed) + 'MPH';
    })



var cities = [];


$("#searchBtn").on("click", function () {
    if (cityInput !== "") {
        console.log('city button working');
        var ul = document.querySelector('cityList');
        var li1 = document.createElement('li');
        li1.textContent = cityInput;
        ul.appendChild(li1);
    }
})