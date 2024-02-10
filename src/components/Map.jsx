import { useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
  const [searchParam, setSearchParam] = useSearchParams()
  const lat = searchParam.get('lat')
  const lng = searchParam.get('lng')

  return (
    <div className={styles.mapContainer}>
      <h1>Position: {lat} {lng}</h1>
      <button onClick={() => {
        setSearchParam({lat:9081658, lng: 19652347})
      }}>Change pos</button>
    </div>
  )
}

export default Map