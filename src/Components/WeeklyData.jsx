import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function WeeklyData({ selectedLocation }) {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const scrollableRef = useRef(null);

    useEffect(() => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        const location = selectedLocation || 'iraq';

        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`)
            .then((response) => {
                setForecast(response.data);
                console.log('7 days:', response.data);
            })
            .catch((err) => {
                setError('Error fetching weather data');
                console.error(err);
            });
    }, [selectedLocation]);

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!forecast) {
        return <p>Loading weather data...</p>;
    }
    const handleScroll = () => {
        const scrollPosition = scrollableRef.current.scrollLeft;
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>


            <Box
                sx={{
                    minWidth: 275,
                    marginBottom: 2,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: 1,
                    padding: 1,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    margin: { xs: 2, md: 5 },
                    scrollBehavior: 'smooth',
                    position: 'relative',
                }}
                ref={scrollableRef}
                onScroll={handleScroll}
            >
                {forecast.forecast.forecastday.map((day, index) => (
                    <Box key={index} sx={{ minWidth: 150 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom sx={{ fontSize: 15 }}>
                                {getDayOfWeek(day.date)}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img
                                    src={day.day.condition.icon}
                                    alt="Weather Icon"
                                    style={{ width: 60, height: 60 }}
                                />
                            </Typography>
                            <Typography variant="body2">
                                Max: {Math.round(day.day.maxtemp_c)}°C
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 4 }}>
                                Min: {Math.round(day.day.mintemp_c)}°C
                            </Typography>
                        </CardContent>
                    </Box>
                ))}
            </Box>
        </div>
    );
}

export default WeeklyData;
