import { WeatherProvider } from "./context/WeatherProvider";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { ErrorMessage } from "./components/ErrorMessage";
import { SearchBar } from "./components/SearchBar";
import styles from "./styles/app.module.css";

const App = () => {
  return (
    <WeatherProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <SearchBar />
          <WeatherDisplay />
          <ErrorMessage />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
