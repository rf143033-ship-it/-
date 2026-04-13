'use strict';

(function initMap() {
  if (!document.getElementById('map')) return;
  if (typeof CITIES_DATA === 'undefined') return;

  
  const map = L.map('map', {
    center: [23.8859, 45.0792],
    zoom: 6,
    zoomControl: false,
    attributionControl: true
  });

  
  L.control.zoom({ position: 'topleft' }).addTo(map);

  
  
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  
  function getCityColor(city) {
    if (city.color) return city.color;
    const colors = ['#2C3E50', '#34495E', '#D4AF37', '#C9A961'];
    return colors[Math.abs(city.id.length) % colors.length];
  }

  
  function createMarkerIcon(city) {
    const color = getCityColor(city);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
        <defs>
          <filter id="shadow-${city.id}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <path d="M20 0C9 0 0 9 0 20C0 35 20 50 20 50C20 50 40 35 40 20C40 9 31 0 20 0Z" 
              fill="${color}" filter="url(#shadow-${city.id})"/>
        <circle cx="20" cy="20" r="10" fill="white" opacity="0.9"/>
        <text x="20" y="25" text-anchor="middle" font-size="12" fill="${color}" font-family="Arial" font-weight="bold">
          ${city.factories > 500 ? 'K' : city.factories > 200 ? 'M' : 'S'}
        </text>
      </svg>
    `;

    return L.divIcon({
      html: `
        <div style="
          width: 36px;
          height: 36px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        ">
          <i class="fas fa-industry" style="transform:rotate(45deg);color:white;font-size:0.85rem;"></i>
        </div>
        <div style="
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          background: ${color};
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-family: Tajawal, sans-serif;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        ">${city.name.split(' - ')[0].replace('المدينة الصناعية', '').replace('مدينة', '').trim() || city.name}</div>
      `,
      className: 'custom-map-marker',
      iconSize: [36, 64],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40]
    });
  }

  
  function createPopupContent(city) {
    return `
      <div class="city-popup-card">
        <div class="city-popup-img">
          <img src="${city.image}" alt="${city.name}" style="width:100%;height:140px;object-fit:cover">
        </div>
        <div class="city-popup-body">
          <div class="city-popup-body region">${city.region}</div>
          <h3 style="font-size:0.95rem;color:#2C3E50;margin-bottom:10px;font-family:Tajawal,sans-serif">${city.name}</h3>
          <div class="city-popup-stats">
            <div class="city-popup-stat">
              <div class="val" style="font-family:Tajawal,sans-serif">${city.factories.toLocaleString('ar-SA')}</div>
              <div class="lbl" style="font-family:Tajawal,sans-serif">منشأة</div>
            </div>
            <div class="city-popup-stat">
              <div class="val" style="font-family:Tajawal,sans-serif">${city.workers.toLocaleString('ar-SA')}</div>
              <div class="lbl" style="font-family:Tajawal,sans-serif">عامل</div>
            </div>
            <div class="city-popup-stat">
              <div class="val" style="font-family:Tajawal,sans-serif">${city.established}</div>
              <div class="lbl" style="font-family:Tajawal,sans-serif">التأسيس</div>
            </div>
          </div>
          <div class="city-popup-industries">
            ${city.industries.slice(0, 3).map(i => `<span class="city-popup-tag" style="font-family:Tajawal,sans-serif">${i}</span>`).join('')}
          </div>
          <a href="city-details.html?id=${city.id}" class="city-popup-btn" style="font-family:Tajawal,sans-serif">
            <i class="fas fa-arrow-left" style="margin-left:6px"></i>
            عرض التفاصيل الكاملة
          </a>
        </div>
      </div>
    `;
  }

  
  const markers = {};
  let activeFilter = 'all';

  function addMarkers(data) {
    
    Object.values(markers).forEach(m => map.removeLayer(m));
    Object.keys(markers).forEach(k => delete markers[k]);

    data.forEach(city => {
      const marker = L.marker(
        [city.coordinates.lat, city.coordinates.lng],
        { icon: createMarkerIcon(city) }
      );

      const popup = L.popup({
        maxWidth: 320,
        className: 'city-popup',
        closeButton: true
      }).setContent(createPopupContent(city));

      marker.bindPopup(popup);

      marker.on('click', () => {
        
        document.querySelectorAll('.city-list-item').forEach(item => {
          item.classList.toggle('active', item.dataset.cityId === city.id);
        });
        map.setView([city.coordinates.lat, city.coordinates.lng], 9, { animate: true });
      });

      marker.addTo(map);
      markers[city.id] = marker;
    });

    
    const countEl = document.getElementById('mapCitiesCount');
    if (countEl) countEl.textContent = data.length;
  }

  
  function renderSidebarList(data) {
    const list = document.getElementById('citySidebarList');
    if (!list) return;

    list.innerHTML = data.map(city => `
      <div class="city-list-item" data-city-id="${city.id}" onclick="flyToCity('${city.id}')">
        <div class="city-dot" style="background:${getCityColor(city)}"></div>
        <div class="city-info">
          <h4>${city.name}</h4>
          <p>${city.region}</p>
        </div>
        <div class="city-factories">${city.factories.toLocaleString('ar-SA')} منشأة</div>
      </div>
    `).join('');
  }

  
  window.flyToCity = function(cityId) {
    const city = CITIES_DATA.find(c => c.id === cityId);
    if (!city || !markers[cityId]) return;

    map.flyTo([city.coordinates.lat, city.coordinates.lng], 10, {
      animate: true,
      duration: 1.5
    });

    setTimeout(() => {
      markers[cityId].openPopup();
    }, 1600);

    
    document.querySelectorAll('.city-list-item').forEach(item => {
      item.classList.toggle('active', item.dataset.cityId === cityId);
    });
  };

  
  const filterBtns = document.querySelectorAll('#mapFilters .chip');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;

      let filteredCities = CITIES_DATA;
      if (activeFilter !== 'all') {
        const industryMap = {
          petrochemicals: ['البتروكيماويات', 'تكرير النفط'],
          food: ['الصناعات الغذائية'],
          steel: ['صناعة الحديد والصلب', 'الحديد والصلب'],
          logistics: ['اللوجستيات', 'الصناعات البحرية']
        };
        const keywords = industryMap[activeFilter] || [];
        filteredCities = CITIES_DATA.filter(city =>
          city.industries.some(ind => keywords.some(kw => ind.includes(kw)))
        );
      }

      addMarkers(filteredCities);
      renderSidebarList(filteredCities);
    });
  });

  
  const legend = L.control({ position: 'bottomleft' });
  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = `
      <h4 style="font-family:Tajawal,sans-serif"><i class="fas fa-info-circle" style="color:#D4AF37;margin-left:6px"></i> دليل الخريطة</h4>
      <div class="legend-item"><div class="legend-dot" style="background:#2C3E50"></div><span style="font-family:Tajawal,sans-serif">مدينة كبرى</span></div>
      <div class="legend-item"><div class="legend-dot" style="background:#D4AF37"></div><span style="font-family:Tajawal,sans-serif">مدينة متوسطة</span></div>
      <div class="legend-item"><div class="legend-dot" style="background:#C9A961"></div><span style="font-family:Tajawal,sans-serif">مدينة ناشئة</span></div>
    `;
    return div;
  };
  legend.addTo(map);

  
  
  const saudiaBounds = [[16.0, 34.5], [32.2, 55.7]];
  L.rectangle(saudiaBounds, {
    color: '#D4AF37',
    weight: 1.5,
    fill: false,
    dashArray: '6, 4',
    opacity: 0.4
  }).addTo(map);

  
  addMarkers(CITIES_DATA);
  renderSidebarList(CITIES_DATA);

  
  const bounds = CITIES_DATA.map(c => [c.coordinates.lat, c.coordinates.lng]);
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  
  const style = document.createElement('style');
  style.textContent = `
    .custom-map-marker { background: none !important; border: none !important; }
    .custom-map-marker > div:first-child:hover { transform: rotate(-45deg) scale(1.2) !important; }
    .leaflet-popup-content-wrapper { border-radius: 12px !important; padding: 0 !important; overflow: hidden; }
    .leaflet-popup-content { margin: 0 !important; line-height: 1 !important; }
    .city-popup .leaflet-popup-content-wrapper { box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important; }
    .map-legend { font-family: Tajawal, sans-serif; }
  `;
  document.head.appendChild(style);

})();