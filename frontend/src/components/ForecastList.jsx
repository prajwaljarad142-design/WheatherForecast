const ForecastList = ({ daily }) => {
  if (!daily?.length) return null;

  return (
    <section className="panel forecast-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">7-Day Forecast</p>
          <h3>Weekly Weather Overview</h3>
        </div>
      </div>

      <div className="forecast-grid">
        {daily.map((day) => (
          <article className="forecast-item" key={day.date}>
            <p className="forecast-date">{day.date}</p>
            <h4>{day.condition}</h4>
            <p>Max: {day.maxTemp}°C</p>
            <p>Min: {day.minTemp}°C</p>
            <p>Rain: {day.precipitation} mm</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ForecastList;
