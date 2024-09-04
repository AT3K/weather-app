import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../assets/img/herosection.jpg';

function ApiAxios() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        const location = 'iraq';

        axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
            .then((res) => {
                setWeather(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                setError('Error fetching weather data');
                console.error(err);
            });
    }, []);

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '500px', // Explicit height for container
                    zIndex: -1,
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 80,
                    overflow: 'hidden'
                }}
            >
                <img
                    src={img}
                    alt='house'
                    style={{
                        width: '90%',
                        height: '80%',
                        objectFit: 'cover',
                        borderRadius: 20
                    }}
                />
            </div>
            {error && <p>{error}</p>}
            {weather ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 800,
                    textAlign: 'center'
                }}>
                    <div>
                        <h1> {weather.location.name}</h1>
                        {/* <h1>{weather.location.localtime}</h1> */}
                        <h1>{weather.current.temp_c}°C</h1>
                        <p> {weather.current.condition.text} </p>
                        <img src={weather.current.condition.icon} alt="Weather Icon" />
                        {/* <p>{weather.current.last_updated}</p> */}
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default ApiAxios;
