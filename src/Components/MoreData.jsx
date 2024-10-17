import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import humidity from '../assets/img/Humidity.png';
import coldthermo from '../assets/img/cold-thermo.png';
import hotthermo from '../assets/img/hot-therom.png';
import wind from '../assets/img/wind.png';
import windDir from '../assets/img/wind-dir.png';
import sun from '../assets/img/sunny.png';
import barometer from '../assets/img/barometer.png';
import cloud from '../assets/img/cloud-cover.png';
import visibility from '../assets/img/visibilty.png';
import altitude from '../assets/img/Altitude.png';

function MoreData({ selectedLocation }) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        const location = selectedLocation || 'current';

        axios
            .get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
            .then((response) => {
                setWeatherData(response.data.current);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }, [selectedLocation]);

    const getUvLevel = (uvIndex) => {
        if (uvIndex < 3) return 'Low';
        if (uvIndex < 6) return 'Moderate';
        if (uvIndex < 8) return 'High';
        if (uvIndex < 11) return 'Very High';
        return 'Extreme';
    };

    const getThermo = (temperature) => {
        return (
            <img
                src={temperature >= 28 ? hotthermo : coldthermo}
                alt="Thermometer"
                style={{ width: 50 }}
            />
        );
    };

    return (
        weatherData && (
            <Box sx={{ marginBottom: 2 }}>
                <Box sx={{ m: { xs: 2, md: 5 } }}>
                    <Typography variant="h6">Helpful Info</Typography>
                    <Box
                        sx={{
                            padding: 2,
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            display: 'grid',
                            gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
                            gap: 2,
                            color: 'black',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={humidity} style={{ width: 50 }} alt="Humidity" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Humidity</Typography>
                            <Typography>{`${weatherData.humidity}%`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                {getThermo(weatherData.feelslike_c)}
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Feels Like</Typography>
                            <Typography>{`${weatherData.feelslike_c}°C`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={wind} style={{ width: 70 }} alt="Wind Speed" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Wind Speed</Typography>
                            <Typography>{`${weatherData.wind_kph} kph`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={windDir} style={{ width: 50 }} alt="Wind Direction" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Wind Dir</Typography>
                            <Typography>{`${weatherData.wind_dir}`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={sun} style={{ width: 50 }} alt="UV Index" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>UV Index</Typography>
                            <Typography>{getUvLevel(weatherData.uv)}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={barometer} style={{ width: 50 }} alt="Pressure" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Pressure</Typography>
                            <Typography>{`${weatherData.pressure_mb} mb`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={cloud} style={{ width: 50 }} alt="Cloud Cover" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Cloud Cover</Typography>
                            <Typography>{`${weatherData.cloud}%`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={visibility} style={{ width: 50 }} alt="Visibility" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Visibility</Typography>
                            <Typography>{`${weatherData.vis_km} km`}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ height: 50 }}>
                                <img src={altitude} style={{ width: 50 }} alt="Altitude" />
                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Altitude</Typography>
                            <Typography>{`${weatherData.altitude || 'N/A'} m`}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    );
}

export default MoreData;
