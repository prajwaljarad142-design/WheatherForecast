const CurrentWeatherCard = ({ forecast }) => {
  if (!forecast) return null;

  const { location, current } = forecast;

  return (
    <section className="panel current-card">
      <div>
        <p className="eyebrow">Current Weather</p>
        <h2>
          {location.city}, {location.country}
        </h2>
        <p className="condition">{current.condition}</p>
      </div>

      <div className="current-stats">
        <div>
          <span>Temperature</span>
          <strong>{current.temperature}°C</strong>
        </div>
        <div>
          <span>Feels like</span>
          <strong>{current.feelsLike}°C</strong>
        </div>
        <div>
          <span>Humidity</span>
          <strong>{current.humidity}%</strong>
        </div>
        <div>
          <span>Wind speed</span>
          <strong>{current.windSpeed} km/h</strong>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeatherCard;
