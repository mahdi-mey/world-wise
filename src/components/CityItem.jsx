import styles from './CityItem.module.css'

export default function CityItem({ city }) {
    console.log(city)
  return (
    <li className={styles.cityItem}>
          <span className={styles.emoji}>{}</span>
    </li>
  )
}
