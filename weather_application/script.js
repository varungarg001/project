document.addEventListener("DOMContentLoaded", function () {
  let city = document.getElementById("input-city");
  let getweatherbtn = document.getElementById("input-btn");
  let weatherinfo = document.getElementById("result");
  let cityname = document.getElementById("city-name");
  let citytemperature = document.getElementById("city-temperature");
  let temperaturetype = document.getElementById("temperature-type");
  let errormessage = document.getElementById("error-message");
  const API_KEY = "ac04d5ff0abe9540072a062b4b0f9d1a";

  city.addEventListener("click", function (e) {
    cityname.classList.add("hidden");
    citytemperature.classList.add("hidden");
    temperaturetype.classList.add("hidden");
    errormessage.classList.add("hidden");
  });

  getweatherbtn.addEventListener("click", async function (e) {
    const cityname = city.value.trim();
    city.value = "";
    if (!cityname) return;
    // it may throw an error
    // server/database always in another continent
    try {
      const weatherdata = await fetchWeatherData(cityname);
      DisplayWeatherData(weatherdata);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(cityname) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    // console.log(typeof response);
    // console.log(response);
    if (!response.ok) {
      showError();
    }
    const data = await response.json();
    return data;
  }
  function DisplayWeatherData(data) {
    // unlock display
    console.log(data);
    const { name, main, weather } = data;
    cityname.textContent = name;
    citytemperature.textContent = `Temperature: ${main.temp}°C`;
    temperaturetype.textContent = `Overcast:${weather[0].description}`;
    cityname.classList.remove("hidden");
    citytemperature.classList.remove("hidden");
    temperaturetype.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }
  function showError() {
    weatherinfo.classList.add("hidden");
    errormessage.classList.remove("hidden");
  }
});
