import React, { useState } from 'react';
import Search from './Search';
import ApiAxios from './ApiAxios';
import DailyData from './DailyData';
import WeeklyData from './WeeklyData';
import MoreData from './MoreData';

function HomePage() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div>
            <Search setSelectedLocation={setSelectedLocation} />
            <ApiAxios selectedLocation={selectedLocation} />
            <DailyData selectedLocation={selectedLocation}/>
            <WeeklyData selectedLocation={selectedLocation}/>
            <MoreData selectedLocation={selectedLocation}/>

        </div>
    );
}

export default HomePage;
