import mongoose from "mongoose";

const weatherSearchSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      default: "",
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    searchedAt: {
      type: Date,
      default: Date.now,
    },
    snapshot: {
      currentTemp: Number,
      condition: String,
      windSpeed: Number,
      humidity: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const WeatherSearch = mongoose.model("WeatherSearch", weatherSearchSchema);
