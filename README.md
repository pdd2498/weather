# Weather App

A simple React-based weather app that allows users to fetch and display weather details for different cities. Users can search for specific cities to highlight their weather information, and dynamically add or remove cities from the list.

## Features

- **City Weather Details**: Retrieve weather information for predefined cities.
- **Dynamic Weather Fetching**: Click a button to fetch weather details for each city in sequence.
- **Delete Rows**: Remove a city’s weather details from the display.
- **Search Functionality**: Search for a city in the weather details table and highlight it for 3 seconds if found.
- **Status Update**: Each city has a status (`on` or `off`) indicating if weather data is fetched or not.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Fetch API**: Fetch data from an external weather API.

## View the app

   Open your browser and navigate to `https://zippy-snickerdoodle-6ba4d7.netlify.app/`.

## Usage

1. **Fetch Weather Data**:
   - Click the "Get Weather" button to fetch weather data for each city in the `cityList`.
   - Each fetch highlights the next city in the list, adds the data to the "Weather Data" table, and updates the city's status to "off".

2. **Delete Row**:
   - Click the "Delete" button next to a city in the "Weather Data" table to remove that city’s weather data.
   - The city's status is reset to "on" in the `cityList`.

3. **Search City**:
   - Enter a city name in the search box and click "Search".
   - If the city is in the "Weather Data" table, it will be highlighted in yellow for 3 seconds.
