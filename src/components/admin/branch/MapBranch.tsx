import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";

interface Props {
  positionValue?: LatLng | null;
  setPositionValue?: (value: LatLng | null) => void;
}

export default function MapsBranch({ positionValue = null, setPositionValue }: Props) {
  const [positionCurrent, setPositionCurrent] = useState<LatLng | null>(positionValue); // Almacena las coordenadas del clic
  const position: [number, number] = [20.9671, -89.5926]; // Centro del mapa (Mérida, Yucatán)
    
  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='© <a href="https://www.carto.com/">CARTO</a>'
        />
        {positionCurrent && (
          <Marker position={positionCurrent}>
            <Popup>Lat: {positionCurrent.lat.toFixed(4)}, Lng: {positionCurrent.lng.toFixed(4)}</Popup>
          </Marker>
        )}
        <MapSelection setPositionCurrent={(value) =>{
            setPositionCurrent(value)
            setPositionValue?.(value)
        }} />
      </MapContainer>


    </div>
  );
}

function MapSelection({ setPositionCurrent }: { setPositionCurrent: (latlng: LatLng | null) => void }) {
  useMapEvents({
    click(e) {
      setPositionCurrent(e.latlng); // Guarda las coordenadas del clic
    },
  });

  return null;
}