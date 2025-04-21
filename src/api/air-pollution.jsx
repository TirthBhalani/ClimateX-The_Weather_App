// src/api/air-pollution.js
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getAirPollutionHistorical(coordinates) {
  const start = Math.floor(Date.now() / 1000) - 604800; // 7 days ago
  const end = Math.floor(Date.now() / 1000); // now
  
  const response = await fetch(
    `${BASE_URL}/air_pollution/history?lat=${coordinates.lat}&lon=${coordinates.lon}&start=${start}&end=${end}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch historical air pollution data");
  }
  
  return response.json();
}

export async function getAirPollutionForecast(coordinates) {
  const response = await fetch(
    `${BASE_URL}/air_pollution/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch air pollution forecast data");
  }
  
  return response.json();
}

export async function getCurrentAirPollution(coordinates) {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch current air pollution data");
  }
  
  return response.json();
}