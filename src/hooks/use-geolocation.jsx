import { useState, useEffect } from "react";

export function useGeolocation() {
  const [locationData, setLocationData] = useState({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationData({
              coordinates: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
              error: null,
              isLoading: false,
            });
          },
          (error) => {
            const errorMessages = {
              1: "Location permission denied. Please enable location access.",
              2: "Location information is unavailable.",
              3: "Location request timed out.",
            };

            setLocationData({
              coordinates: null,
              error: errorMessages[error.code] || "An unknown error occurred.",
              isLoading: false,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else if (result.state === 'denied') {
        setLocationData({
          coordinates: null,
          error: "Location access is blocked. Please enable location access in your browser settings.",
          isLoading: false,
        });
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { ...locationData, getLocation };
}