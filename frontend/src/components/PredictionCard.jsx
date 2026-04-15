const PredictionCard = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <section className="panel prediction-card">
      <p className="eyebrow">Prediction Insight</p>
      <h3>{prediction.summary}</h3>
      <div className="prediction-grid">
        <div>
          <span>Temperature change</span>
          <strong>{prediction.temperatureChange}°C</strong>
        </div>
        <div>
          <span>Rainfall change</span>
          <strong>{prediction.rainfallChange} mm</strong>
        </div>
        <div>
          <span>Trend</span>
          <strong>{prediction.trend}</strong>
        </div>
        <div>
          <span>Rain outlook</span>
          <strong>{prediction.rainTrend}</strong>
        </div>
      </div>
    </section>
  );
};

export default PredictionCard;
