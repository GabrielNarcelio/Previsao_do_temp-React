/* eslint-disable react/prop-types */
import "./Weather5Days.css";

function Weather5Days({ Weather5Days }) {
  if (!Weather5Days || !Weather5Days.list) {
    return <div className="weather-container">Carregando...</div>;
  }

  // Pegar os próximos 5 dias (40 registros, 8 por dia)
  const forecasts = Weather5Days.list.slice(1, 6);

  function convertDate(date) {
    return new Date(date.dt * 1000).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="weather-container">
      <p>Previsão próximos 5 Dias</p>
      {forecasts.map((forecast) => (
        <div key={forecast.dt}>
          <p>{convertDate(forecast)}</p>
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt={forecast.weather[0].description}
          />
          <p>{forecast.weather[0].description}</p>
          <p>
            {Math.round(forecast.main.temp_min)}ºC Min /
            {Math.round(forecast.main.temp_max)}ºC Max
          </p>
        </div>
      ))}
    </div>
  );
}

export default Weather5Days;
