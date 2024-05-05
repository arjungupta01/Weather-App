const apiKey = "1c015a5786168bb971c9e84e35c8b0ce";
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${url}${city}&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "images/clouds.png";
          break;
        case "Clear ":
          weatherIcon.src = "images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "images/rain.png";
          break;
        case "Haze":
          weatherIcon.src = "images/haze.png";
          break;
        case "Drizzle":
          weatherIcon.src = "images/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "images/mist.png";
          break;
        case "Snow":
          weatherIcon.src = "images/snow.png";
          break;
        default:
          weatherIcon.src = "";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});