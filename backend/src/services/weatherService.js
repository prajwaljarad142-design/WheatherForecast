import { getWeatherLabel } from "../utils/weatherCodes.js";

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather service request failed with status ${response.status}`);
  }

  return response.json();
};

const buildPrediction = (daily) => {
  const todayMax = daily.temperature_2m_max?.[0] ?? 0;
  const tomorrowMax = daily.temperature_2m_max?.[1] ?? todayMax;
  const rainToday = daily.precipitation_sum?.[0] ?? 0;
  const rainTomorrow = daily.precipitation_sum?.[1] ?? rainToday;

  const tempDifference = Number((tomorrowMax - todayMax).toFixed(1));
  const rainfallDifference = Number((rainTomorrow - rainToday).toFixed(1));

  let trend = "stable";
  if (tempDifference >= 2) trend = "warmer";
  if (tempDifference <= -2) trend = "cooler";

  let rainTrend = "similar rainfall";
  if (rainfallDifference > 2) rainTrend = "higher chance of rain";
  if (rainfallDifference < -2) rainTrend = "lower chance of rain";

  return {
    trend,
    rainTrend,
    summary: `Tomorrow is expected to be ${trend} with ${rainTrend}.`,
    temperatureChange: tempDifference,
    rainfallChange: rainfallDifference,
  };
};

export const getForecastByCity = async (city) => {
  const encodedCity = encodeURIComponent(city);
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=1&language=en&format=json`;
  const geoData = await fetchJson(geoUrl);

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Try searching with a clearer city name.");
  }

  const place = geoData.results[0];

  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}` +
    `&longitude=${place.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
    `&timezone=auto&forecast_days=7`;

  const forecastData = await fetchJson(forecastUrl);

  const dailyForecast = forecastData.daily.time.map((date, index) => ({
    date,
    weatherCode: forecastData.daily.weather_code[index],
    condition: getWeatherLabel(forecastData.daily.weather_code[index]),
    maxTemp: forecastData.daily.temperature_2m_max[index],
    minTemp: forecastData.daily.temperature_2m_min[index],
    precipitation: forecastData.daily.precipitation_sum[index],
  }));

  return {
    location: {
      city: place.name,
      state: place.admin1 || "",
      country: place.country || "",
      latitude: place.latitude,
      longitude: place.longitude,
    },
    current: {
      temperature: forecastData.current.temperature_2m,
      humidity: forecastData.current.relative_humidity_2m,
      feelsLike: forecastData.current.apparent_temperature,
      windSpeed: forecastData.current.wind_speed_10m,
      weatherCode: forecastData.current.weather_code,
      condition: getWeatherLabel(forecastData.current.weather_code),
      time: forecastData.current.time,
    },
    daily: dailyForecast,
    prediction: buildPrediction(forecastData.daily),
  };
};
