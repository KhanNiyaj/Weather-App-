

import './style.css';


export const cities = [
  "Aachen", "Aalborg", "Abidjan", "Abu Dhabi", "Accra", "Addis Ababa", "Ahmedabad", "Ajmer", "Akureyri",
  "Al Ain", "Algiers", "Allahabad", "Almaty", "Amman", "Amsterdam", "Ankara", "Antananarivo",
  "Antwerp", "Apia", "Arequipa", "Asunción", "Athens", "Atlanta", "Auckland", "Aurangabad",
  "Baghdad", "Baku", "Bamako", "Bandung", "Bangkok", "Barcelona", "Beijing", "Beirut",
  "Belgrade", "Bengaluru", "Berlin", "Bern", "Bilbao", "Birmingham", "Bogotá", "Boston",
  "Brasília", "Bratislava", "Brazzaville", "Brisbane", "Brussels", "Bucharest", "Budapest", "Buenos Aires",
  "Cairo", "Calgary", "Canberra", "Cape Town", "Caracas", "Cardiff", "Casablanca", "Chandigarh",
  "Chennai", "Chicago", "Colombo", "Copenhagen", "Curitiba", "Dallas", "Damascus", "Dakar", "Delhi",
  "Dhaka", "Doha", "Dubai", "Dublin", "Durban", "Edinburgh", "Faisalabad", "Florence", "Frankfurt",
  "Freetown", "Fukuoka", "Funchal", "Gaborone", "Geneva", "Genoa", "Gothenburg", "Guangzhou",
  "Guatemala City", "Hague", "Hamburg", "Hanoi", "Harare", "Havana", "Helsinki", "Ho Chi Minh City",
  "Hong Kong", "Houston", "Hyderabad", "Ibadan", "Islamabad", "Istanbul", "Jakarta", "Jeddah", "Jerusalem",
  "Johannesburg", "Kampala", "Karachi", "Kathmandu", "Kiev", "Kigali", "Kingston", "Kinshasa", "Kobe",
  "Kolkata", "Kuala Lumpur", "Kuwait City", "Kyoto", "Lagos", "Lahore", "Las Vegas", "Lima", "Lisbon",
  "Ljubljana", "London", "Los Angeles", "Lusaka", "Luxembourg", "Lyon", "Madrid", "Managua",
  "Manama", "Manila", "Maputo", "Marseille", "Melbourne", "Mexico City", "Milan", "Minsk", "Monaco",
  "Montevideo", "Montreal", "Moscow", "Mumbai", "Munich", "Muscat", "Nairobi", "Naples", "New Delhi",
  "New York", "Nice", "Nicosia", "Niamey", "Osaka", "Oslo", "Ottawa", "Ouagadougou", "Palermo",
  "Panama City", "Paris", "Perth", "Philadelphia", "Phnom Penh", "Phoenix", "Podgorica", "Prague",
  "Pretoria", "Quito", "Rabat", "Reykjavik", "Riga", "Rio de Janeiro", "Rome", "Rotterdam",
  "Saint Petersburg", "Salvador", "San Francisco", "San Jose", "San Juan", "San Salvador",
  "Sanaa", "Santiago", "Santo Domingo", "Sao Paulo", "Sarajevo", "Seoul", "Shanghai", "Sharjah",
  "Singapore", "Skopje", "Sofia", "Stockholm", "Strasbourg", "Surabaya", "Suva", "Sydney", "Taipei",
  "Tallinn", "Tashkent", "Tbilisi", "Tehran", "Tel Aviv", "Thimphu", "Tokyo", "Toronto", "Tripoli",
  "Tunis", "Ulaanbaatar", "Valencia", "Valletta", "Vancouver", "Venice", "Vienna", "Vilnius", "Warsaw",
  "Washington D.C.", "Wellington", "Winnipeg", "Yaoundé", "Yerevan", "Zagreb", "Zürich"
];
const cityList = document.getElementById("city-list");

cities.forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  cityList.appendChild(option);
});


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
