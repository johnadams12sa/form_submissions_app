let appID = config.MY_KEY;
let units = "imperial";
let searchMethod;

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})

function onStartUpContainer(){
    let searchTerm = 'Elmhurst';
    searchWeather(searchTerm);
}

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&units=${units}&appid=${appID}`)
        .then(results => {
            return results.json();
        }).then(result => {
            init(result);
            })
}

function init(resultFromAPICall){
    switch(resultFromAPICall.weather[0].main){
        case 'Clear':
            /* do something here to display */
            break;
        case 'Clouds':
            /* do something here to display */
            break;
        case 'Rain':
            /* do something here to display */
            break;
        case 'Drizzle':
            /* do something here to display */
            break;
        case 'Mist':
            /* do something here to display */
            break;
        case 'Thunderstorm':
            /* do something here to display */
            break;
        case 'Snow':
            /* do something here to display */
            break;
        default:

    }

    let weatherDescriptionHeader=document.getElementById('weatherDescriptionHeader');
    let temperatureElement=document.getElementById('temperature');
    let temperatureElementRange=document.getElementById('temperature_range');
    let humidityElement=document.getElementById('humidity');
    let windSpeedElement=document.getElementById('windSpeed');
    let cityHeader=document.getElementById('cityHeader');
    let weatherIcon=document.getElementById('documentIconImg');

    weatherIcon.src ='http://openweathermap.org/img/wn/' + resultFromAPICall.weather[0].icon + '.png';

    let resultDescription = resultFromAPICall.weather[0].description;
    weatherDescriptionHeader.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromAPICall.main.temp) + '&#176';
    temperatureElement.style.fontSize= "40px";
    temperatureElementRange.innerHTML = 'High ' + Math.floor(resultFromAPICall.main.temp_max) + '&#176' + '<br/>' + 
    'Low ' + Math.floor(resultFromAPICall.main.temp_min) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromAPICall.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromAPICall.name + ', ' + resultFromAPICall.sys.country;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromAPICall.main.humidity + '%';

    /*setPositionForWeatherInfo();*/
}

/*function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left =`calc(50% -${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = 'visible';
}*/

window.onload = onStartUpContainer();
