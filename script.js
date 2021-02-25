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
            fiveDayAPICall(cityInput);
        })
}

function fiveDayAPICall(cityInput) {
    var fiveDayAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + appkey + '&units=' + unit;

    fetch(fiveDayAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var data = data;
            var arrayList = data.list;
            console.log('arrayList', arrayList);

            arrayList.forEach((dayObject) => {
                var noon = dayObject.dt_txt.includes('12:00:00');
                if (noon) {
                    var date = dayObject.dt_txt.split(' ')[0];
                    var temp = dayObject.main.temp;
                    var humidity = dayObject.main.humidity;
                    var icon = dayObject.weather[0].icon;
                    var iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
                    var forecast = document.querySelector('.forecast__wrapper');
                    var dayForecastData = document.createElement("div");
                    dayForecastData.className = 'forecast__box';
                    dayForecastData.innerHTML = `<p class="forecast__date">${date}</p> <img src="${iconUrl}"> <p class="forecast__temp">Temp: ${temp} F</p> <p class="forecast__humidity">Humidity: ${humidity}%</p>`;
                    forecast.appendChild(dayForecastData);
                }
            });
        })

}

function clear5Day() {
    var forecast = document.querySelector('.forecast__wrapper');
    forecast.innerHTML = '';
}

$("#clear_btn").on("click", function () {
    citiesList = [];
})


// function storingCityInput(cityInput) {
//     var city = cityInput;
//     for (var i = 0; i <= 6; i++) {
//         if (city !== "") {
//             localStorage.setItem('cityInput', cityInput[i]);
//             console.log('storage is working', localStorage);
//         }
//     }
// }

var citiesList = localStorage.getItem('cities') || [];
console.log('cities', citiesList);
var citiesListUl = document.querySelector('#citiesList');
console.log(citiesListUl, 'citiesListUl');

$("#searchBtn").on("click", function () {
    // capture the value in citySearched and trim it to get rid of white spaces
    var cityInput = $('#citySearched').val().toUpperCase().trim();
    console.log(cityInput, 'cities');
    // IF value of cityInput is not equal to "" then create an Li element, add a classs, add the city input and append it to the ul
    if (cityInput !== "") {
        console.log('city button working');
        citiesListUl.innerHTML = ' ';

        citiesList.push(cityInput);
        localStorage.setItem('citiesList', citiesList);
        console.log('storage', localStorage);

        citiesList.forEach((city) => {
            var li = document.createElement('li');
            li.classList.add('cityList__item');
            li.innerHTML = city;
            citiesListUl.appendChild(li);
        });




        clear5Day();
        // CityInput(cityInput)
        apiCall(cityInput);
    }
});