var appkey = '14c203985535363483dc6e984fdf3c1b';
var currentDate = moment().format("MM/D/YYYY");
var unit = 'imperial';


function apiCall(x) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + x + '&appid=' + appkey + '&units=' + unit;
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityEl = document.querySelector('#cityName');
            console.log(cityEl);
            cityEl.textContent = x + ' (' + (currentDate) + ')';
            var tempEl = document.querySelector('#temp');
            console.log(tempEl);
            tempEl.textContent = 'Temperature: ' + parseInt(data.main.temp) + '°F';
            var humidityEl = document.querySelector('#humidity');
            console.log(humidityEl);
            humidityEl.textContent = 'Humidity: ' + parseInt(data.main.humidity) + '%';
            var windEl = document.querySelector('#windspeed');
            console.log(windEl);
            windEl.textContent = 'Wind Speed: ' + parseInt(data.wind.speed) + ' MPH';
            var lat = parseInt(data.coord.lat);
            console.log(lat, 'lat');
            var lon = parseInt(data.coord.lon);
            console.log(lon, 'lon');
            var uvIndexUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + appkey;

            fetch(uvIndexUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    uvIndexNumber = parseInt(data.value);
                    console.log('unIndexNumber', uvIndexNumber);
                    var uvIndexEl = document.querySelector('#uvindex');
                    console.log(uvIndexEl);
                    uvIndexEl.textContent = 'UV Index: ' + uvIndexNumber;
                    if (uvIndexNumber < 4) {
                        uvIndexEl.classList.add('favorable');
                    } else if (uvIndexNumber >= 4 && uvIndexNumber <= 7) {
                        uvIndexEl.classList.add('moderate');
                    } else {
                        uvIndexEl.classList.add('severe');
                    }

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

        apiCall(cityInput);
    }
})