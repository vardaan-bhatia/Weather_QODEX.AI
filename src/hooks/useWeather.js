import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch weather data.");
  }
};

export const useWeather = (city) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

  if (!API_KEY || !BASE_URL) {
    console.error("Missing API key or base URL in environment variables.");
    return {
      weatherData: null,
      error: "Missing API configuration",
      isLoading: false,
      currentTime: null,
    };
  }

  const { data, error, isLoading } = useSWR(
    city
      ? `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
      : null,
    fetcher,
    {
      refreshInterval: 30 * 60 * 1000,
      revalidateOnFocus: true,
      shouldRetryOnError: false, // Prevent infinite retries on invalid city names
    }
  );

  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (data?.location?.localtime) {
      setCurrentTime(data.location.localtime);
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (data?.location?.localtime) {
        setCurrentTime(data.location.localtime);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [data]);

  // Handle API errors (e.g., invalid city name)
  if (error) {
    console.error("Weather API Error:", error.message);
    return {
      weatherData: null,
      error: error.message || "Could not fetch weather data",
      isLoading,
      currentTime: null,
    };
  }

  if (!data)
    return { weatherData: null, currentTime: null, error: null, isLoading };

  // Ensure required data exists before accessing it
  if (!data.location || !data.current || !data.forecast) {
    return {
      weatherData: null,
      error: "Invalid response from weather API",
      isLoading: false,
      currentTime: null,
    };
  }

  const weatherData = {
    location: {
      name: data.location.name,
      country: data.location.country,
      latitude: data.location.lat,
      longitude: data.location.lon,
    },
    current: {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      windSpeed: `${data.current.wind_kph} mph`,
    },
    forecast: data.forecast.forecastday.slice(1, 7).map((day) => ({
      day: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
      temp: day.day.maxtemp_c,
      icon: day.day.condition.text,
    })),
  };

  return { weatherData, currentTime, error: null, isLoading };
};
