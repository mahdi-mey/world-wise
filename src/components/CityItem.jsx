import { useCities } from "../contexts/CitiesContext"
import { Link } from "react-router-dom"
import styles from "./CityItem.module.css"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date))

// function handelDelete(e) {
//   e.preventDefault()
//   e.stopPropagation()
//   console.log(id)
//   deleteCity(id)
// }

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city
  // console.log(id)

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={(e) => {
          e.preventDefault()
          deleteCity(id)
        }}>
          &times;
        </button>
      </Link>
    </li>
  )
}