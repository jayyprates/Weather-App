// Package
import { useState } from 'react'
import axios from 'axios';
import cn from 'classnames';

// Project
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false);

  const fetchCityWeather = () => {
    if (!inputValue) {
      return
    }

    setLoading(true);
  
    axios.get(`https://api.weatherapi.com/v1/current.json?key=132c80d5f3704eef9e1192416242501&q=${inputValue}&aqi=no`)
      .then((resp) => {
        setWeatherData(resp.data)
        setInputValue("")
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }

  return (
    <div className='border-2 rounded-lg bg-white p-4' style={{ width: 500}}>
      <h1 className='text-center font-bold text-black text-xl mb-4'>Weather APP</h1>
      <div className='flex'>
        <input
          type="text" 
          placeholder='Example: London' 
          className='w-full border-2 p-2 text-black bg-white'
          value={inputValue}
          required
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
        />
        <button
          className={cn('rounded-none ml-2', { "bg-gray-500": loading })}
          onClick={fetchCityWeather}
          disabled={loading}
        >
          Search
        </button>
      </div>

      <hr/>

      {weatherData && (
      <div className='flex-col mt-8'>
        <div className='flex justify-center items-center'>
          <img src={weatherData.current.condition.icon} />
        </div>
        <p className='text-center text-black'>{weatherData.current.condition.text}</p>

        <ul className='text-black text-left mt-4'>
          <li><strong>City</strong>: {weatherData.location.name} ({weatherData.location.region} - {weatherData.location.country})</li>
          <li><strong>Time</strong>: {weatherData.location.localtime}</li>

          <li className='mt-4'><strong>Temperature</strong>: {weatherData.current.temp_c}ºc</li>
          <li><strong>Wind</strong>: {weatherData.current.wind_kph}/kph</li>
          <li><strong>Humidity</strong>: {weatherData.current.humidity}%</li>
          <li><strong>Clouds</strong>: {weatherData.current.cloud}%</li>
        </ul>
      </div>
      )}
    </div>
  )
}

export default App
