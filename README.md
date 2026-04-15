# Weather Forecast Prediction Project

A MERN stack mini project for students who need a clean and presentable submission using:

- MongoDB
- Express.js
- React
- Node.js

This project avoids Java, PHP, Firebase, Supabase, and other backend-as-a-service platforms.

## Project Features

- Search weather forecast by city
- View current weather details
- View 7-day forecast
- Show a simple next-day prediction insight
- Save recent searches in MongoDB
- Clean React UI with CSS styling

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose

### External API

- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Project Structure

```text
WheatherForecast/
  backend/
  frontend/
  README.md
```

## Backend Setup

1. Open terminal inside `backend`
2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`
4. Update MongoDB connection string if needed
5. Start backend server:

```bash
npm run dev
```

## Frontend Setup

1. Open another terminal inside `frontend`
2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`
4. Start frontend:

```bash
npm run dev
```

## Default Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/weather_forecast_db
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Suggested MongoDB Collection

- `weathersearches`

## Suggested GitHub Commit Flow

Commit your work regularly instead of uploading everything once. A simple flow could be:

```bash
git init
git add .
git commit -m "Initial MERN weather forecast project setup"
git commit -m "Add backend weather forecast API and MongoDB history"
git commit -m "Build React dashboard UI for weather prediction"
git commit -m "Update styling and project documentation"
```

## Suggested Viva / Project Explanation

You can explain this project as:

> This is a MERN stack weather forecast prediction project. The frontend is built using React and CSS. The backend is developed using Node.js and Express.js, and MongoDB is used to store recent search history. Weather data is fetched from the Open-Meteo API, and the application also generates a simple next-day weather prediction summary based on forecast trends.

## Future Improvements

- Add user login and personal saved cities
- Add charts for temperature and rainfall
- Add filter by state/country
- Add dark mode
