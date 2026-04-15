const SearchBar = ({ city, setCity, onSearch, loading }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city like London, Delhi, or New York"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Get Forecast"}
      </button>
    </form>
  );
};

export default SearchBar;
