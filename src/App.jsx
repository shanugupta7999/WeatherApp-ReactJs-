import { useState, useCallback, useEffect } from "react";
import axios from "axios";
export default function App() {
  const [city, setCity] = useState("Bangalore");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const cityCoordinates = {
    Bangalore: { lat: 12.987, lon: 77.567 },
    Delhi: { lat: 14.235, lon: 78.534 },
    Mumbai: { lat: 23.345, lon: 80.345 },
    Chennai: { lat: 34.678, lon: 90.367 },
  };
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const { lat, lon } = cityCoordinates[city];
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        
        setWeather(response.data.current_weather);
      } catch (err) {
        setError("Error Fetching Weather Data");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);
  return (
    <div className="flex justify-center text-white items-center h-screen bg-linear-65 from-purple-500 to-pink-500">
      <div className="border rounded-lg p-4 shadow-xl h-80 w-64 ">
        <h1 className="text-3xl">Weather App</h1>
        <select
          className="border-2 rounded-xl p-1 mt-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {Object.keys(cityCoordinates).map((cityName) => (
            <option key={cityName} value={cityName} className="bg-pink-400">
              {" "}
              {cityName}
            </option>
          ))}
        </select>
        <div className="flex justify-center items-center mt-5">
          {loading ? (
            <p>Loading....</p>
          ) : error ? (
            <p>Error While Fetching...</p>
          ) : (
            weather && (
              <div className="mt-5">
                <p>City: {city}</p>
                <p>City Temperature: {weather.temperature}</p>
                <p>Wind Speed: {weather.windspeed}</p>
                <p>Direction: {weather.winddirection}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
