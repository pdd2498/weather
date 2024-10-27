import React, { useState } from 'react';

const App = () => {
  const [cityList, setCityList] = useState([
    { city: "London", status: "on" },
    { city: "New York", status: "on" },
    { city: "Los Angeles", status: "on" },
    { city: "Las Vegas", status: "on" }
  ]);
  const [details, setDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

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
      };
      const newData = [...details, typData];
      setDetails(newData);
      setCityList(prevCityList =>
        prevCityList.map(city =>
          city.city === c ? { ...city, status: "off" } : city
        )
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const deleteRow = (cityName) => {
    const updatedDetails = details.filter((item) => item.c !== cityName);
    setDetails(updatedDetails);
    setCount(prevCount => prevCount - 1);
    setCityList(prevCityList =>
      prevCityList.map(city =>
        city.city === cityName ? { ...city, status: "on" } : city
      )
    );
  };

  const handleGetWeather = () => {
    if (count < cityList.length) {
      fetchWeather(cityList[count].city);
      setCount(prevCount => prevCount + 1);
    }
  };

  const handleSearch = () => {
    const index = details.findIndex(e => e.c.toLowerCase() === searchTerm.toLowerCase());
    if (index !== -1) {
      setHighlightIndex(index);
      setTimeout(() => {
        setHighlightIndex(null); // Remove highlight after 3 seconds
      }, 3000);
    } else {
      alert('City not found in the weather data.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>

      <div className="mb-6">
        <button
          onClick={handleGetWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get Weather
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">City List</h2>
        {cityList.map((e, idx) => (
          <div
            key={idx}
            className={`border-2 p-2 mb-2 ${
              e.status === "off" ? "border-green-500" : "border-black"
            }`}
          >
            {e.city}
          </div>
        ))}
      </div>
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Search City</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Search
        </button>
      </div>

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
            <React.Fragment key={index} >
              <div
                className={`p-2 ${highlightIndex === index ? 'bg-yellow-200' : ''}`}
              >
                {e.c}
              </div>
              <div className="p-2">{e.temperature}°C</div>
              <div className="p-2">{e.description}</div>
              <div className="p-2">{e.humidity}%</div>
              <div className="p-2">{e.date.toLocaleString()}</div>
              <div className="p-2">
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
  );
};

export default App;
