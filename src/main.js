

import './style.css';

const apiKey = "7ec4f875154647f78bf82341251009";
const apiUrl = "https://api.weatherapi.com/v1/current.json?q=";

// DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); 



function getWeatherIcon(conditionCode) {
  if (conditionCode === 1000) return "sunny1.png";                     
  if (conditionCode === 1003) return "partly_cloudy.png";         
  if (conditionCode === 1006) return "cloudy.png";                   
  if (conditionCode === 1009) return "overcast.png";                 
  if ([1030, 1135, 1147].includes(conditionCode)) return "mist.png"; 
  if (conditionCode >= 1063 && conditionCode <= 1087) return "rain.png"; 
  if (conditionCode >= 1150 && conditionCode <= 1201) return "heavy_rain.png";
  if (conditionCode >= 1210 && conditionCode <= 1237) return "snow.png"; 
   if ([1273, 1276, 1279, 1282].includes(conditionCode)) return "thunder.png";

  return "w.png"; // Default icon
}

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&key=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log(data);

    // Update weather details
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";


    const iconFile = getWeatherIcon(data.current.condition.code);
    weatherIcon.src = `/images/${iconFile}`;
    weatherIcon.alt = data.current.condition.text;

  } catch (error) {
    alert(error.message || "Something went wrong");
  }
}

// Handle click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

// Handle Enter key
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
  }
});
