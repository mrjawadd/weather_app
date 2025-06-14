// ✅ Your OpenWeatherMap API key
const API_KEY = "c6e2ea6e46bd1345f81ba1cbfbc34de8";

// ✅ DOM Elements
const form        = document.getElementById("weather-form");
const cityInput   = document.getElementById("city-input");
const section     = document.getElementById("result");
const cityNameEl  = document.getElementById("city-name");
const tempEl      = document.getElementById("temp");
const descEl      = document.getElementById("description");
const extraEl     = document.getElementById("extra");
const iconEl      = document.getElementById("icon");

// ✅ Weather Fetch Logic
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
  
    // Show loader
    document.getElementById("loader").hidden = false;
    section.hidden = true;
  
    try {
      const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}` +
        `&units=metric&appid=${API_KEY}`;
  
      const res = await fetch(url);
      const data = await res.json();
  
      const iconCode = data.weather[0].icon;
      iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      iconEl.alt = data.weather[0].description;
  
      cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
      tempEl.textContent     = `Temperature: ${Math.round(data.main.temp)}°C`;
      descEl.textContent     = `Condition: ${data.weather[0].description.replace(/\b\w/g, ch => ch.toUpperCase())}`;
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit'
          });
          const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit'
          });
          extraEl.innerHTML =
  `🌡️ Feels like: ${Math.round(data.main.feels_like)}°C<br>` +
  `💧 Humidity: ${data.main.humidity}%<br>` +
  `💨 Wind speed: ${data.wind.speed} m/s<br>` +
  `☁️ Cloud cover: ${data.clouds.all}%<br>` +
  `🔽 Pressure: ${data.main.pressure} hPa<br>` +
  `🌅 Sunrise: ${sunrise}<br>` +
  `🌇 Sunset: ${sunset}`;

          
  
      // Show result with animation
section.hidden = false;
section.classList.remove("fade-in"); // reset previous
void section.offsetWidth;            // trigger reflow
section.classList.add("fade-in");

      // Get main weather condition (like "Clear", "Rain", "Snow", etc.)
const condition = data.weather[0].main.toLowerCase();

// Remove old weather class from body
document.body.className = document.body.className
  .split(' ')
  .filter(cls => !["clear", "clouds", "rain", "snow", "mist", "thunderstorm", "drizzle"].includes(cls))
  .join(' ');

// Add new weather condition class
document.body.classList.add(condition);

    } catch (err) {
      alert("Error: " + err.message);
    }
  
    // Hide loader
    document.getElementById("loader").hidden = true;
    form.reset();
  });
  

// ✅ Dark Mode Toggle Logic
const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Update button icon/text
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});
