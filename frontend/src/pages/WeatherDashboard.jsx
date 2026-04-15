import { useEffect, useState } from "react";
import { getForecast, getHistory } from "../api/weatherApi";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import ForecastList from "../components/ForecastList";
import HistoryList from "../components/HistoryList";
import PredictionCard from "../components/PredictionCard";
import SearchBar from "../components/SearchBar";

const WeatherDashboard = () => {
  const [city, setCity] = useState("Indianapolis");
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
    } catch (historyError) {
      console.error(historyError);
    }
  };

  const handleSearch = async (nextCity = city) => {
    if (!nextCity.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const forecastData = await getForecast(nextCity);
      setForecast(forecastData);
      setCity(forecastData.location.city);
      await loadHistory();
    } catch (forecastError) {
      setError(forecastError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("Indianapolis");
  }, []);

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MERN Stack Project</p>
          <h1>Weather Forecast Prediction Dashboard</h1>
          <p>
            React frontend, Express API, MongoDB history storage, and a clean interface
            for searching live weather trends.
          </p>
        </div>
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} loading={loading} />
      </section>

      {error ? <p className="error-banner">{error}</p> : null}

      <div className="dashboard-grid">
        <div className="main-column">
          <CurrentWeatherCard forecast={forecast} />
          <PredictionCard prediction={forecast?.prediction} />
          <ForecastList daily={forecast?.daily} />
        </div>

        <aside className="side-column">
          <HistoryList history={history} onSelectCity={handleSearch} />
        </aside>
      </div>
    </main>
  );
};

export default WeatherDashboard;
