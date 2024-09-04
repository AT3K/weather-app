import React from 'react';
import ApiAxios from './ApiAxios';
import HeroSection from './heroSection';
import DrawerAppBar from './Navbar';
import Search from './Search';

function Weather() {
    return (
        <div>
            <DrawerAppBar/>
            <Search/>
            {/* <HeroSection /> */}
            <ApiAxios />
        </div>
    );
}

export default Weather;
