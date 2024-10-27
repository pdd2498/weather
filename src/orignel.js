import React, { useState, useEffect } from 'react';


const App = () => {
  const [cityList, setCityList] = useState([
    { city: "London", status: "on" },
    { city: "New York", status: "on" },
    { city: "Los Angeles", status: "on" },
    { city: "Las Vegas", status: "on" }
  ]);
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [city , setCity] = useState([]);
  const [count , setCount] = useState(0);

  const fetchWeather = async (c) => {
    try {
      const response = await fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${c}`);
      const data = await response.json();
      const typData = {
        c,
        temperature: data.temp_in_celsius,
        description: data.description,
        humidity: data.humidity_in_percent,
        date: new Date(data.date_and_time),
      }
      const newData = [...details , typData];
      setDetails(newData);
      setCityList(prevCityList =>
        prevCityList.map(city =>
          city.city === c ? { ...city, status: "off" } : city
        )
      );
      console.log(newData , cityList);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const chack = (e)=>{
      let flag = true;
      details.forEach((a)=>{
        if(a.c === e)flag = false;
      }
    )
    if(flag)fetchWeather(e);
    console.log(flag);
  }

  const deleteRow = (cityName) => {
    
    const updatedDetails = details.filter((item) => item.c !== cityName);
    setDetails(updatedDetails);
    let ans = count;
    setCount(ans -= 1);
    setCityList(prevCityList =>
      prevCityList.map(city =>
        city.city === cityName ? { ...city, status: "on" } : city
      )
    );
    console.log(cityName , ans , " i am anser");
  };

  const highlightRow = (index) => {
    // Function to briefly highlight a row for search functionality
  };

  return (
    <div className="app">

      <div>
        <div onClick={()=>{
          let ans = count;
            if(ans < 4){
              setCount(ans+=1);
              console.log(count);
              fetchWeather(cityList[count].city);
          }
        }}>Get Weather</div>
              <div>
                {cityList.map((e, idx) => (
                  <div
                    key={idx}
                    className={`border-2 p-2 ${
                      e.status === "off" ? "border-green-500" : "border-black"
                    }`}
                  >
                    {e.city}
                  </div>
                ))}
        </div>
      </div>
      <div className="tables">

        <div>
        <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Weather Data</h2>
      <div className="grid grid-cols-6 gap-4 p-2 bg-gray-200 border border-gray-400 rounded">
        <div className="font-bold">City</div>
        <div className="font-bold">Temperature</div>
        <div className="font-bold">Description</div>
        <div className="font-bold">Humidity</div>
        <div className="font-bold">Date</div>
        <div className="font-bold">Actions</div>

        {details.map((e, index) => (
          <React.Fragment key={index}>
            <div>{e.c}</div>
            <div>{e.temperature}°C</div>
            <div>{e.description}</div>
            <div>{e.humidity}%</div>
            <div>{e.date.toLocaleString()}</div>
            <div>
              <button
                onClick={() => deleteRow(e.c)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default App;