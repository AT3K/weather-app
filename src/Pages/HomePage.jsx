import React, { useState } from 'react';
import Search from '../Components/Search';
import HeroSection from '../Components/HeoSection';
import DailyData from '../Components/DailyData';
import WeeklyData from '../Components/WeeklyData';
import MoreData from '../Components/MoreData';
// import { Box } from '@mui/material';

function HomePage() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [dayOrNight, setDayOrNight] = useState(0);

    return (
        <div
            style={{
                background: dayOrNight === 0 ? 'linear-gradient(to top ,#a2acdf, #2a3679) ' : 'linear-gradient(to top ,#0883f7,#efeded )',
                color: dayOrNight === 0 ? 'white' : 'black'
            }}
        >
            <Search setSelectedLocation={setSelectedLocation} />
            {/* <Box sx={{ display:{xs:'block',md:'flex'},justifyContent:'space-between',overflow:'hidden'}}> */}
                <HeroSection selectedLocation={selectedLocation} setDayOrNight={setDayOrNight} />
                <DailyData selectedLocation={selectedLocation} />
            {/* </Box> */}
            <WeeklyData selectedLocation={selectedLocation} />
            <MoreData selectedLocation={selectedLocation} />
        </div>
    );
}

export default HomePage;
