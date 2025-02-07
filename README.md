# Weather App

A simple weather application that fetches weather data using SWR and displays it in a user-friendly interface. The app utilizes context and custom hooks for state management and data fetching. Icons are provided by Lucide React.

## Live Demo

[Weather App](https://weather-qodexai.vercel.app/)

## Screenshot

<Image src="/public/image.png" alt="Weather App Screenshot" width={800} height={450} />

## Features

- Search for a city's weather.
- Displays current weather conditions.
- 7-day weather forecast.
- Wind speed details.
- Error handling for failed API requests.
- Supports temperature unit conversion.
- Responsive and styled with CSS modules.

## Approach

- **Used SWR** for efficient data fetching and caching.
- **Implemented Context API** for global state management.
- **Created a custom hook (`useWeather.js`)** to handle API calls and state logic.
- **Structured the project with reusable components** for maintainability.
- **Leveraged CSS Modules** for scoped and modular styling.
- **Used Lucide React** for clean and consistent UI icons.
- **Ensured a fully responsive design** for different screen sizes.

## Usage

1. Enter a city name in the search bar.
2. View the current weather details.
3. Check the **7-day forecast** and **wind speed**.
4. Switch between **Celsius and Fahrenheit**.
5. Handle API errors gracefully.

## Code Structure

```plaintext
src/
│── components/
│   ├── ErrorMessage.jsx
│   ├── SearchBar.jsx
│   ├── WeatherDisplay.jsx
│
│── context/
│   ├── WeatherProvider.jsx
│
│── hooks/
│   ├── useWeather.js
│
│── styles/
│   ├── ErrorMessage.module.css
│   ├── SearchBar.module.css
│   ├── Weather.module.css
│   ├── app.module.css
│
│── App.jsx
│── main.js
│── index.css
```
