const weatherForm = document.querySelector(".weatherForm");
const weatherInput = document.querySelector(".input");
const card = document.querySelector(".card");
const apiKey = import.meta.env.VITE_API_KEY;

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = weatherInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data; 

  card.textContent = "";
  card.style.display = "flex";

  const cityName = document.createElement("h1");
  const temper = document.createElement("p");
  const desc = document.createElement("p");
  const emoji = document.createElement("h1");

  cityName.textContent = city;
  temper.textContent = `${(temp - 273.15).toFixed(1)}C`;
  desc.textContent = description;
  emoji.textContent = getWeatherEmoji(id);

  cityName.classList.add("cityName");
  temper.classList.add("temp");
  desc.classList.add("desc");
  emoji.classList.add("emoji");

  card.appendChild(cityName);
  card.appendChild(temper);
  card.appendChild(desc);
  card.appendChild(emoji);
}

function getWeatherEmoji(weatherId) {

  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
      return "🌩";
    case (weatherId >= 300 && weatherId < 400):
      return "🌧";
    case (weatherId >= 500 && weatherId < 600):
      return "🌧";
    case (weatherId >= 600 && weatherId < 700):
      return "❄";
    case (weatherId >= 700 && weatherId < 800):
      return "🌫";
    case (weatherId === 800):
      return "☀";
    case (weatherId >= 801 && weatherId < 810):
      return "☁";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
