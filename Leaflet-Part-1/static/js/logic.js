//Module 15 Leaflet Challenge

//fetching earthquake data via API endpoint
const earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Get Request
d3.json(earthquakeDataUrl).then(function(data) {
  //sends data.features to createFeatures function
    createFeatures(data.features);
});



//incorporating data (magnitude & depth)
  function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
  
    let earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: feature.properties.mag * 5,
          fillColor: getColor(feature.geometry.coordinates[2]),
          color: "#000",
          weight: .5,
          opacity: .5 ,
          fillOpacity: 0.8
        });
      },
      onEachFeature: onEachFeature
    });
  
    createMap(earthquakes);
  }
  
  function getColor(depth) {
    return depth > 90 ? '#800026' :
           depth > 70 ? '#BD0026' :
           depth > 50 ? '#E31A1C' :
           depth > 30 ? '#FC4E2A' :
           depth > 10 ? '#FD8D3C' :
                        '#FFEDA0';
  }

  //Creat a map while adding a legend
  function createMap(earthquakes) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
    
      let map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, earthquakes]
      });
  
    let legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function (map) {
      let div = L.DomUtil.create('div', 'info legend'),
          depths = [0, 10, 30, 50, 70, 90],
          labels = [];
          legendInfo = "<h5>Magnitude</h5>";
  
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
          depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
      }
  
      return div;
    };
  
    legend.addTo(map);
  }
  