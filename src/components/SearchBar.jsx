import { useState } from "react";
import { Search } from "lucide-react";
import { useWeatherContext } from "../context/WeatherProvider";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const { setCity } = useWeatherContext();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setCity(trimmedInput);
      setInput("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city..."
        />
        <button className={styles.button} type="submit">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};
