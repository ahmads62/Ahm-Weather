function initPage() {
    const inputEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");4
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    var cityID = 0;
    console.log(searchHistory);
    
    const CityAPIUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const APIKey = "1b4085f96eee8cefd5a56ef078d23bc1";
//  When search button is clicked, read the city name typed by the user

async function fetchWeatherData(cityName) {
    const res = await fetch(CityAPIUrl + cityName + "&appid=" + APIKey);
    const data = await res.json();
    console.log(data);
    showWeather(data)
}

function showWeather(city){
    const currentDate = new Date(city.dt*1000);
    console.log(currentDate);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    nameEl.innerHTML = city.name + " (" + month + "/" + day + "/" + year + ") ";
    let weatherPic = city.weather[0].icon;
    currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    currentPicEl.setAttribute("alt",city.weather[0].description);
    currentTempEl.innerHTML = "Temperature: " + Math.floor(((city.main.temp)-273.15)*1.8+32) + " &#176F";

    currentHumidityEl.innerHTML = "Humidity: " + city.main.humidity + "%";
    currentWindEl.innerHTML = "Wind Speed: " + city.wind.speed + " MPH";
    var lat = city.coord.lat;
    var lon = city.coord.lon;
    cityID=city.id;
    fetchUV(lat,lon);
}

async function fetchUV(...latlon){
    const res = await fetch("https://api.openweathermap.org/data/2.5/uvi/forecast?" + "lat=" + latlon[0] + "&lon=" + latlon[1] + "&appid=" + APIKey + "&cnt=1");
    const data = await res.json();
    console.log(data);
    showUV(data)
}


function showUV(cityUv){
    var UVIndex = document.createElement("span");
    UVIndex.setAttribute("class","badge badge-danger");
    UVIndex.innerHTML = cityUv[0].value;
    currentUVEl.innerHTML = "UV Index: ";
    currentUVEl.append(UVIndex);
    fetchFiveDays();
}

async function fetchFiveDays(){
    const res = await fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey);
    const data = await res.json();
    showFiveDays(data);
}

function showFiveDays(city){
    const forecastEls = document.querySelectorAll(".forecast");
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    for (i=0; i<forecastEls.length; i++) {
        forecastEls[i].innerHTML = "";
        const forecastIndex = i*8 + 4;
        const forecastDate = new Date(city.list[forecastIndex].dt * 1000);
        const forecastDay = forecastDate.getDate();
        const forecastMonth = forecastDate.getMonth() + 1;
        const forecastYear = forecastDate.getFullYear();
        const forecastDateEl = document.createElement("p");
        const forecastDayEl = document.createElement("p");
        var day = forecastDate.getDay();
        var dayName = days[day];

        forecastDayEl.setAttribute("class","dayname");
        forecastDayEl.innerHTML = dayName;
        forecastEls[i].append(forecastDayEl);

        forecastDateEl.setAttribute("class","forecast-date");
        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
        forecastEls[i].append(forecastDateEl);

        const forecastWeatherEl = document.createElement("img");
        forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + city.list[forecastIndex].weather[0].icon + "@2x.png");
        forecastWeatherEl.setAttribute("alt",city.list[forecastIndex].weather[0].description);
        forecastWeatherEl.setAttribute("class", "forecast-img");
        forecastEls[i].append(forecastWeatherEl);

        const forecastTempEl = document.createElement("p");
        forecastTempEl.setAttribute("class","temp");
        forecastTempEl.innerHTML = "Temp: " + Math.floor(((city.list[forecastIndex].main.temp)-273.15)*1.8+32) + " &#176F";
        forecastEls[i].append(forecastTempEl);

        const forecastHumidityEl = document.createElement("p");
        forecastHumidityEl.setAttribute("class","humidity");
        forecastHumidityEl.innerHTML = "Humidity: " + city.list[forecastIndex].main.humidity + "%";
        forecastEls[i].append(forecastHumidityEl);
    }
}


searchEl.addEventListener("click",function() {
    document.getElementById("city-name").required = true;
    var cityName = inputEl.value.trim();
    var errMsgEl = document.getElementById("err");
    if (cityName !== ""){
       /*getWeather(cityName);*/
       fetchWeatherData(cityName);
       searchHistory.push(cityName);
       localStorage.setItem("search",JSON.stringify(searchHistory));
       renderSearchHistory();
    }
    else {
        errMsgEl.removeAttribute("class");
        errMsgEl.innerHTML = "Please Enter City";
    }
})

clearEl.addEventListener("click",function() {
        localStorage.removeItem("search");
        window.location.reload();
})


    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                fetchWeatherData(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        fetchWeatherData(searchHistory[searchHistory.length - 1]);
    }


//  Save user's search requests and display them underneath search form
//  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for

}
initPage();