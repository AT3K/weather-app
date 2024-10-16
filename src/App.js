import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './Pages/HomePage';

function App() {
  const [dayOrNight, setDayOrNight] = useState(0); 
  const location = 'iraq'; 

  useEffect(() => {
    const fetchDayOrNight = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=097eeeb342d8477aa69224048240209&q=${location}`);
        const isDay = response.data.current.is_day;
        setDayOrNight(isDay);
      } catch (error) {
        console.error('Error fetching day/night info:', error);
      }
    };

    fetchDayOrNight();
  }, []); 

  return (
    <div
      style={{
        background: dayOrNight === 1 ? 'linear-gradient(to top ,#0883f7,#efeded)' : 'linear-gradient(to top ,#a2acdf, #2a3679)',
        color: dayOrNight === 1 ? 'black' : 'white',
        minHeight: '100vh', 
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage setDayOrNight={setDayOrNight} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
