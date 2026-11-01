// Define interfaces for the OpenWeatherMap API response
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WindData {
  speed: number;
  deg: number;
}

interface WeatherApiResponse {
  name: string;
  main: MainWeatherData;
  weather: Weather[];
  wind: WindData;
}

const APIkey: string = "ac85a9566b2043b8a199e2ad01a80c44";
const API_URL: string = "https://api.openweathermap.org/data/2.5/weather?units=metrics&q=";

// Cast DOM selections to their specific HTML element types
const searchBox = document.querySelector<HTMLInputElement>(".search input");
const searchBnt = document.querySelector<HTMLButtonElement>(".search button");
const weatherIcon = document.querySelector<HTMLImageElement>(".weather-icon");

async function checkWeather(city: string): Promise<void> {
  const response: Response = await fetch(`${API_URL}${city}&appid=${APIkey}`);

  const errorElement = document.querySelector<HTMLElement>(".error");
  const weatherElement = document.querySelector<HTMLElement>(".weather");

  if (response.status === 404) {
    if (errorElement) errorElement.style.display = "block";
    if (weatherElement) weatherElement.style.display = "none";
  } else {
    if (errorElement) errorElement.style.display = "none";

    const data: WeatherApiResponse = await response.json();
    console.log(data);

    const cityElement = document.querySelector<HTMLElement>(".city");
    const tempElement = document.querySelector<HTMLElement>(".temp");
    const humidityElement = document.querySelector<HTMLElement>(".humidity");
    const windElement = document.querySelector<HTMLElement>(".wind");

    if (cityElement) cityElement.innerHTML = data.name;
    if (tempElement) tempElement.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
    if (humidityElement) humidityElement.innerHTML = `${data.main.humidity}%`;
    if (windElement) windElement.innerHTML = `${data.wind.speed} km/hr`;

    const climate: string = data.weather[0].main;
    console.log(`${city} ${climate}`);

    if (weatherIcon) {
      switch (climate) {
        case "Clouds":
          weatherIcon.src = "images/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "images/rain.png";
          break;
        case "Mist":
          weatherIcon.src = "images/mist.png";
          break;
        case "Snow":
          weatherIcon.src = "images/snow.png";
          break;
      }
    }

    if (weatherElement) weatherElement.style.display = "block";
  }
}

searchBnt?.addEventListener("click", () => {
  if (searchBox?.value) {
    checkWeather(searchBox.value);
  }
});