import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function DailyData({ selectedLocation }) {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const scrollableRef = useRef(null);

  useEffect(() => {
    const apiKey = '097eeeb342d8477aa69224048240209';
    const location = selectedLocation || 'iraq';

    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`)
      .then((forecastRes) => {
        setForecast(forecastRes.data);
        console.log('1-Day Forecast:', forecastRes.data);
      })
      .catch((err) => {
        setError('Error fetching weather data');
        console.error(err);
      });
  }, [selectedLocation]);

  return (
    <div style={{ position: 'relative', marginTop: 20 }}>
      {error && <p>{error}</p>}
      {forecast ? (
        <Box
          sx={{
            minWidth: 275,
            marginBottom: 2,
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: 1,
            padding: 1,
            border: 1,
            borderRadius: 2,
            margin: 1,
            bgcolor: "#2a0592",
            color: 'white',
            scrollBehavior: 'smooth'
          }}
          ref={scrollableRef}
        >
          {forecast.forecast.forecastday[0] && (
            forecast.forecast.forecastday[0].hour.map((hourData, index) => (
              <Box key={index} sx={{ minWidth: 100, padding: 1, textAlign: 'center' }}>
                <Typography variant="body2">
                  {hourData.time.split(' ')[1]}
                </Typography>
                <Typography gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={hourData.condition.icon}
                    alt="Weather Icon"
                    style={{ width: 50, height: 50 }}
                  />
                </Typography>
                <Typography variant="body2">
                  {Math.round(hourData.temp_c)}°C
                </Typography>
              </Box>
            ))
          )}
        </Box>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}

export default DailyData;
