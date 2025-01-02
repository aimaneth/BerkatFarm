'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Location {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  type: 'farm' | 'distribution' | 'processing';
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Main Farm',
    position: { lat: 3.1390, lng: 101.6869 },
    type: 'farm'
  },
  {
    id: '2',
    name: 'Distribution Center',
    position: { lat: 3.1421, lng: 101.6867 },
    type: 'distribution'
  },
  {
    id: '3',
    name: 'Processing Plant',
    position: { lat: 3.1380, lng: 101.6880 },
    type: 'processing'
  }
];

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  }
];

export const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly'
      });

      const google = await loader.load();
      
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 3.1390, lng: 101.6869 },
          zoom: 15,
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true
        });

        setMap(mapInstance);

        // Add markers for each location
        locations.forEach(location => {
          const marker = new google.maps.Marker({
            position: location.position,
            map: mapInstance,
            title: location.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: getMarkerColor(location.type),
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#ffffff'
            }
          });

          marker.addListener('click', () => {
            setSelectedLocation(location);
          });
        });
      }
    };

    initMap();
  }, []);

  const getMarkerColor = (type: Location['type']): string => {
    switch (type) {
      case 'farm':
        return '#4ade80';
      case 'distribution':
        return '#3b82f6';
      case 'processing':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">{selectedLocation.name}</h3>
          <p className="text-sm text-gray-600 capitalize">Type: {selectedLocation.type}</p>
          <p className="text-sm text-gray-600">
            Location: {selectedLocation.position.lat.toFixed(4)}, {selectedLocation.position.lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
}; 