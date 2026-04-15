import { WeatherSearch } from "../models/WeatherSearch.js";
import { getForecastByCity } from "../services/weatherService.js";

export const fetchForecast = async (req, res) => {
  try {
    const city = req.query.city?.trim();

    if (!city) {
      return res.status(400).json({ message: "City query parameter is required." });
    }

    const forecast = await getForecastByCity(city);

    await WeatherSearch.create({
      city: forecast.location.city,
      country: forecast.location.country,
      latitude: forecast.location.latitude,
      longitude: forecast.location.longitude,
      snapshot: {
        currentTemp: forecast.current.temperature,
        condition: forecast.current.condition,
        windSpeed: forecast.current.windSpeed,
        humidity: forecast.current.humidity,
      },
    });

    return res.status(200).json(forecast);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Unable to fetch forecast right now.",
    });
  }
};

export const getSearchHistory = async (_req, res) => {
  try {
    const history = await WeatherSearch.find()
      .sort({ searchedAt: -1 })
      .limit(8)
      .select("city country searchedAt snapshot");

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch search history.",
    });
  }
};
