import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerWidth = {
  width: '100%',
  height: '480px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    };

    updatePosition();
    const intervalId = setInterval(updatePosition, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCWYMzlN4I4C3JbPSbO9dAkxjOlEJhVuYw">
      <GoogleMap
        mapContainerStyle={containerWidth}
        zoom={16}
        center={currentPosition}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
