import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WbCloudyOutlinedIcon from '@mui/icons-material/WbCloudyOutlined';
import ShutterSpeedOutlinedIcon from '@mui/icons-material/ShutterSpeedOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';

function MoreData({ selectedLocation }) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        const location = selectedLocation || 'iraq';

        axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
            .then(response => {
                setWeatherData(response.data.current);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }, [selectedLocation]);

    const getUvLevel = (uvIndex) => {
        if (uvIndex < 3) return 'Low';
        if (uvIndex < 6) return 'Moderate';
        if (uvIndex < 8) return 'High';
        if (uvIndex < 11) return 'Very High';
        return 'Extreme';
    };

    if (!weatherData) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ m: { xs: 2, md: 5 }}}>
            <Typography variant="h6">Helpful Info</Typography>
            <Box
                sx={{
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' },
                    gap: 2,
                    color:'black',
                    margingBottom:5
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <WaterDropOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Humidity</Typography>
                    <Typography>{`${weatherData.humidity}%`}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <DeviceThermostatIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Feels Like</Typography>
                    <Typography>{`${weatherData.feelslike_c}°C`}</Typography>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <AirIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Wind Speed</Typography>
                    <Typography>{` ${weatherData.wind_kph} kph`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <FlagOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Wind Dir</Typography>
                    <Typography>{` ${weatherData.wind_dir}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <LightModeOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>UV Index</Typography>
                    <Typography>{` ${getUvLevel(weatherData.uv)}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <ShutterSpeedOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Pressure</Typography>
                    <Typography>{`${weatherData.pressure_mb} mb`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <WbCloudyOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Cloud Cover</Typography>
                    <Typography>{`${weatherData.cloud} %`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <RemoveRedEyeOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Visibility</Typography>
                    <Typography>{`${weatherData.vis_km} km`}</Typography>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <MultilineChartOutlinedIcon />
                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>Altitude</Typography>
                    <Typography>{`${weatherData.altitude || 'N/A'} m`}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default MoreData;
