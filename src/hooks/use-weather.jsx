import { useQuery } from "@tanstack/react-query";
// import { weatherAPI } from "@/api/weather";
import { getCurrentWeather,getForecast,reverseGeocode,searchLocations    } from "@/api/weather";
const WEATHER_KEYS = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query) => ["location-search", query],
};

export function useWeatherQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? getCurrentWeather(coordinates) : null),
    enabled: Boolean(coordinates),
  });
}

export function useForecastQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? getForecast(coordinates) : null),
    enabled: Boolean(coordinates),
  });
}

export function useReverseGeocodeQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? reverseGeocode(coordinates) : null),
    enabled: Boolean(coordinates),
  });
}

export function useLocationSearch(query) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => searchLocations(query),
    enabled: query.length >= 3,
  });
}