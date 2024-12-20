# USGS Earthquake Visualization

Simple Leaflet map showing recent earthquake data from USGS.

## Structure

- `index.html`: Main page, loads libraries and custom JS/CSS
- `static/css/style.css`: Basic styling, keeps it minimal
- `static/js/logic.js`: Core logic, fetches data and builds map

## Design Choices

- Used D3 for data fetching: Already included, why add another library?
- Leaflet for mapping: Lightweight, does what we need
- Kept CSS bare: Let Leaflet handle most styling, less to maintain

## Setup

1. Clone repo
2. Open `index.html` in a browser
3. That's it

## Note

Requires internet connection to fetch USGS data and map tiles.
 
