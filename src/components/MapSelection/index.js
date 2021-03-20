import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 40.55, lng: -111.86};
const DefaultZoom = 10;

const MapSelection = (props) => {

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation (lat, lng){
    props.setCurrentLat(lat)
    props.setCurrentLng(lng)
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  return (
    <>
    <MapPicker 
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{height:'700px'}}
        onChangeLocation={handleChangeLocation} 
        onChangeZoom={handleChangeZoom}
        apiKey='AIzaSyASK98sC4O6on-uhfngG2NJ-2Jou_2QSik'
    />
  </>
  );
}

export default MapSelection