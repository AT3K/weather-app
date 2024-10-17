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
import thundery from '../assets/img/Thundery.png';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ApiAxios({ selectedLocation }) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

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
            console.error(err);
        });
    }, [selectedLocation]);

    const weatherIcons = {
        sunny: { day: sunny, night: clearlynight },
        clear: { day: sunny, night: clearlynight },
        rain: { day: rain, night: rainNight },
        cloud: { day: cloudy, night: cloudyNight },
        snow: { day: snow, night: snow },
        storm: { day: storm, night: storm },
        drizzle: { day: drizzle, night: drizzleNight },
        overcast: { day: overcast, night: overcast },
        mist: { day: mist, night: mist },
        fog: { day: fog, night: fog },
        thundery: { day: thundery, night: thundery }
    };

    const getWeatherIcon = (conditionText, isDay) => {
        const normalizedCondition = Object.keys(weatherIcons).find((key) =>
          conditionText.toLowerCase().includes(key)
        );
        return normalizedCondition ? weatherIcons[normalizedCondition][isDay ? 'day' : 'night'] : null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            {weather && forecast && (
                <Box>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginLeft: 2 }}>
                            <Typography gutterBottom sx={{ fontSize: 18 }}>
                                {weather.location.name} <LocationOnIcon sx={{ fontSize: 18 }} />
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ paddingRight: 3, marginLeft: 2 }}>
                                <Typography component="div" sx={{ display: 'flex', justifyContent: 'normal', fontSize: 60, fontWeight: '500', mb: '-16px' }}>
                                    {Math.round(weather.current.temp_c)}<span style={{ fontSize: 30, marginTop: 10 }}>°C</span>
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: 'start', fontSize: 15 }}>
                                    {weather.current.condition.text}
                                </Typography>
                            </Box>
                            <Box sx={{ width: { xs: 200, md: 230 }, paddingLeft: 2, marginTop: { xs: '-60px', md: '-70px' } }}>
                                <LazyLoadImage
                                    src={getWeatherIcon(weather.current.condition.text, weather.current.is_day === 1)}
                                    alt={weather.current.condition.text}
                                    style={{ marginTop: 20 }}
                                    effect='blur'
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            )}
        </div>
    );
}

export default ApiAxios;
