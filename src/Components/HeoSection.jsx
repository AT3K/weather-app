import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
import overcast from '../assets/img/Overcast.png';
import fog from '../assets/img/fog.png';
import mist from '../assets/img/mist.png';

const weatherIcons = {
    sunny,
    clearlynight,
    rain,
    snow,
    cloudy,
    storm,
    rainNight,
    cloudyNight,
    drizzle,
    drizzleNight,
    overcast,
    fog,
    mist,
};

function ApiAxios({ selectedLocation }) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        const location = selectedLocation || 'iraq';

        axios.all([
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`),
            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10`),
        ])
            .then(axios.spread((currentRes, forecastRes) => {
                setWeather(currentRes.data);
                setForecast(forecastRes.data);
            }))
            .catch((err) => {
                setError('Error fetching weather data');
                console.error(err);
            });
    }, [selectedLocation]);

    const weatherIcon = (condition) => {
        const conditionKey = condition.toLowerCase();
        if (conditionKey.includes('sunny')) return weatherIcons.sunny;
        if (conditionKey.includes('clear')) return weatherIcons.clearlynight;
        if (conditionKey.includes('rain')) return weatherIcons.rain;
        if (conditionKey.includes('cloud')) return weatherIcons.cloudy;
        if (conditionKey.includes('storm')) return weatherIcons.storm;
        if (conditionKey.includes('night')) return weatherIcons.rainNight;
        if (conditionKey.includes('snow')) return weatherIcons.snow;
        if (conditionKey.includes('drizzle')) return weatherIcons.drizzle;
        if (conditionKey.includes('overcast')) return weatherIcons.overcast;
        if (conditionKey.includes('fog')) return weatherIcons.fog;
        if (conditionKey.includes('mist')) return weatherIcons.mist;
        return null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            {error && <p>{error}</p>}
            {weather && forecast ? (
                <Box >
                    <CardContent >
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginLeft: 2}}>
                                <Typography gutterBottom sx={{ fontSize: 18 }}>
                                    {weather.location.name} <LocationOnIcon sx={{ fontSize: 18 }} />
                                </Typography>
                            </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            
                            <Box sx={{ paddingRight: 3, marginLeft: 2 }}>
                                <Typography component="div" sx={{ display: 'flex', justifyContent: 'normal', fontSize: 60, fontWeight: '500', mb: '-16px' }}>
                                    {Math.round(weather.current.temp_c)}<span style={{ fontSize: 30, marginTop: 10, color: 'hwb(180 96% 3% / 0.89)' }}>°C</span>
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: 'start', fontSize: 18 }}>
                                    {weather.current.condition.text}
                                </Typography>
                            </Box>
                            <Box sx={{ width: 230, paddingLeft: 2,marginTop:'-50px' }}>

                                <img
                                    src={weatherIcon(weather.current.condition.text)}
                                    alt={weather.current.condition.text}
                                    style={{ marginTop: 20 }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
}

export default ApiAxios;
