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

    // Data for temperature lines
    const maxTemps = forecast.forecast.forecastday.map(day => Math.round(day.day.maxtemp_c));
    const minTemps = forecast.forecast.forecastday.map(day => Math.round(day.day.mintemp_c));

    // Calculate the X coordinates for the line
    const cardWidth = 150;
    const spacing = 20;
    const xCoordinates = forecast.forecast.forecastday.map((_, index) => index * (cardWidth + spacing) + (cardWidth / 2));

    // Handle scroll position and calculate line positions
    const handleScroll = () => {
        const scrollPosition = scrollableRef.current.scrollLeft;
        const svg = document.getElementById('temperature-lines');
        svg.style.left = `-${scrollPosition}px`;
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            <svg
                id="temperature-lines"
                height="200"
                width={xCoordinates[xCoordinates.length - 1] + cardWidth / 2}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    strokeWidth: 2,
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            >
                <defs>
                    <clipPath id="clip">
                        <rect x="0" y="0" width="90%" height="200" />
                    </clipPath>
                </defs>

                <polyline
                    points={xCoordinates.map((x, index) => `${x},${235 - (maxTemps[index] * 2)}`).join(' ')}
                    style={{
                        fill: 'none', stroke: 'red', strokeWidth: 2, clipPath: 'url(#clip)', overflow: 'hidden'
                    }}
                />
                <polyline
                    points={xCoordinates.map((x, index) => `${x},${227 - (minTemps[index] * 2)}`).join(' ')}
                    style={{
                        fill: 'none', stroke: 'blue', strokeWidth: 2, clipPath: 'url(#clip)', overflow: 'hidden'
                    }}
                />
            </svg>

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
