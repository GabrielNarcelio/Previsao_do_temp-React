import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Weather5Days from "./components/Weather5Days/Weather5Days";

function App() {
  const [weather, setWeather] = useState(null); // Initial state for weather data
  const [weather5Days, setWeather5Days] = useState(null); // Initial state for 5-day forecast
  const [error, setError] = useState(null); // State to store any errors
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status

  const inputRef = useRef();

  async function searchCity() {
    setError(null); // Clear any previous errors before fetching new data
    setIsLoading(true); // Set loading state to true

    try {
      const city = inputRef.current.value;
      const key = "9ad0ec4642639a4c9f00c990eee051f6";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
      const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

      const apiDataInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather(apiDataInfo.data);
      setWeather5Days(apiInfo5Days.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(
        "Ocorreu um erro ao buscar a previsão do tempo, cidade não encontrada."
      ); // User-friendly error message
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      searchCity();
    }
  };

  return (
    <>
      <div className="container">
        <h1>Previsão do tempo em React</h1>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />
        <button onClick={searchCity}>Buscar</button>
        {isLoading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}
        {weather && <WeatherInfo weather={weather} />}
        {weather5Days && <Weather5Days weather5Days={weather5Days} />}
      </div>
    </>
  );
}

export default App;
