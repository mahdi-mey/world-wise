import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from "react"

function Map() {
  const navigate = useNavigate()
  const [mapPosition, setMapPosition] = useState([40, 0])

  // const [searchParam, setSearchParam] = useSearchParams()
  // const lat = searchParam.get("lat")
  // const lng = searchParam.get("lng")

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate("form")
      // }}
    >
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      {/* <h1>Position: {lat} {lng}</h1>
      <button onClick={() => {
        setSearchParam({lat:9081658, lng: 19652347})
      }}>Change pos</button> */}
    </div>
  )
}

export default Map
