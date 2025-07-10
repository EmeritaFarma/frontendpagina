import { Branch } from "@/lib/types/branch"
import { formatTextSchedule, generateContacts } from "@/lib/utils"
import "leaflet/dist/leaflet.css"
import { Calendar, Map, MapPin, Phone, Route, Smartphone } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet"
import { Button } from "../ui/button"
import { Link, useSearchParams } from "react-router-dom"
import { useEffect, useRef } from "react"
import L from "leaflet"


// Si quieres ícono personalizado, descomenta y pon tu imagen
 import customIconUrl from "@/assets/img/marker-icon.png"
const customMarker = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [40, 40],       // Ancho x Alto en píxeles
  iconAnchor: [20, 40],     // Punto del ícono que coincide con la coordenada [centro horizontal, parte inferior]
  popupAnchor: [0, -40], 
className: 'custom-marker',  // Donde se muestra el popup relativo al ícono
});


export default function Maps({ branch }: { branch: Branch[] }) {
  const markerRefs = useRef<Array<L.Marker | null>>([])
  const [searchParams] = useSearchParams()
  const index = searchParams.get('index') ? +(searchParams.get('index') as string) : null

  const position: [number, number] = [20.9671, -89.5926] // Mérida

  useEffect(() => {
    if (index === null) return
    const primerMarker = markerRefs.current[index]
    if (primerMarker) {
      primerMarker.openPopup()
    }
  }, [index])

  return (
    <MapContainer
      center={position}
      zoom={13}
	  className="leaflet-map"
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>
      {branch?.map((item, index) => {
        const { cel, tel } = generateContacts(item.contact ?? [])

        return (
          <Marker
             icon={customMarker} // Usa este si quieres el ícono personalizado
            ref={(el) => { markerRefs.current[index] = el }}
            key={index}
            position={[item.location?.latitude as number, item.location?.longitude as number]}
          >
            <Popup minWidth={250}>
              <div className="font-primary text-sm text-gray-700">
                <h3 className="text-base font-semibold text-primary">{item.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={14} />
                    <span className="text-xs">
                      Calle {item.location?.street} #{item.location?.number}, {item.location?.colony}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-5">
                    {item.location?.city}, {item.location?.state} {item.location?.zipCode}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-gray-500">
                    <Phone size={14} />
                    <span className="text-xs">{tel?.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Smartphone size={14} />
                    <span className="text-xs">{cel?.join(', ')}</span>
                  </div>
                  <div className="mt-1">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} />
                      <span className="text-xs">Horarios:</span>
                    </div>
                    {item.schedule?.map((s, i) => (
                      <div key={i} className="ml-5 text-xs text-gray-400">
                        {formatTextSchedule({
                          dayFrom: s.dayFrom,
                          dayTo: s.dayTo,
                          timeIn: s.timeIn,
                          timeOut: s.timeOut
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Button asChild variant={'link'} style={{ color: 'var(--color-primary)' }}>
                    <Link
                      target="_blank"
                      to={`https://www.google.com/maps?saddr=My+Location&daddr=${item.location?.latitude},${item.location?.longitude}`}
                    >
                      <Route className="mr-1" />
                      Cómo llegar
                    </Link>
                  </Button>
                  <Button asChild variant={'link'} style={{ color: 'var(--color-primary)' }}>
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
        )
      })}
    </MapContainer>
  )
}
