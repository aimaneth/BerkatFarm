'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'farm' | 'distribution' | 'processing';
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Main Farm',
    coordinates: [102.4186, 3.4959], // Updated coordinates
    type: 'farm'
  },
  {
    id: '2',
    name: 'Distribution Center',
    coordinates: [102.4196, 3.4969], // Slightly offset
    type: 'distribution'
  },
  {
    id: '3',
    name: 'Processing Plant',
    coordinates: [102.4176, 3.4949], // Slightly offset
    type: 'processing'
  }
];

const markerColors = {
  farm: '#4ade80',      // emerald-400
  distribution: '#3b82f6', // blue-500
  processing: '#f59e0b'  // amber-500
};

export const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error('Mapbox token is required');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Using outdoors style as base
        center: locations[0].coordinates,
        zoom: 14.5,
        pitch: 45,
        bearing: -17.6,
        antialias: true
      });

      map.current = mapInstance;

      mapInstance.addControl(new mapboxgl.NavigationControl());

      // Add custom styling when the map loads
      mapInstance.on('load', () => {
        // Adjust the map colors to be more green/natural
        mapInstance.setPaintProperty('land', 'background-color', '#dcfce7');
        
        // Add terrain
        mapInstance.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });

        // Add terrain 3D effect
        mapInstance.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.2 });

        // Add atmospheric sky effect
        mapInstance.addLayer({
          'id': 'sky',
          'type': 'sky',
          'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });

        // Add a subtle green tint to the whole map
        mapInstance.addLayer({
          'id': 'green-tint',
          'type': 'background',
          'paint': {
            'background-color': '#10b981',
            'background-opacity': 0.05
          }
        });

        // Enhance vegetation colors
        mapInstance.setPaintProperty('vegetation', 'fill-color', '#15803d');
        mapInstance.setPaintProperty('grass', 'fill-color', '#22c55e');
      });

      // Add markers
      locations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform hover:scale-110';
        el.innerHTML = `<div class="w-6 h-6 rounded-full" style="background-color: ${markerColors[location.type]}"></div>`;

        const popup = new mapboxgl.Popup({ 
          offset: 25,
          className: 'bg-white/90 backdrop-blur-sm'
        })
          .setHTML(`
            <div class="p-3">
              <h3 class="font-semibold text-emerald-900">${location.name}</h3>
              <p class="text-sm text-emerald-700 capitalize">${location.type}</p>
            </div>
          `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(mapInstance);

        markers.current.push(marker);
      });

      return () => {
        markers.current.forEach(marker => marker.remove());
        mapInstance.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl" />
  );
};