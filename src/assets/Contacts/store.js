// import React, { createContext, useContext, useState } from "react";
// import clearlynight from '../img/clearlynight.png';
// import lightning from '../img/lightning.png';
// import morningwinds from '../img/morning+winds.png';
// import morningcloudy1 from '../img/morning+cloudy.png';
// import morning2rian2cloudes1lightining1winds from '../img/morning+rian+cloudes+lightining+winds.png';
// import morning2rian2cloudes2lightining from '../img/morning+rian+cloudes+lightining.png';
// import morning2rian2cloudes from '../img/morning+rian+cloudes.png';
// import morning2snow from '../img/morning+snow.png';
// import morning2winds from '../img/morning+winds.png';
// import morning from '../img/morning.png';
// import night2cloudy2snow from '../img/night+cloudy+snow.png';
// import night2partly from '../img/night+partly+cloudy.png';
// import night2rain2cloudy from '../img/night+rain+cloudy.png';
// import night2winds from '../img/night+winds.png';
// import rainbow from '../img/rainbow.png';
// import snow from '../img/snow.png';
// import tornado from '../img/tornado.png';
// import wind2lightning from '../img/wind+lightning.png';
// import wind from '../img/wind.png';

// const DataContext = createContext();

// const data = [
//   { id: 1, img: clearlynight, title: "Clearly Night" },
//   { id: 2, img: lightning, title: "Lightning" },
//   { id: 3, img: morningwinds, title: "Morning Winds" },
//   { id: 4, img: morningcloudy1, title: "Morning Cloudy 1" },
//   { id: 5, img: morning2rian2cloudes1lightining1winds, title: "Morning Rain, Clouds, Lightning & Winds" },
//   { id: 6, img: morning2rian2cloudes2lightining, title: "Morning Rain, Clouds & Lightning" },
//   { id: 7, img: morning2rian2cloudes, title: "Morning Rain & Clouds" },
//   { id: 8, img: morning2snow, title: "Morning Snow" },
//   { id: 9, img: morning2winds, title: "Morning Winds" },
//   { id: 10, img: morning, title: "Morning" },
//   { id: 11, img: night2cloudy2snow, title: "Night Cloudy & Snow" },
//   { id: 12, img: night2partly, title: "Night Partly Cloudy" },
//   { id: 13, img: night2rain2cloudy, title: "Night Rain & Cloudy" },
//   { id: 14, img: night2winds, title: "Night Winds" },
//   { id: 15, img: rainbow, title: "Rainbow" },
//   { id: 16, img: snow, title: "Snow" },
//   { id: 17, img: tornado, title: "Tornado" },
//   { id: 18, img: wind2lightning, title: "Wind & Lightning" },
//   { id: 20, img: wind, title: "Wind" },
// ];

// export const DataProvider = ({ children }) => {
//   const [items] = useState(data);

//   return (
//     <DataContext.Provider value={items}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => {
//   return useContext(DataContext);
// };

// export const PostContext = createContext();

// export const PostProvider = ({ children }) => {
//   const [weather, setWeather] = useState([]);

//   return (
//     <PostContext.Provider value={{ weather, setWeather }}>
//       {children}
//     </PostContext.Provider>
//   );
// };
