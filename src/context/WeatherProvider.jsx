import React, { createContext, useContext, useState, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";

const WeatherContext = createContext(undefined);

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(
    () => localStorage.getItem("lastCity") || "London"
  );
  const [unit, setUnit] = useState("celsius");

  const { weatherData, error, isLoading, currentTime } = useWeather(city);

  useEffect(() => {
    localStorage.setItem("lastCity", city);
  }, [city]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        error,
        isLoading,
        city,
        setCity,
        unit,
        toggleUnit,
        currentTime,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
