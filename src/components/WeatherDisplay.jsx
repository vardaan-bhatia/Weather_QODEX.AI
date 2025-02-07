import { useState } from "react";
import { Sun, Cloud, CloudRain, CloudSun } from "lucide-react";
import { useWeatherContext } from "../context/WeatherProvider";
import styles from "../styles/Weather.module.css";

const getWeatherIcon = (type) => {
  const normalizedType = String(type || "").toLowerCase();
  switch (normalizedType) {
    case "sunny":
      return <Sun size={48} />;
    case "rainy":
      return <CloudRain size={48} />;
    case "cloudy":
      return <Cloud size={48} />;
    case "partly cloudy":
      return <CloudSun size={48} />;
    default:
      return <CloudSun size={48} />;
  }
};

export const WeatherDisplay = () => {
  const { weatherData, currentTime } = useWeatherContext();
  const [unit, setUnit] = useState("celsius");

  if (!weatherData?.current || !currentTime) return null;

  const convertTemp = (temp) => {
    return unit === "fahrenheit"
      ? ((temp * 9) / 5 + 32).toFixed(0)
      : temp.toFixed(0);
  };

  const cityTime = new Date(currentTime);

  const formatDate = (date) => {
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      date
    );
    const dayOfMonth = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][
      dayOfMonth % 10 > 3 || Math.floor(dayOfMonth / 10) === 1
        ? 0
        : dayOfMonth % 10
    ];
    return `${day} ${dayOfMonth}${suffix}`;
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const getGreetingMessage = () => {
    const hours = cityTime.getHours();
    if (hours >= 5 && hours < 12) return "Good Morning! ☀️";
    if (hours >= 12 && hours < 17) return "Good Afternoon! 🌤️";
    if (hours >= 17 && hours < 20) return "Good Evening! 🌆";
    return "Good Night! 🌙";
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <h3 className={styles.greeting}>{getGreetingMessage()}</h3>
        <div className={styles.temperatureSection}>
          <div className={styles.temperature}>
            {convertTemp(weatherData.current.temperature)}°
            {unit === "celsius" ? "C" : "F"}
          </div>
          <div className={styles.weatherIcon}>
            {getWeatherIcon(weatherData.current.condition)}
          </div>
        </div>
        <div className={styles.cityDetails}>
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p>
            {formatDate(cityTime)}, {formatTime(cityTime)}
          </p>
        </div>
      </div>
      <button
        className={styles.toggleButton}
        onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
      >
        Switch to {unit === "celsius" ? "Fahrenheit" : "Celsius"}
      </button>
      <div className={styles.forecastSection}>
        {weatherData.forecast.map((day, index) => (
          <div key={index} className={styles.forecastDay}>
            <p>{day.day}</p>
            {getWeatherIcon(day.icon)}
            <p>{convertTemp(day.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};
