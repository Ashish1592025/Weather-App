import React, { useState } from "react";
import './Weather.css'

// object
const api = {
  key: "ef7bbdf6b731be85465f39318f92ffe7",
  // key: "4cd0d6d6e449eff3901a45f85f4ce1b6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  // json format me ayega in object
  const [weather, setWeather] = useState({});

  // evt aa rha h hmne konsi key press ki
  const search = (evt) => {
    // console.log(evt)
    // pressed key key me hoti h. evt object hota h
    if (evt.key === "Enter") {
      // data fetch kro using base & query
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        // upar wale code se json format me response mila
        .then((res) => res.json())
        // upar wale ke bad data milta toh
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  // object is d
  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // index comes by d.getDay() and d.getMonth()
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    // classname for applying bg photo
    // if temp> 16 classname app warm else app
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : ('app')}>
      {/* due to it is main content */}
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            // jo bhi hum change krenge wo setquery me aa jayega. Jiski wajah se query apni value change kr dega.
            onChange={(e) => setQuery(e.target.value)}
            // usekeypress or usekeydown for when enter pressed
            onKeyPress={search}
          />
        </div>

        {/* if wheather is showing only then run this program, else not. Without this line error was  */}
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
                <div className="date">
                  {/* dateBuilder function to get full name */}
                  {dateBuilder(new Date())}
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className="weather">
                    {weather.weather[0].main}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (' ')// hmare bs me nhi h to khali rkho
        }
      </main>
    </div>
  );
};

export default Weather;
