import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import sunny from '../assets/img/sunny.png';
import clearlynight from '../assets/img/clearlynight.png';
import rain from '../assets/img/rain.png';
import snow from '../assets/img/snow.png';
import cloudy from '../assets/img/cloudy.png';
import storm from '../assets/img/storm.png';
import rainNight from '../assets/img/rainNight.png';
import cloudyNight from '../assets/img/cloudyNight.png';
import drizzle from '../assets/img/drizzle.png';
import drizzleNight from '../assets/img/drizzleNight.png';
import Overcast from '../assets/img/Overcast.png';
import fog from '../assets/img/fog.png';
import mist from '../assets/img/mist.png';
import thundery from '../assets/img/Thundery.png';

function DailyData({ selectedLocation }) {
  const [forecast, setForecast] = useState(null);
  const scrollableRef = useRef(null);

  useEffect(() => {
    const apiKey = '097eeeb342d8477aa69224048240209';
    const location = selectedLocation || 'iraq';

    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`)
      .then((forecastRes) => {
        setForecast(forecastRes.data);
        console.log('Forecast:', forecastRes.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedLocation]);

  const isDayOrNight = (time) => {
    const hour = parseInt(time.split(':')[0], 10);
    return (hour >= 6 && hour < 18) ? 0 : 1;
  };

  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  const weatherIcon = {
    sunny: { day: sunny, night: clearlynight },
    clear: { day: sunny, night: clearlynight },
    rain: { day: rain, night: rainNight },
    cloud: { day: cloudy, night: cloudyNight },
    snow: { day: snow, night: snow },
    storm: { day: storm, night: storm },
    drizzle: { day: drizzle, night: drizzleNight },
    overcast: { day: Overcast, night: Overcast },
    mist: { day: mist, night: mist },
    fog: { day: fog, night: fog },
    thundery: { day: thundery, night: thundery }
  };

  const getWeatherIcon = (conditionText, isDay) => {
    const normalizedCondition = Object.keys(weatherIcon).find((key) =>
      conditionText.toLowerCase().includes(key)
    );
    return normalizedCondition ? weatherIcon[normalizedCondition][isDay ? 'day' : 'night'] : null;
  };

  return (
    <div style={{ position: 'relative', marginTop: 20,height:{xs:100,md:200} }}>
      <Box
        sx={{
          minWidth: 275,
          marginBottom: 2,
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: 1,
          padding: 1,
          borderRadius: 2,
          margin: { xs: 2, md: 5 },
          color: 'black',
          scrollBehavior: 'smooth'
        }}
        ref={scrollableRef}
      >
        {forecast?.forecast?.forecastday[0]?.hour.map((hourData, index) => {
          const time24Hour = hourData.time.split(' ')[1];
          const dayOrNight = isDayOrNight(time24Hour);
          return (
            <Box key={index} sx={{ minWidth: 100, padding: 1, textAlign: 'center', bgcolor: 'whitesmoke', borderRadius: 5 }}>
              <Typography variant="body2">{convertTo12HourFormat(time24Hour)}</Typography>
              <Typography gutterBottom sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1, height: 70 }}>
                <img src={getWeatherIcon(hourData.condition.text, dayOrNight === 0)} alt={hourData.condition.text} style={{ width: 50, marginLeft: 5 }} />
              </Typography>
              <Typography variant="body2">{Math.round(hourData.temp_c)}°C</Typography>
            </Box>
          );
        })}
      </Box>
    </div>
  );
}

export default DailyData;
