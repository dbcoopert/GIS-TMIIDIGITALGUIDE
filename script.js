
// Inisialisasi peta
var map = L.map('map').setView([-6.3024585,106.8954385], 16);

// Base map
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: '© Esri'
});

// Layer group untuk marker
var wisataTMII = L.geoJSON(null, {
  onEachFeature: function(feature, layer) {
    // Tooltip saat hover
    layer.bindTooltip(`<b>${feature.properties.nama}</b>`, { direction: 'top' });
    
    // Popup interaktif saat diklik
    var popupContent = `
      <div style="width:200px">
        <h4>${feature.properties.nama}</h4>
        <img src="${feature.properties.gambar}" alt="${feature.properties.nama}" style="width:100%;border-radius:8px;">
        <p style="font-size:13px;">${feature.properties.deskripsi}</p>
      </div>
    `;
    layer.bindPopup(popupContent);
  }
});


var batasTmii= L.geoJSON(null, {
  onEachFeature: function(feature, layer) {
    // Popup interaktif saat diklik
    var popupContent = `
      <div style="width:100%">
        <h3>${feature.properties.nama}</h3>
        <img src="${feature.properties.gambar}" alt="${feature.properties.nama}" style="width:100%;">
        <p style="font-size:13px;">${feature.properties.deskripsi}</p>
      </div>
    `;
    layer.bindPopup(popupContent);
  }
});


var jalurJalur= L.geoJSON(null, {
  onEachFeature: function(feature, layer) {
    // Tooltip saat hover
    layer.bindTooltip(`<h4>${feature.properties.deskripsi}</h4>`, {
      direction: "top",
    });
  }
});

// Load GeoJSON
fetch('data/tmii_tempat.geojson')
  .then(res => res.json())
  .then(data => wisataTMII.addData(data));
fetch('data/batas_tmii.geojson')
  .then(res => res.json())
  .then(data => batasTmii.addData(data));
fetch('data/jalur_jalur_tmii.geojson')
  .then(res => res.json())
  .then(data => jalurJalur.addData(data));

// Tambahkan layer ke peta
// wisataTMII.addTo(map);

// Control layer
var baseMaps = {
  "OpenStreetMap": osm,
  "Satellite": satellite
};

var overlayMaps = {
  "Tempat TMII": wisataTMII,
  "Batas TMII": batasTmii,
  "jalur jalur": jalurJalur
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
