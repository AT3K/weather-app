import React, { useState } from 'react';
import Search from './Search';
import ApiAxios from './ApiAxios';
import DailyData from './DailyData';

function HomePage() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div>
            <Search setSelectedLocation={setSelectedLocation} />
            <ApiAxios selectedLocation={selectedLocation} />
            <DailyData selectedLocation={selectedLocation}/>
        </div>
    );
}

export default HomePage;
