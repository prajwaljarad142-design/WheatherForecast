const HistoryList = ({ history, onSelectCity }) => {
  return (
    <section className="panel history-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Recent Searches</p>
          <h3>Saved in MongoDB</h3>
        </div>
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty-text">No recent searches yet.</p>
        ) : (
          history.map((item) => (
            <button
              type="button"
              className="history-item"
              key={`${item._id}-${item.searchedAt}`}
              onClick={() => onSelectCity(item.city)}
            >
              <div>
                <strong>
                  {item.city}, {item.country}
                </strong>
                <p>{item.snapshot?.condition || "Weather snapshot unavailable"}</p>
              </div>
              <span>{new Date(item.searchedAt).toLocaleDateString()}</span>
            </button>
          ))
        )}
      </div>
    </section>
  );
};

export default HistoryList;
