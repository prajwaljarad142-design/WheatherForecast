const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const getForecast = async (city) => {
  const response = await fetch(`${API_BASE_URL}/api/weather/forecast?city=${encodeURIComponent(city)}`);
  return handleResponse(response);
};

export const getHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/api/weather/history`);
  return handleResponse(response);
};