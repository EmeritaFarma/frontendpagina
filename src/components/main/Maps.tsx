import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Branch } from "@/lib/types/branch";
import { formatTextSchedule, generateContacts } from "@/lib/utils";
import { Calendar, Map, MapPin, Phone, Route, Smartphone } from "lucide-react";
import { Button } from "../ui/button";

/* icono personalizado */
import customIconUrl from "@/assets/img/marker-icon.png";
const customMarker = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: "custom-marker",
});

export default function Maps({ branch }: { branch: Branch[] }) {
  const markerRefs = useRef<Array<L.Marker | null>>([]);
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index") ? +(searchParams.get("index") as string) : null;

  const position: [number, number] = [20.9671, -89.5926]; // Mérida

  /* abrir popup desde listado */
  useEffect(() => {
    if (index === null) return;
    const marker = markerRefs.current[index];
    if (marker) marker.openPopup();
  }, [index]);

  return (
    /* contenedor flexible */
    <div className="w-full overflow-hidden rounded-lg">
      <MapContainer
        center={position}
        zoom={13}
        className="leaflet-map" /* responsive: 55 vh móvil, 400 px en ≥640 px */
        zoomControl={false}
        scrollWheelZoom
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {branch?.map((item, i) => {
          const { cel, tel } = generateContacts(item.contact ?? []);
          return (
            <Marker
              key={i}
              icon={customMarker}
              position={[item.location!.latitude, item.location!.longitude]}
              ref={(el) => (markerRefs.current[i] = el)}
            >
              <Popup minWidth={250}>
                <div className="font-primary text-sm text-gray-700">
                  <h3 className="text-base font-semibold text-primary">{item.name}</h3>

                  {/* dirección */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={14} />
                      <span className="text-xs">
                        Calle {item.location?.street} #{item.location?.number},{" "}
                        {item.location?.colony}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-5">
                      {item.location?.city}, {item.location?.state} {item.location?.zipCode}
                    </div>

                    {/* contactos */}
                    <div className="flex items-center gap-2 mt-1 text-gray-500">
                      <Phone size={14} />
                      <span className="text-xs">{tel?.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Smartphone size={14} />
                      <span className="text-xs">{cel?.join(", ")}</span>
                    </div>

                    {/* horarios */}
                    <div className="mt-1">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-xs">Horarios:</span>
                      </div>
                      {item.schedule?.map((s, idx) => (
                        <div key={idx} className="ml-5 text-xs text-gray-400">
                          {formatTextSchedule({
                            dayFrom: s.dayFrom,
                            dayTo: s.dayTo,
                            timeIn: s.timeIn,
                            timeOut: s.timeOut,
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* acciones */}
                  <div className="mt-4 flex items-center gap-4">
                    <Button asChild variant="link" style={{ color: "var(--color-primary)" }}>
                      <Link
                        target="_blank"
                        to={`https://www.google.com/maps?saddr=My+Location&daddr=${item.location?.latitude},${item.location?.longitude}`}
                      >
                        <Route className="mr-1" />
                        Cómo llegar
                      </Link>
                    </Button>
                    <Button asChild variant="link" style={{ color: "var(--color-primary)" }}>
                      <Link
                        target="_blank"
                        to={`https://www.google.com/maps?q=${item.location?.latitude},${item.location?.longitude}`}
                      >
                        <Map className="mr-1" />
                        Ver en Google Maps
                      </Link>
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
