import React from "react";
import { AlertCircle } from "lucide-react";
import { useWeatherContext } from "./../context/WeatherProvider";

export const ErrorMessage = () => {
  const { error } = useWeatherContext();

  if (!error) return null;

  return (
    <div role="alert">
      <div>
        <AlertCircle size={20} />
        <span>
          {error.message || "Something went wrong. Please try again."}
        </span>
      </div>
    </div>
  );
};
