import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
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

function WeeklyData({ selectedLocation }) {
    const [forecast, setForecast] = useState(null);
    const scrollableRef = useRef(null);

    useEffect(() => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        const location = selectedLocation || 'iraq';

        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10`)
            .then((response) => {
                setForecast(response.data);
            })
            .catch((err) => {
                console.error('Error fetching weather data', err);
            });
    }, [selectedLocation]);

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

    const getWeatherIcon = (conditionText) => {
        const key = Object.keys(weatherIcon).find((key) =>
            conditionText.toLowerCase().includes(key)
        );
        return key ? weatherIcon[key].day : null;
    };

    const getDayOfWeek = (dateString) => {
        const today = new Date();
        const forecastDate = new Date(dateString);
        return today.toDateString() === forecastDate.toDateString()
            ? 'Today'
            : forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Typography sx={{ marginLeft: { xs: 3, md: 5 }, fontSize: 20 }}>
                Next days forecast
            </Typography>
            <Box
                sx={{
                    minWidth: 275,
                    marginBottom: 2,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: 1,
                    padding: 1,
                    margin: { xs: 2, md: 5 },
                    marginTop: 0,
                    scrollBehavior: 'smooth',
                    position: 'relative',
                    color: 'black',
                }}
                ref={scrollableRef}
            >
                {forecast?.forecast.forecastday.map((day, index) => (
                    <Box key={index} sx={{ minWidth: 180, bgcolor: 'whitesmoke', borderRadius: 5 }}>
                        <CardContent sx={{ textAlign: 'start' }}>
                            <Typography gutterBottom sx={{ fontSize: 15 }}>{getDayOfWeek(day.date)}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                <Typography variant="body2" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={getWeatherIcon(day.day.condition.text)} alt="Weather Icon" style={{ width: 60, height: 60 }} />
                                </Typography>
                                <Box sx={{ paddingLeft: 2 }}>
                                    <Typography variant="body2">{Math.round(day.day.maxtemp_c)}°C</Typography>
                                    <Typography variant="body2" sx={{ paddingTop: 2 }}>{Math.round(day.day.mintemp_c)}°C</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                ))}
            </Box>
        </div>
    );
}

export default WeeklyData;
