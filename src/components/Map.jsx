import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useState } from "react"
import { useCities } from "../contexts/citiesContext"

function Map() {
  const navigate = useNavigate()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()

  const [searchParam, setSearchParam] = useSearchParams()
  const mapLat = searchParam.get("lat")
  const mapLng = searchParam.get("lng")

  useEffect(function () {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }

  }, [mapLat, mapLng])

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form")
      // }}
    >
      <MapContainer
        // center={[mapLat, mapLng]}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{ city.emoji }</span>
              <span>{ city.cityName }</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
      </MapContainer>

      {/* <h1>Position: {lat} {lng}</h1>
      <button onClick={() => {
        setSearchParam({lat:9081658, lng: 19652347})
      }}>Change pos</button> */}
    </div>
  )
}

function ChangeCenter({ position }){
  const map = useMap()
  map.setView(position)
  return null
}

export default Map
