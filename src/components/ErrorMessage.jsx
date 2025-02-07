import { AlertCircle } from "lucide-react";
import { useWeatherContext } from "./../context/WeatherProvider";
import styles from "../styles/ErrorMessage.module.css";

export const ErrorMessage = () => {
  const { error } = useWeatherContext();

  if (!error) return null;

  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorContent}>
        <AlertCircle size={20} />
        <span>
          {error.message || "Something went wrong. Please try again."}
        </span>
      </div>
    </div>
  );
};
