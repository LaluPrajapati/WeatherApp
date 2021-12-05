import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";

import "./style.css";

const WeatherDetails = () => {
  const [isOverlay, setIsOverlay] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [address, setAddress] = useState("New Delhi");
  const imageList = {
    Mist: "weather.png",
    Smoke: "smoke.png",
    Sunny: "suncloud.png",
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleOverlay = (isOpen) => {
    setIsOverlay(isOpen);
  };

  const handleSearch = (searchParam) => {
    setAddress(searchParam);
  };

  useEffect(async () => {
    const data = await fetch(`/weather?address=${address}`)
      .then((response) => response.json())
      .then((data) => {
        debugger;
        setWeatherData(data);
      });
  }, [address]);

  let imgpath = require(`../../assets/images/${imageList["Mist"]}`).default;
  const dateandday = new Date(weatherData?.location?.localtime);
  const d = dateandday.getDay();
  const m = dateandday.getMonth();
  const dt = dateandday.getDate();
  return (
    <div className="weather-container">
      {isOverlay && <div className="overlay"></div>}
      {weatherData && weatherData?.error ? (
        <p>{weatherData.error}</p>
      ) : Object.keys(weatherData).length ? (
        <div className="details-section">
          <label className="city-name">
            {weatherData?.location?.name},{weatherData?.location?.country}
          </label>
          <div className="temp-desc">
            <img src={imgpath} />
            <h1 className="current-temp">
              {weatherData?.current?.temp_c}&deg;C
            </h1>
            <span className="desc">
              {weatherData?.current?.condition?.text}
            </span>
          </div>
          <p className="current-date">
            {days[d]}, {dt} {months[m]}
          </p>
          <div className="weather-desc">
            <div className="desc-card wind">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <g>
                    <path d="M14.5,17c0,1.65-1.35,3-3,3s-3-1.35-3-3h2c0,0.55,0.45,1,1,1s1-0.45,1-1s-0.45-1-1-1H2v-2h9.5 C13.15,14,14.5,15.35,14.5,17z M19,6.5C19,4.57,17.43,3,15.5,3S12,4.57,12,6.5h2C14,5.67,14.67,5,15.5,5S17,5.67,17,6.5 S16.33,8,15.5,8H2v2h13.5C17.43,10,19,8.43,19,6.5z M18.5,11H2v2h16.5c0.83,0,1.5,0.67,1.5,1.5S19.33,16,18.5,16v2 c1.93,0,3.5-1.57,3.5-3.5S20.43,11,18.5,11z" />
                  </g>
                </g>
              </svg>
              <p>{weatherData?.current?.wind_kph}</p>
              <p>km/h</p>
            </div>
            <div className="desc-card humadity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M12,2c-5.33,4.55-8,8.48-8,11.8c0,4.98,3.8,8.2,8,8.2s8-3.22,8-8.2C20,10.48,17.33,6.55,12,2z M7.83,14 c0.37,0,0.67,0.26,0.74,0.62c0.41,2.22,2.28,2.98,3.64,2.87c0.43-0.02,0.79,0.32,0.79,0.75c0,0.4-0.32,0.73-0.72,0.75 c-2.13,0.13-4.62-1.09-5.19-4.12C7.01,14.42,7.37,14,7.83,14z" />
              </svg>
              <p>{weatherData?.current?.humidity}</p>
              <p>%</p>
            </div>
            <div className="desc-card air-pressure">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <p>{weatherData?.current?.pressure_mb}</p>
              <p>mmHg</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
      {/* {weatherData && weatherData.forecast ? (
        
      ) : (
        <p>Loading....</p>
      )} */}
      <Navigation handleSearch={handleSearch} handleOverlay={handleOverlay} />
    </div>
  );
};

export default WeatherDetails;
