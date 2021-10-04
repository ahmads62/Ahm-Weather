# Ahm-Weather-Dashboard
Challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.Use the OpenWeather One Call API (Links to an external site.) to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use localStorage to store any persistent data.

## User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


## Acceptance Criteria
*   GIVEN a weather dashboard with form inputs
    *   WHEN I search for a city
        *   THEN I am presented with current and future conditions for that city and that city is added to the search history
    *   WHEN I view current weather conditions for that city
        *   THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    *   WHEN I view the UV index
        *   THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    *   WHEN I view future weather conditions for that city
        *   THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    *   WHEN I click on a city in the search history
        *   THEN I am again presented with current and future conditions for that city


### Tasks Accomplished to achieve the acceptance criteria 
*   1 Added async call to fetch weather data 
*   2 Dynamically added HTML and CSS to show weather data
*   3 once city weather data is fetched city is saved and it will persist
*   4 click on the saves city will fetch and display weather

### Desktop Screen Images
Weather Page
![Header-Nav](./assets/images/weather.jpg?raw=true "Ahm-Weather")

### Links
* Code Repository Link  (https://github.com/ahmads62/Ahm-Weather)
* Deployed Website Link (https://ahmads62.github.io/Ahm-Weather/index.html)

## Installation
Upload index.html, and assets folder, assets folder contains images and CSS files.
