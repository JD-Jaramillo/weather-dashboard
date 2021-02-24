var appkey = '14c203985535363483dc6e984fdf3c1b';
var currentDate = moment().format("MM/D/YYYY");
var unit = 'imperial';


function apiCall(cityInput) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + appkey + '&units=' + unit;
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityEl = document.querySelector('#cityName');
            cityEl.textContent = cityInput + ' (' + (currentDate) + ')';
            var tempEl = document.querySelector('#temp');
            tempEl.textContent = 'Temperature: ' + parseInt(data.main.temp) + '°F';
            var humidityEl = document.querySelector('#humidity');
            humidityEl.textContent = 'Humidity: ' + parseInt(data.main.humidity) + '%';
            var windEl = document.querySelector('#windspeed');
            windEl.textContent = 'Wind Speed: ' + parseInt(data.wind.speed) + ' MPH';
            var lat = parseInt(data.coord.lat);
            var lon = parseInt(data.coord.lon);

            var uvIndexUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + appkey;

            fetch(uvIndexUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    uvIndexNumber = parseInt(data.value);
                    var uvIndexEl = document.querySelector('#uvindex');
                    uvIndexEl.textContent = 'UV Index: ' + uvIndexNumber;
                    if (uvIndexNumber < 4) {
                        uvIndexEl.classList.add('favorable');
                    } else if (uvIndexNumber >= 4 && uvIndexNumber <= 7) {
                        uvIndexEl.classList.add('moderate');
                    } else {
                        uvIndexEl.classList.add('severe');
                    }
                })
            var fiveDayAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + appkey + '&units=' + unit;

            fetch(fiveDayAPI)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var date = '10/21';
                    var icon = 'this'
                    var temp = 80;
                    var humidity = 80;
                    var forecastWrapper = document.getElementById('forecast__wrapper');
                    console.log('forecastWrapper', forecastWrapper);
                    forecastWrapper.innerHTML =
                        `<div class="forecast__box">
                    <p class="forecast__date">${date}</p>
                    <p class="forecast__icon">${icon}</p>
                    <p class="forecast__temp">Temp: ${temp} F</p>
                    <p class="forecast__humidity">Humidity: ${humidity}%</p>
                    </div>`
                })
        })
}

var cities = [];


$("#searchBtn").on("click", function () {
    // capturture the value in citySearched
    var cityInput = $('#citySearched').val().trim();
    console.log(cityInput, 'cities');
    if (cityInput !== "") {
        console.log('city button working');
        var ul = document.querySelector('.cityList');
        var li1 = document.createElement('li');
        li1.classList.add('cityList__item');
        li1.textContent = cityInput;
        ul.appendChild(li1);
        localStorage.setItem('city', li1)

        apiCall(cityInput);
    }
});