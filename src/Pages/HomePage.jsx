import React, { useState, useEffect } from 'react';
import Search from '../Components/Search';
import HeroSection from '../Components/HeoSection';
import DailyData from '../Components/DailyData';
import WeeklyData from '../Components/WeeklyData';
import MoreData from '../Components/MoreData';
import Footer from '../Components/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ minHeight: '100vh' }}>
          <Search setSelectedLocation={setSelectedLocation} />
          <HeroSection selectedLocation={selectedLocation} />
          <DailyData selectedLocation={selectedLocation} />
          <WeeklyData selectedLocation={selectedLocation} />
          <MoreData selectedLocation={selectedLocation} />
          <Footer />
        </Box>
      )}
    </>
  );
}

export default HomePage;
