import { Sun, Cloud, CloudRain, CloudSun } from "lucide-react";
import { useWeatherContext } from "./../context/WeatherProvider";
import styles from "../styles/Weather.module.css";

const getWeatherIcon = (type) => {
  const normalizedType = String(type || "").toLowerCase();
  switch (normalizedType) {
    case "sunny":
      return <Sun size={32} />;
    case "rainy":
      return <CloudRain size={32} />;
    case "cloudy":
      return <Cloud size={32} />;
    case "partly cloudy":
      return <CloudSun size={32} />;
    default:
      return <CloudSun size={32} />;
  }
};

export const WeatherDisplay = () => {
  const { weatherData, unit, currentTime } = useWeatherContext();

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.cityInfo}>
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p>WEATHER</p>
        </div>
        <div className={styles.dateTime}>
          <p>{formatDate(cityTime)}</p>
          <p>{formatTime(cityTime)}</p>
        </div>
      </div>

      <div className={styles.currentWeather}>
        <div className={styles.temperature}>
          <span>{convertTemp(weatherData.current.temperature)}</span>
          <span>°</span>
        </div>
        <div>{getWeatherIcon(weatherData.current.condition)}</div>
      </div>

      <div className={styles.forecast}>
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
