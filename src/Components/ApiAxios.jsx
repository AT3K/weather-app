import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            {error && <p>{error}</p>}
            {weather && forecast ? (
                <>
                    <Box sx={{ minWidth: 275, marginBottom: 2, textAlign: 'center' }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ fontSize: 20, fontWeight: 'bold' }}>
                                {weather.location.name} <LocationOnIcon sx={{ fontSize: 20 }} />
                            </Typography>
                            <Typography variant="h3" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
                                {Math.round(weather.current.temp_c)}
                                <span style={{ fontSize: 20, marginTop: 4 }}>°C</span>
                            </Typography>
                            {forecast.forecast.forecastday[0] && (
                                <Typography variant="body2">
                                    {Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}
                                    /
                                    {Math.round(forecast.forecast.forecastday[0].day.mintemp_c)}°C
                                </Typography>
                            )}
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {weather.current.condition.text}
                            </Typography>
                        </CardContent>
                    </Box>

                    
                </>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
}

export default ApiAxios;
