// global variables used for the api calls
var appkey = '14c203985535363483dc6e984fdf3c1b';
var currentDate = moment().format("MM/D/YYYY");
var unit = 'imperial';

// function to call the openweathermap api to get data on the city the user inputs
function apiCall(cityInput) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + appkey + '&units=' + unit;
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // collecting different variables to plug them into the DOM so that the user can see data for their city
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

            // fetching the UVIndex open weather api so that we can set info on the uv index
            fetch(uvIndexUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    uvIndexNumber = parseInt(data.value);
                    var uvIndexEl = document.querySelector('#uvindex');
                    uvIndexEl.textContent = 'UV Index: ' + uvIndexNumber;
                    // changing background color based on index returned from api
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

// function for getting five day weather forcast from the api
function fiveDayAPICall(cityInput) {
    var fiveDayAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=' + appkey + '&units=' + unit;

    fetch(fiveDayAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var data = data;
            var arrayList = data.list;

            // running a for each loop in order to get the data for each day that is returned from the data.list array
            arrayList.forEach((dayObject) => {
                var noon = dayObject.dt_txt.includes('12:00:00');
                // filtering out everything other than a day that is for noon
                if (noon) {
                    // setting variables to put into the document, creating li element and appending it with the gathered data
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

// clearning out the previous 5 day data if another city is searched for
function clear5Day() {
    var forecast = document.querySelector('.forecast__wrapper');
    forecast.innerHTML = '';
}

// creating an empty array to put the cities the user searches for in
var citiesList = [];

// the Ul to append with city list
var citiesListUl = document.querySelector('#citiesList');

// onclick event for adding to the city list
$("#searchBtn").on("click", function () {
    event.preventDefault();
    // capture the value in citySearched and trim it to get rid of white spaces
    var cityInput = $('#citySearched').val().toUpperCase().trim();

    // IF value of cityInput is not equal to "" then create an Li element, add a classs, add the city input and append it to the ul
    if (cityInput !== "") {
        console.log('city button working');
        citiesListUl.innerHTML = ' ';
        // pushing the cities onto the cities list array
        citiesList.push(cityInput);
        // adding the cities array to local storage
        localStorage.setItem('citiesList', JSON.stringify(citiesList));

        // for every city in the array create an li and append to the ul
        citiesList.forEach((city) => {
            var li = document.createElement('li');
            li.classList.add('cityList__item');
            li.innerHTML = city;
            citiesListUl.appendChild(li);
        });

        // when a city is clicked for, clear the 5 day forecast from before
        clear5Day();

        // pass the city the user put into the api to get data for that city
        apiCall(cityInput);
    }
});

// on page load get the cities from local storage and put them in li and append to ul
function onPageLoad() {

    var storedItems = localStorage.getItem('citiesList');

    // take the stored item string and turn it into an array
    var storedItemsArr = storedItems.split(',');

    storedItemsArr.forEach((city) => {
        var citiesListUl = document.querySelector('#citiesList');
        var li = document.createElement('li');
        li.classList.add('cityList__item');
        li.innerHTML = city;
        citiesListUl.appendChild(li);
    });
};

onPageLoad();
