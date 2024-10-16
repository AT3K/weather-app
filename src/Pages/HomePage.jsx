import React, { useState } from 'react';
import Search from '../Components/Search';
import HeroSection from '../Components/HeoSection';
import DailyData from '../Components/DailyData';
import WeeklyData from '../Components/WeeklyData';
import MoreData from '../Components/MoreData';

function HomePage() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div

        >
            <Search setSelectedLocation={setSelectedLocation} />
                <HeroSection selectedLocation={selectedLocation}  />
                <DailyData selectedLocation={selectedLocation} />
            <WeeklyData selectedLocation={selectedLocation} />
            <MoreData selectedLocation={selectedLocation} />
        </div>
    );
}

export default HomePage;
